# HuggingFace Integration Guide

This document explains how to set up and use the HuggingFace flan-t5-small model integration in MoodChick.

## Overview

MoodChick uses the HuggingFace Inference API to generate AI-powered social media captions. The integration includes:

- **Primary**: HuggingFace flan-t5-small model via Inference API
- **Fallback**: Curated caption database when API is unavailable
- **Rate Limiting**: Prevents API abuse
- **Error Handling**: Graceful degradation and retry logic

## Setup

### 1. Get HuggingFace API Key

1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token with "Read" permissions
3. Copy the token

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Required: HuggingFace API Key
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Optional: Custom model configuration
HUGGINGFACE_MODEL=google/flan-t5-small
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/google/flan-t5-small

# Optional: Rate limiting
RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

### 3. Test the Integration

The app will automatically detect if the API key is configured and use the appropriate method:

- **With API Key**: Uses HuggingFace flan-t5-small model
- **Without API Key**: Uses fallback captions

## API Endpoints

### POST /api/generate-caption

Generates a caption based on mood selection.

**Request Body:**
```json
{
  "mood": "happy",
  "prompt": "Write a happy, uplifting social media caption"
}
```

**Response:**
```json
{
  "caption": "Sunshine and smiles make everything better! ☀️✨",
  "mood": "happy",
  "source": "huggingface",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response Headers:**
- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Timestamp when rate limit resets

## Error Handling

### Rate Limiting (429)
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "resetTime": 1705312200000
}
```

### API Errors (500)
```json
{
  "error": "Failed to generate caption",
  "message": "HuggingFace API error: 503 - Model is loading"
}
```

## Configuration

### HuggingFace Service Configuration

Located in `src/lib/config.ts`:

```typescript
huggingface: {
  apiKey: process.env.HUGGINGFACE_API_KEY || "",
  model: process.env.HUGGINGFACE_MODEL || "google/flan-t5-small",
  apiUrl: process.env.HUGGINGFACE_API_URL || "https://api-inference.huggingface.co/models/google/flan-t5-small",
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 1000, // 1 second
}
```

### Rate Limiting Configuration

```typescript
rateLimit: {
  requestsPerMinute: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || "60"),
}
```

## Supported Moods

The system supports the following moods with optimized prompts:

- **happy**: Uplifting, positive captions
- **sad**: Thoughtful, empathetic captions
- **love**: Romantic, affectionate captions
- **motivational**: Inspiring, empowering captions
- **funny**: Humorous, entertaining captions

## Fallback System

When the HuggingFace API is unavailable, the system automatically falls back to curated captions:

1. **API Key Missing**: Uses fallback captions immediately
2. **API Error**: Retries up to 3 times, then falls back
3. **Rate Limited**: Returns rate limit error, no fallback
4. **Timeout**: Retries with exponential backoff, then falls back

## Production Considerations

### Performance
- API calls are cached for 1 minute to reduce costs
- Rate limiting prevents abuse
- Timeout handling prevents hanging requests

### Security
- API keys are stored in environment variables
- Rate limiting prevents DDoS attacks
- Input validation prevents injection attacks

### Monitoring
- All API calls are logged
- Error rates are tracked
- Response times are monitored

### Scaling
- In-memory rate limiting (use Redis in production)
- Stateless API design
- Horizontal scaling support

## Troubleshooting

### Common Issues

1. **"HuggingFace API key is not configured"**
   - Add `HUGGINGFACE_API_KEY` to `.env.local`

2. **"Rate limit exceeded"**
   - Wait for the rate limit window to reset
   - Increase `RATE_LIMIT_REQUESTS_PER_MINUTE` if needed

3. **"Model is loading"**
   - Wait 10-30 seconds and try again
   - The model needs to warm up on first request

4. **"Request timeout"**
   - Check your internet connection
   - The API might be experiencing high load

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

This will log detailed information about API calls and errors.

## Cost Optimization

### HuggingFace Pricing
- Free tier: 1,000 requests/month
- Pay-as-you-go: $0.06 per 1,000 requests

### Optimization Tips
1. Use fallback captions for development
2. Implement client-side caching
3. Batch requests when possible
4. Monitor usage in HuggingFace dashboard

## Future Enhancements

1. **Model Selection**: Support for different models
2. **Custom Prompts**: User-defined prompt templates
3. **Caching**: Redis-based response caching
4. **Analytics**: Usage tracking and insights
5. **A/B Testing**: Compare different models/prompts
