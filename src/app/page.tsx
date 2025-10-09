"use client";

import { useState } from "react";
import {
  Copy,
  RefreshCw,
  Sparkles,
  Heart,
  Smile,
  Frown,
  Zap,
  Laugh,
} from "lucide-react";

interface Mood {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  prompt: string;
}

const moods: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    icon: <Smile className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 hover:bg-yellow-200",
    prompt: "Write a happy, uplifting social media caption",
  },
  {
    id: "sad",
    name: "Sad",
    icon: <Frown className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100 hover:bg-blue-200",
    prompt:
      "Write a thoughtful, empathetic social media caption for sad moments",
  },
  {
    id: "love",
    name: "Love",
    icon: <Heart className="w-6 h-6" />,
    color: "text-red-600",
    bgColor: "bg-red-100 hover:bg-red-200",
    prompt: "Write a romantic, loving social media caption",
  },
  {
    id: "motivational",
    name: "Motivational",
    icon: <Zap className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100 hover:bg-purple-200",
    prompt: "Write an inspiring, motivational social media caption",
  },
  {
    id: "funny",
    name: "Funny",
    icon: <Laugh className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100 hover:bg-green-200",
    prompt: "Write a funny, humorous social media caption",
  },
];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [generatedCaption, setGeneratedCaption] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCaption = async () => {
    if (!selectedMood) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selectedMood.id,
          prompt: selectedMood.prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const data = await response.json();
      setGeneratedCaption(data.caption);
    } catch (error) {
      console.error("Error generating caption:", error);
      setGeneratedCaption(
        "Sorry, couldn't generate a caption right now. Please try again!"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MoodChick
            </h1>
            <Sparkles className="w-8 h-8 text-pink-600 ml-3" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select your mood and let AI craft the perfect social media caption
            for you! 🐥✨
          </p>
        </div>

        {/* Mood Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
            How are you feeling today?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood)}
                className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedMood?.id === mood.id
                    ? `${mood.bgColor} ring-2 ring-offset-2 ring-purple-500 shadow-lg scale-105`
                    : `${mood.bgColor} hover:shadow-md`
                }`}
              >
                <div className={`${mood.color} text-center`}>
                  <div className="flex justify-center mb-3">{mood.icon}</div>
                  <p className="font-medium text-sm">{mood.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        {selectedMood && (
          <div className="text-center mb-8">
            <button
              onClick={generateCaption}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Caption
                </div>
              )}
            </button>
          </div>
        )}

        {/* Generated Caption */}
        {generatedCaption && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Your Caption:
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-sm text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                &ldquo;{generatedCaption}&rdquo;
              </p>
              <div className="flex gap-3">
                <button
                  onClick={generateCaption}
                  disabled={isGenerating}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="w-4 h-4 mr-2 inline" />
                  Generate Again
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 mr-2 inline" />
                  Copy Caption
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
            Why Choose MoodChick?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">AI-Powered</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Uses advanced AI to generate creative and engaging captions
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Mood-Based</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Select from various moods to get perfectly tailored captions
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copy className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Easy to Use</h4>
              <p className="text-gray-600 dark:text-gray-400">
                One-click copy and generate again for endless inspiration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
