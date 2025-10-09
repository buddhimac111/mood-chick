# MoodChick Setup Guide

This guide will help you set up MoodChick with HuggingFace AI integration for production use.

## Prerequisites

- Node.js >= 18
- npm, yarn, or pnpm
- HuggingFace account (for AI features)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd mood-chick
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Required for AI features
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Optional: Custom configuration
HUGGINGFACE_MODEL=google/flan-t5-small
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/google/flan-t5-small
RATE_LIMIT_REQUESTS_PER_MINUTE=60

# App configuration
NEXT_PUBLIC_APP_NAME=MoodChick
NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Caption Generator
```

### 3. Get HuggingFace API Key

1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token with "Read" permissions
3. Copy the token to your `.env.local` file

### 4. Run the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Features

### ✅ Implemented Features

- **AI-Powered Caption Generation**: Uses HuggingFace flan-t5-small model
- **Mood Selection**: 5 different moods (Happy, Sad, Love, Motivational, Funny)
- **Fallback System**: Curated captions when AI is unavailable
- **Rate Limiting**: Prevents API abuse (60 requests/minute)
- **Copy to Clipboard**: One-click copy functionality
- **Responsive Design**: Works on all devices
- **Dark Mode**: Automatic theme switching
- **Error Handling**: Graceful degradation and retry logic

### 🎨 UI Features

- Modern gradient design with purple/pink theme
- Smooth animations and hover effects
- Interactive mood selection with visual feedback
- Loading states and progress indicators
- Success/error notifications

### 🛡️ Production Features

- **Rate Limiting**: Built-in protection against abuse
- **Error Handling**: Comprehensive error management
- **Fallback System**: Always works, even without API key
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Responsive**: Mobile-first design

## API Endpoints

### POST /api/generate-caption

Generates AI-powered captions based on mood.

**Request:**
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

## Testing

### Test HuggingFace Integration

```bash
# Set your API key first
export HUGGINGFACE_API_KEY=your_key_here

# Run the test
npm run test:huggingface
```

### Manual Testing

1. Start the development server: `npm run dev`
2. Open http://localhost:3000
3. Select a mood and click "Generate Caption"
4. Test copy functionality
5. Test "Generate Again" feature

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HUGGINGFACE_API_KEY` | Yes* | - | HuggingFace API key for AI features |
| `HUGGINGFACE_MODEL` | No | `google/flan-t5-small` | Model to use |
| `HUGGINGFACE_API_URL` | No | Auto-generated | Custom API URL |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | No | `60` | Rate limit per minute |
| `NEXT_PUBLIC_APP_NAME` | No | `MoodChick` | App name |
| `NEXT_PUBLIC_APP_DESCRIPTION` | No | Auto-generated | App description |

*Required for AI features, app works with fallback captions without it

### Customization

#### Adding New Moods

1. Edit `src/app/page.tsx` - Add new mood to `moods` array
2. Edit `src/lib/config.ts` - Add prompt to `moodPrompts`
3. Edit `src/lib/huggingface.ts` - Add fallback captions

#### Styling

The app uses Tailwind CSS. Customize colors in:
- `src/app/globals.css` - Global styles
- `src/app/page.tsx` - Component styles

## Troubleshooting

### Common Issues

1. **"HuggingFace API key is not configured"**
   - Add `HUGGINGFACE_API_KEY` to `.env.local`
   - Restart the development server

2. **"Rate limit exceeded"**
   - Wait for the rate limit window to reset
   - Increase `RATE_LIMIT_REQUESTS_PER_MINUTE` if needed

3. **"Model is loading"**
   - Wait 10-30 seconds and try again
   - The model needs to warm up on first request

4. **Build errors**
   - Run `npm run lint` to check for issues
   - Run `npm run type-check` for TypeScript errors

### Debug Mode

Enable detailed logging:
```env
NODE_ENV=development
```

## Performance

### Optimization Features

- **Client-side caching**: Reduces API calls
- **Rate limiting**: Prevents abuse
- **Fallback system**: Always responsive
- **Lazy loading**: Optimized bundle size
- **Image optimization**: Next.js automatic optimization

### Monitoring

- All API calls are logged
- Error rates are tracked
- Response times are monitored
- Rate limit status is visible

## Security

### Built-in Protections

- **Rate limiting**: Prevents DDoS attacks
- **Input validation**: Prevents injection attacks
- **Environment variables**: Secure API key storage
- **CORS protection**: Secure cross-origin requests

### Best Practices

- Never commit API keys to version control
- Use environment variables for sensitive data
- Regularly rotate API keys
- Monitor usage and costs

## Support

### Documentation

- [HuggingFace Integration Guide](docs/HUGGINGFACE_INTEGRATION.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

### Getting Help

1. Check the troubleshooting section
2. Review the documentation
3. Check GitHub issues
4. Create a new issue if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.
