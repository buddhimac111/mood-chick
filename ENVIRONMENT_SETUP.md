# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# HuggingFace API Configuration
# Get your API key from: https://huggingface.co/settings/tokens
NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

## Optional Environment Variables

```env
# Override default model
HUGGINGFACE_MODEL=google/flan-t5-small

# Override default API URL
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/google/flan-t5-small

# Rate limiting configuration
RATE_LIMIT_REQUESTS_PER_MINUTE=60

# App configuration
NEXT_PUBLIC_APP_NAME=MoodChick
NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Caption Generator
```

## Getting Started

1. Copy the environment variables above to a new file called `.env.local`
2. Replace `your_huggingface_api_key_here` with your actual HuggingFace API key
3. Run `bun install` to install dependencies
4. Run `bun dev` to start the development server

## HuggingFace API Key

If you don't have a HuggingFace API key:

1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token with "Read" permissions
3. Copy the token and paste it in your `.env.local` file

The app will work without an API key using fallback captions, but having an API key enables AI-generated captions.
