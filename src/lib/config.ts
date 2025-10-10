// Configuration for MoodChick app
export const config = {
  // HuggingFace API Configuration
  huggingface: {
    apiKey: process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY || "",
    model: process.env.HUGGINGFACE_MODEL || "google/flan-t5-small",
    apiUrl:
      process.env.HUGGINGFACE_API_URL ||
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
    timeout: 30000, // 30 seconds timeout
    maxRetries: 3,
    retryDelay: 1000, // 1 second
  },

  // App Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "MoodChick",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "AI-Powered Caption Generator",
    version: "1.0.0",
  },

  // UI Configuration
  ui: {
    animationDuration: 300,
    maxRetries: 3,
    defaultTimeout: 10000,
  },

  // Rate Limiting
  rateLimit: {
    requestsPerMinute: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || "60"),
    windowMs: 60 * 1000, // 1 minute
    cleanupInterval: 5 * 60 * 1000, // 5 minutes
  },
};

// Mood prompts for AI generation
export const moodPrompts = {
  happy:
    "Write a happy, uplifting social media caption that spreads positivity and joy",
  sad: "Write a thoughtful, empathetic social media caption for sad moments that offers comfort",
  love: "Write a romantic, loving social media caption that expresses deep affection",
  motivational:
    "Write an inspiring, motivational social media caption that encourages and empowers",
  funny: "Write a funny, humorous social media caption that makes people laugh",
};
