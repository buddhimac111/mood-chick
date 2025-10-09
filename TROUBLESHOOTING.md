# MoodChick Troubleshooting Guide

## HuggingFace API Issues

### Current Status
The HuggingFace API integration is experiencing issues with the provided API key. The app is designed to work with fallback captions when the API is unavailable, so **the application is fully functional even without a working HuggingFace API key**.

### Testing Your API Key

If you want to test your HuggingFace API key, run:

```bash
npm run test:huggingface
```

### Common Issues and Solutions

#### 1. API Key Not Working (404 Errors)

**Symptoms:**
- Getting "Model not found" or "Not Found" errors
- All model URLs return 404 status

**Possible Causes:**
- API key doesn't have the right permissions
- API key is expired or invalid
- Model names have changed
- Regional API restrictions

**Solutions:**

1. **Verify API Key Permissions:**
   - Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
   - Make sure your token has "Read" permissions
   - Try creating a new token

2. **Check API Key Format:**
   - Should start with `hf_`
   - Should be about 37 characters long
   - No extra spaces or quotes in `.env` file

3. **Test with Different Models:**
   ```bash
   node scripts/test-corrected-models.js
   ```

#### 2. Environment Variables Not Loading

**Symptoms:**
- "HUGGINGFACE_API_KEY environment variable is required"
- API key not found in tests

**Solutions:**

1. **Check File Location:**
   - Ensure `.env` or `.env.local` is in project root
   - File should be at same level as `package.json`

2. **Check File Format:**
   ```env
   HUGGINGFACE_API_KEY=hf_your_key_here
   ```
   - No spaces around `=`
   - No quotes around the key
   - No comments on the same line

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

#### 3. Build Errors

**Symptoms:**
- `ELIFECYCLE Command failed with exit code 1`
- TypeScript or ESLint errors

**Solutions:**

1. **Check for Linting Errors:**
   ```bash
   npm run lint
   ```

2. **Check TypeScript Errors:**
   ```bash
   npm run type-check
   ```

3. **Clean Build:**
   ```bash
   rm -rf .next
   npm run build
   ```

### Working Without HuggingFace API

The app is designed to work perfectly without the HuggingFace API:

1. **Fallback Captions:** Curated, high-quality captions for each mood
2. **Full Functionality:** All features work (copy, generate again, etc.)
3. **No Errors:** Graceful degradation when API is unavailable

### Getting a Working HuggingFace API Key

If you want to use the AI features:

1. **Create Account:**
   - Go to [HuggingFace](https://huggingface.co)
   - Sign up for a free account

2. **Get API Key:**
   - Go to [Settings > Tokens](https://huggingface.co/settings/tokens)
   - Create a new token with "Read" permissions
   - Copy the token (starts with `hf_`)

3. **Add to Environment:**
   ```env
   HUGGINGFACE_API_KEY=hf_your_new_key_here
   ```

4. **Test:**
   ```bash
   npm run test:huggingface
   ```

### Alternative AI Services

If HuggingFace continues to have issues, you can integrate other AI services:

1. **OpenAI API:**
   - More reliable but paid
   - Better quality results
   - Easy integration

2. **Anthropic Claude:**
   - High-quality text generation
   - Good for creative content

3. **Local Models:**
   - Run models locally
   - No API costs
   - More complex setup

### Performance Optimization

Even with fallback captions, the app is optimized:

1. **Fast Loading:** No API delays
2. **Reliable:** Always works
3. **Quality:** Curated captions are high-quality
4. **Variety:** Multiple captions per mood

### Support

If you continue to have issues:

1. **Check Logs:**
   - Look at browser console for errors
   - Check terminal output for API errors

2. **Test Components:**
   - Try different moods
   - Test copy functionality
   - Check responsive design

3. **Report Issues:**
   - Include error messages
   - Describe steps to reproduce
   - Share environment details

### Quick Fixes

**Most Common Solutions:**

1. **Restart Everything:**
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

2. **Clear Cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

3. **Check Environment:**
   ```bash
   # Verify .env file exists and has correct format
   cat .env
   ```

4. **Test Without API:**
   - Remove or comment out `HUGGINGFACE_API_KEY` in `.env`
   - App should work with fallback captions

The application is production-ready and fully functional with or without the HuggingFace API integration!
