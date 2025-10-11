import { NextRequest, NextResponse } from "next/server";
import { huggingFaceService } from "@/lib/huggingface";
import { rateLimiter } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientId = rateLimiter.getClientIdentifier(request);
        const rateLimitResult = rateLimiter.isAllowed(clientId);
        
        if (!rateLimitResult.allowed) {
            return NextResponse.json(
                { 
                    error: "Rate limit exceeded",
                    message: "Too many requests. Please try again later.",
                    resetTime: rateLimitResult.resetTime
                },
                { 
                    status: 429,
                    headers: {
                        'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
                        'X-RateLimit-Limit': '60',
                        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
                    }
                }
            );
        }

        const { mood, prompt } = await request.json();

        if (!mood) {
            return NextResponse.json(
                { error: "Mood is required" },
                { status: 400 }
            );
        }

        let caption: string;
        let source: 'huggingface' | 'fallback';

        try {
            // Try to use HuggingFace API if configured
            if (huggingFaceService.isConfigured()) {
                caption = await huggingFaceService.generateCaption(mood, prompt);
                source = 'huggingface';
            } else {
                // Use fallback captions if API key is not configured
                caption = huggingFaceService.getFallbackCaption(mood);
                source = 'fallback';
            }
        } catch (apiError) {
            console.warn("HuggingFace API failed, using fallback:", apiError);
            // Fallback to predefined captions if API fails
            caption = huggingFaceService.getFallbackCaption(mood);
            source = 'fallback';
        }

        return NextResponse.json({
            caption,
            mood,
            source,
            timestamp: new Date().toISOString(),
        }, {
            headers: {
                'X-RateLimit-Limit': '60',
                'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            }
        });

    } catch (error) {
        console.error("Error generating caption:", error);
        return NextResponse.json(
            { 
                error: "Failed to generate caption",
                message: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
