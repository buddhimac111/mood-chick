import { NextRequest } from 'next/server';
import { config } from './config';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitEntry>();

export class RateLimiter {
  private requestsPerMinute: number;

  constructor() {
    this.requestsPerMinute = config.rateLimit.requestsPerMinute;
  }

  /**
   * Check if request is within rate limit
   */
  isAllowed(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const entry = rateLimitStore.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + windowMs,
      };
      rateLimitStore.set(identifier, newEntry);
      
      return {
        allowed: true,
        remaining: this.requestsPerMinute - 1,
        resetTime: newEntry.resetTime,
      };
    }

    if (entry.count >= this.requestsPerMinute) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.requestsPerMinute - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Get client identifier from request
   */
  getClientIdentifier(request: NextRequest): string {
    // Try to get IP from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    
    // In development, use a fallback
    if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1') {
      return 'development-client';
    }
    
    return ip;
  }

  /**
   * Clean up expired entries (call periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

// Clean up expired entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 5 * 60 * 1000);
}
