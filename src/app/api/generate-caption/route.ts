import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { mood, prompt } = await request.json();

    // For now, return mock responses
    // In production, this would integrate with HuggingFace API
    const responses = {
      happy: [
        "Sunshine and smiles make everything better! ☀️✨",
        "Today I choose joy and gratitude! 🌟",
        "Life is beautiful when you focus on the good! 💫",
        "Happiness is not a destination, it's a way of life! 🌈",
        "Every day is a new opportunity to be happy! 🌸",
      ],
      sad: [
        "Sometimes the rain helps us appreciate the sunshine 🌧️",
        "It's okay to not be okay. Tomorrow is a new day 💙",
        "Healing takes time, but every step forward counts 🌱",
        "Even in darkness, there's always a glimmer of hope ✨",
        "Tough times don't last, but tough people do 💪",
      ],
      love: [
        "Love is the greatest adventure of all 💕",
        "You make my heart skip a beat every single day 💖",
        "In your arms, I found my home 🏠💕",
        "Love isn't about finding the perfect person, it's about seeing an imperfect person perfectly 💝",
        "You are my today and all of my tomorrows 💕",
      ],
      motivational: [
        "Believe in yourself and all that you are! 💪✨",
        "Success is not final, failure is not fatal: it is the courage to continue that counts 🚀",
        "Your only limit is your mind. Break free! 🌟",
        "Every expert was once a beginner. Keep going! 🔥",
        "The only impossible journey is the one you never begin 🌟",
      ],
      funny: [
        "I'm not arguing, I'm just explaining why I'm right 😂",
        "My bed and I have a special relationship. We're perfect for each other 🛏️",
        "I'm not lazy, I'm just on energy-saving mode 🔋",
        "I put the 'pro' in procrastination! 📝",
        "I'm not short, I'm just concentrated awesome! 😄",
      ],
    };

    const moodResponses =
      responses[mood as keyof typeof responses] || responses.happy;
    const randomCaption =
      moodResponses[Math.floor(Math.random() * moodResponses.length)];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      caption: randomCaption,
      mood: mood,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
}
