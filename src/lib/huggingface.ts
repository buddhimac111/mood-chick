import { config, moodPrompts } from './config';

export interface HuggingFaceResponse {
  generated_text: string;
  error?: string;
}

export interface HuggingFaceError {
  error: string;
  estimated_time?: number;
}

export class HuggingFaceService {
  private apiKey: string;
  private apiUrl: string;
  private timeout: number;
  private maxRetries: number;
  private retryDelay: number;

  constructor() {
    this.apiKey = config.huggingface.apiKey;
    this.apiUrl = config.huggingface.apiUrl;
    this.timeout = config.huggingface.timeout;
    this.maxRetries = config.huggingface.maxRetries;
    this.retryDelay = config.huggingface.retryDelay;
  }

  /**
   * Generate a caption using HuggingFace flan-t5-small model
   */
  async generateCaption(mood: string, customPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      console.log('HuggingFace API key not configured, using fallback captions');
      return this.getFallbackCaption(mood);
    }

    const prompt = customPrompt || moodPrompts[mood as keyof typeof moodPrompts] || moodPrompts.happy;
    
    const payload = {
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
    };

    return this.makeRequestWithRetry(payload);
  }

  /**
   * Make a request to HuggingFace API with retry logic
   */
  private async makeRequestWithRetry(payload: Record<string, unknown>, attempt: number = 1): Promise<string> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : this.retryDelay * attempt;
          
          if (attempt < this.maxRetries) {
            await this.sleep(delay);
            return this.makeRequestWithRetry(payload, attempt + 1);
          }
        }

        // Handle model loading
        if (response.status === 503 && errorData.estimated_time) {
          if (attempt < this.maxRetries) {
            await this.sleep(errorData.estimated_time * 1000);
            return this.makeRequestWithRetry(payload, attempt + 1);
          }
        }

        throw new Error(`HuggingFace API error: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data: HuggingFaceResponse[] = await response.json();
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid response from HuggingFace API');
      }

      return data[0].generated_text || 'No caption generated';

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - HuggingFace API took too long to respond');
      }

      if (attempt < this.maxRetries && !(error instanceof Error && error.message.includes('API key'))) {
        await this.sleep(this.retryDelay * attempt);
        return this.makeRequestWithRetry(payload, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * Sleep utility function
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get fallback captions when API is not available
   */
  getFallbackCaption(mood: string): string {
    const fallbackCaptions = {
      happy: [
        "Sunshine and smiles make everything better! ☀️✨",
        "Today I choose joy and gratitude! 🌟",
        "Life is beautiful when you focus on the good! 💫",
        "Happiness is not a destination, it's a way of life! 🌈",
        "Every day is a new opportunity to be happy! 🌸"
      ],
      sad: [
        "Sometimes the rain helps us appreciate the sunshine 🌧️",
        "It's okay to not be okay. Tomorrow is a new day 💙",
        "Healing takes time, but every step forward counts 🌱",
        "Even in darkness, there's always a glimmer of hope ✨",
        "Tough times don't last, but tough people do 💪"
      ],
      love: [
        "Love is the greatest adventure of all 💕",
        "You make my heart skip a beat every single day 💖",
        "In your arms, I found my home 🏠💕",
        "Love isn't about finding the perfect person, it's about seeing an imperfect person perfectly 💝",
        "You are my today and all of my tomorrows 💕"
      ],
      motivational: [
        "Believe in yourself and all that you are! 💪✨",
        "Success is not final, failure is not fatal: it is the courage to continue that counts 🚀",
        "Your only limit is your mind. Break free! 🌟",
        "Every expert was once a beginner. Keep going! 🔥",
        "The only impossible journey is the one you never begin 🌟"
      ],
      funny: [
        "I'm not arguing, I'm just explaining why I'm right 😂",
        "My bed and I have a special relationship. We're perfect for each other 🛏️",
        "I'm not lazy, I'm just on energy-saving mode 🔋",
        "I put the 'pro' in procrastination! 📝",
        "I'm not short, I'm just concentrated awesome! 😄"
      ]
    };

    const moodCaptions = fallbackCaptions[mood as keyof typeof fallbackCaptions] || fallbackCaptions.happy;
    return moodCaptions[Math.floor(Math.random() * moodCaptions.length)];
  }
}

// Export a singleton instance
export const huggingFaceService = new HuggingFaceService();
