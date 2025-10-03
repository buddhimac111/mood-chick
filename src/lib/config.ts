// Configuration for MoodChick app
export const config = {
  // HuggingFace API Configuration
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY || "",
    model: process.env.HUGGINGFACE_MODEL || "google/flan-t5-small",
    apiUrl:
      process.env.HUGGINGFACE_API_URL ||
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
  },

  // App Configuration
  app: {
    name: "MoodChick",
    description: "AI-Powered Caption Generator",
    version: "1.0.0",
  },

  // UI Configuration
  ui: {
    animationDuration: 300,
    maxRetries: 3,
    defaultTimeout: 10000,
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
