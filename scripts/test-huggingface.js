#!/usr/bin/env node

/**
 * Test script for HuggingFace integration
 * Run with: node scripts/test-huggingface.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local or .env
function loadEnvFile() {
  const envPaths = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '.env')
  ];
  
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      console.log(`📁 Loading environment variables from: ${path.basename(envPath)}`);
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envLines = envContent.split('\n');
      
      envLines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            process.env[key.trim()] = value;
          }
        }
      });
      return; // Found and loaded a file, exit
    }
  }
  
  console.log('⚠️  No .env.local or .env file found');
}

// Load environment variables
loadEnvFile();

// Configuration - Try different model URLs
const MODEL_URLS = [
  'https://api-inference.huggingface.co/models/google/flan-t5-small',
  'https://api-inference.huggingface.co/models/google/flan-t5-base',
  'https://api-inference.huggingface.co/models/google/flan-t5-large',
  'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
  'https://api-inference.huggingface.co/models/gpt2'
];

const API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!API_KEY) {
  console.error('❌ HUGGINGFACE_API_KEY environment variable is required');
  console.log('💡 Get your API key from: https://huggingface.co/settings/tokens');
  console.log('💡 Make sure you have a .env.local file in your project root with HUGGINGFACE_API_KEY=your_key_here');
  process.exit(1);
}

console.log('✅ HuggingFace API key loaded successfully');
console.log(`🔑 API Key: ${API_KEY.substring(0, 8)}...${API_KEY.substring(API_KEY.length - 4)}`);
console.log(`🔗 Available model URLs: ${MODEL_URLS.length}`);
console.log('');

async function testHuggingFaceAPI() {
  console.log('🧪 Testing HuggingFace flan-t5 integration...\n');

  // First, test which model URL works
  let workingUrl = null;
  for (const url of MODEL_URLS) {
    console.log(`🔍 Testing URL: ${url}`);
    try {
      const result = await makeRequest('Hello', url);
      console.log(`✅ URL works! Generated: "${result}"`);
      workingUrl = url;
      break;
    } catch (error) {
      console.log(`❌ URL failed: ${error.message}`);
    }
  }

  if (!workingUrl) {
    console.log('❌ No working model URL found. Please check your API key and model availability.');
    return;
  }

  console.log(`\n🎯 Using working URL: ${workingUrl}\n`);

  const testCases = [
    {
      name: 'Happy Mood',
      prompt: 'Write a happy, uplifting social media caption that spreads positivity and joy',
    },
    {
      name: 'Motivational Mood',
      prompt: 'Write an inspiring, motivational social media caption that encourages and empowers',
    },
    {
      name: 'Funny Mood',
      prompt: 'Write a funny, humorous social media caption that makes people laugh',
    },
  ];

  for (const testCase of testCases) {
    console.log(`📝 Testing: ${testCase.name}`);
    
    try {
      const result = await makeRequest(testCase.prompt, workingUrl);
      console.log(`✅ Generated: "${result}"`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }
}

function makeRequest(prompt, url) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
    });

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 30000,
    };

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const response = JSON.parse(data);
            if (Array.isArray(response) && response.length > 0) {
              resolve(response[0].generated_text || 'No text generated');
            } else {
              reject(new Error('Invalid response format'));
            }
          } else if (res.statusCode === 503) {
            const errorData = JSON.parse(data);
            reject(new Error(`Model is loading. Estimated time: ${errorData.estimated_time || 'unknown'} seconds`));
          } else if (res.statusCode === 401) {
            reject(new Error(`Unauthorized: Invalid API key. Please check your HUGGINGFACE_API_KEY`));
          } else if (res.statusCode === 404) {
            reject(new Error(`Model not found: ${url}. Please check the model URL`));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse response: ${parseError.message}. Raw response: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(payload);
    req.end();
  });
}

// Run the test
testHuggingFaceAPI()
  .then(() => {
    console.log('🎉 HuggingFace integration test completed!');
  })
  .catch((error) => {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  });
