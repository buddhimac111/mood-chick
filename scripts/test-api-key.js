#!/usr/bin/env node

/**
 * Simple test to verify HuggingFace API key works
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

// Test with a simple model that should work
const testUrl = 'https://api-inference.huggingface.co/models/gpt2';

console.log(`\n🧪 Testing with GPT-2 model: ${testUrl}`);

const payload = JSON.stringify({
  inputs: "Hello, how are you?",
  parameters: {
    max_new_tokens: 20,
    temperature: 0.7,
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

const req = https.request(testUrl, options, (res) => {
  let data = '';

  console.log(`📡 Response status: ${res.statusCode}`);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`📄 Raw response: ${data}`);
    
    if (res.statusCode === 200) {
      try {
        const response = JSON.parse(data);
        console.log('✅ Success! Response:', JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('❌ Failed to parse JSON response');
      }
    } else {
      console.log(`❌ Error: HTTP ${res.statusCode}`);
    }
  });
});

req.on('error', (error) => {
  console.log(`❌ Request error: ${error.message}`);
});

req.on('timeout', () => {
  console.log('❌ Request timeout');
  req.destroy();
});

req.write(payload);
req.end();
