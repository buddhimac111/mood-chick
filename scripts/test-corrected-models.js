#!/usr/bin/env node

/**
 * Test with corrected model URLs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnvFile() {
  const envPaths = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '.env')
  ];
  
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
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
      return;
    }
  }
}

loadEnvFile();

const API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!API_KEY) {
  console.error('❌ HUGGINGFACE_API_KEY not found');
  process.exit(1);
}

console.log('✅ API Key loaded');
console.log(`🔑 Key: ${API_KEY.substring(0, 8)}...${API_KEY.substring(API_KEY.length - 4)}`);

// Try corrected model URLs
const testConfigs = [
  {
    name: 'GPT-2 (corrected)',
    url: 'https://api-inference.huggingface.co/models/openai-community/gpt2',
    payload: {
      inputs: "Hello, how are you?",
      parameters: { max_new_tokens: 20 }
    }
  },
  {
    name: 'FLAN-T5-Small (corrected)',
    url: 'https://api-inference.huggingface.co/models/google/flan-t5-small',
    payload: {
      inputs: "Write a happy social media caption",
      parameters: { max_new_tokens: 50 }
    }
  },
  {
    name: 'DistilBERT (corrected)',
    url: 'https://api-inference.huggingface.co/models/distilbert-base-uncased',
    payload: {
      inputs: "Hello, how are you?"
    }
  }
];

async function testConfig(config) {
  console.log(`\n🧪 Testing: ${config.name}`);
  console.log(`🔗 URL: ${config.url}`);
  
  return new Promise((resolve) => {
    const payload = JSON.stringify(config.payload);
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 15000,
    };

    const req = https.request(config.url, options, (res) => {
      let data = '';

      console.log(`📡 Status: ${res.statusCode}`);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Success!');
          try {
            const response = JSON.parse(data);
            if (Array.isArray(response) && response.length > 0) {
              console.log('📄 Generated text:', response[0].generated_text || response[0].answer || 'No text generated');
            } else {
              console.log('📄 Response:', JSON.stringify(response, null, 2).substring(0, 500) + '...');
            }
          } catch (e) {
            console.log('📄 Response (raw):', data.substring(0, 500) + '...');
          }
          resolve(true);
        } else if (res.statusCode === 503) {
          console.log('⏳ Model is loading...');
          try {
            const errorData = JSON.parse(data);
            console.log(`⏱️  Estimated time: ${errorData.estimated_time || 'unknown'} seconds`);
          } catch (e) {
            console.log('📄 Response:', data.substring(0, 200));
          }
          resolve(false);
        } else {
          console.log(`❌ Failed: HTTP ${res.statusCode}`);
          console.log('📄 Response:', data.substring(0, 200));
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Error: ${error.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Timeout');
      req.destroy();
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Testing corrected HuggingFace model URLs...\n');
  
  let workingModel = null;
  
  for (const config of testConfigs) {
    const success = await testConfig(config);
    if (success) {
      console.log('\n🎉 Found a working model!');
      workingModel = config;
      break;
    }
  }
  
  if (workingModel) {
    console.log(`\n✅ Working model: ${workingModel.name}`);
    console.log(`🔗 URL: ${workingModel.url}`);
  } else {
    console.log('\n❌ No working models found. The API key might be invalid or the models might be unavailable.');
  }
  
  console.log('\n✨ Tests completed');
}

runTests().catch(console.error);
