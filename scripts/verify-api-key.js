#!/usr/bin/env node

/**
 * Verify HuggingFace API key format and test basic connectivity
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
console.log(`📏 Key length: ${API_KEY.length} characters`);

// Check if the key starts with 'hf_'
if (!API_KEY.startsWith('hf_')) {
  console.log('⚠️  Warning: API key should start with "hf_"');
}

// Test with HuggingFace API status endpoint
console.log('\n🧪 Testing HuggingFace API connectivity...');

const statusUrl = 'https://api-inference.huggingface.co/status';

const options = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

const req = https.request(statusUrl, options, (res) => {
  let data = '';

  console.log(`📡 Response status: ${res.statusCode}`);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`📄 Raw response: ${data}`);
    
    if (res.statusCode === 200) {
      console.log('✅ API key is valid and working!');
      try {
        const response = JSON.parse(data);
        console.log('📊 API Status:', JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('📊 API Status (raw):', data);
      }
    } else if (res.statusCode === 401) {
      console.log('❌ API key is invalid or unauthorized');
    } else {
      console.log(`❌ API error: HTTP ${res.statusCode}`);
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

req.end();
