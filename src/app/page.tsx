"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Copy,
  RefreshCw,
  Sparkles,
  Heart,
  Smile,
  Frown,
  Zap,
  Laugh,
  Check,
  Download,
  Share2,
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
  const [generationCount, setGenerationCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentCaptions, setRecentCaptions] = useState<string[]>([]);

  const generateCaption = async () => {
    if (!selectedMood) return;

    setIsGenerating(true);
    try {
      const response = await axios.post("/api/generate-caption", {
        mood: selectedMood.id,
        prompt: selectedMood.prompt,
      });

      const data = response.data;
      setGeneratedCaption(data.caption);
      setGenerationCount(prev => prev + 1);
      setRecentCaptions(prev => [data.caption, ...prev.slice(0, 4)]); // Keep last 5 captions
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
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

  const downloadCaption = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCaption], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `moodchick-caption-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const shareCaption = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MoodChick Caption',
          text: generatedCaption,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying
      copyToClipboard();
    }
  };

  const clearAll = () => {
    setSelectedMood(null);
    setGeneratedCaption("");
    setGenerationCount(0);
    setRecentCaptions([]);
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
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            Select your mood and let AI craft the perfect social media caption
            for you! 🐥✨
          </p>
          {generationCount > 0 && (
            <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {generationCount} caption{generationCount !== 1 ? 's' : ''} generated
              </span>
            </div>
          )}
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
                className={`mood-button p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Success animation overlay */}
              {showSuccess && (
                <div className="absolute inset-0 bg-green-50 dark:bg-green-900/20 flex items-center justify-center z-10 animate-pulse">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <Check className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Caption Generated!</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Your Caption:
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center text-sm px-3 py-1 rounded-full transition-all ${
                      copied 
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                        : "text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                &ldquo;{generatedCaption}&rdquo;
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={generateCaption}
                  disabled={isGenerating}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Again
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </button>
                <button
                  onClick={downloadCaption}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={shareCaption}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Captions */}
        {recentCaptions.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Recent Captions
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="grid gap-3">
              {recentCaptions.slice(0, 3).map((caption, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setGeneratedCaption(caption)}
                >
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                    &ldquo;{caption}&rdquo;
                  </p>
                </div>
              ))}
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
