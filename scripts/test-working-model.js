#!/usr/bin/env node

/**
 * Test with a known working model
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

// Try different base URLs and models
const testConfigs = [
  {
    name: 'HuggingFace Inference API - GPT-2',
    url: 'https://api-inference.huggingface.co/models/gpt2',
    payload: {
      inputs: "Hello, how are you?",
      parameters: { max_new_tokens: 20 }
    }
  },
  {
    name: 'HuggingFace Inference API - DistilBERT',
    url: 'https://api-inference.huggingface.co/models/distilbert-base-uncased',
    payload: {
      inputs: "Hello, how are you?"
    }
  },
  {
    name: 'Alternative endpoint - GPT-2',
    url: 'https://huggingface.co/api/models/gpt2',
    payload: null
  }
];

async function testConfig(config) {
  console.log(`\n🧪 Testing: ${config.name}`);
  console.log(`🔗 URL: ${config.url}`);
  
  return new Promise((resolve) => {
    const options = {
      method: config.payload ? 'POST' : 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    };

    if (config.payload) {
      const payload = JSON.stringify(config.payload);
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

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
            console.log('📄 Response:', JSON.stringify(response, null, 2).substring(0, 500) + '...');
          } catch (e) {
            console.log('📄 Response (raw):', data.substring(0, 500) + '...');
          }
          resolve(true);
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

    if (config.payload) {
      req.write(JSON.stringify(config.payload));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting HuggingFace API tests...\n');
  
  for (const config of testConfigs) {
    const success = await testConfig(config);
    if (success) {
      console.log('\n🎉 Found a working configuration!');
      break;
    }
  }
  
  console.log('\n✨ Tests completed');
}

runTests().catch(console.error);
