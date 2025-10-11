"use client";

import {
    Sparkles,
    Heart,
    Users,
    Zap,
    Target,
    Award,
    ArrowLeft,
    Github,
    Twitter,
    Mail,
    BookOpen,
    Lightbulb,
    Rocket,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10 text-purple-600 animate-pulse mr-3" />
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                            About MoodChick
                        </h1>
                        <Sparkles className="w-10 h-10 text-pink-600 animate-pulse ml-3" />
                    </div>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Bringing your emotions to life with AI-powered captions that
                        resonate with your mood 🐥✨
                    </p>
                </div>

                {/* Story Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                Our Story
                            </h2>
                        </div>
                        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            <p>
                                <strong>MoodChick</strong> was born from a simple
                                observation: finding the right words to express our
                                feelings on social media can be surprisingly difficult.
                                Whether you&apos;re feeling happy, sad, motivated, or in
                                love, capturing that emotion in a perfect caption is an
                                art form.
                            </p>
                            <p>
                                We combined the power of artificial intelligence with an
                                understanding of human emotions to create a tool that
                                helps you express yourself authentically. With just a
                                mood selection and a click, MoodChick generates captions
                                that truly resonate with how you&apos;re feeling.
                            </p>
                            <p>
                                Our mission is simple: empower everyone to share their
                                stories and emotions with confidence, one caption at a
                                time. 🚀
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
                        Mission & Vision
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-3xl p-8 shadow-xl border border-purple-200 dark:border-purple-800 transform hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <Target className="w-9 h-9 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-200 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                To democratize creative expression by providing
                                AI-powered tools that help everyone craft compelling,
                                mood-appropriate content for their social media presence.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 rounded-3xl p-8 shadow-xl border border-pink-200 dark:border-pink-800 transform hover:scale-105 transition-all duration-300">
                            <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <Lightbulb className="w-9 h-9 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-pink-900 dark:text-pink-200 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                To become the go-to platform for emotional expression
                                online, helping millions share their authentic selves
                                through perfectly crafted captions and content.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
                                Authenticity
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                We believe in helping you express your genuine emotions,
                                not creating fake personas.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
                                Innovation
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                Leveraging cutting-edge AI technology to make creativity
                                accessible to everyone.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                                <Users className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
                                Community
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                Building a supportive space where everyone can share and
                                celebrate their emotions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Features Showcase */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
                        What Makes Us Special
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: "AI-Powered Intelligence",
                                description:
                                    "Advanced natural language processing understands and captures the nuances of different moods and emotions.",
                                gradient: "from-purple-500 to-indigo-500",
                            },
                            {
                                icon: <Rocket className="w-6 h-6" />,
                                title: "Lightning Fast",
                                description:
                                    "Generate perfect captions in seconds, not hours. Get inspired instantly and keep your creative flow going.",
                                gradient: "from-pink-500 to-rose-500",
                            },
                            {
                                icon: <Heart className="w-6 h-6" />,
                                title: "Mood-Centric Design",
                                description:
                                    "Five distinct mood categories ensure your caption matches exactly how you're feeling right now.",
                                gradient: "from-red-500 to-pink-500",
                            },
                            {
                                icon: <Award className="w-6 h-6" />,
                                title: "Quality Guaranteed",
                                description:
                                    "Every caption is crafted to be engaging, authentic, and perfectly suited for social media platforms.",
                                gradient: "from-indigo-500 to-purple-500",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div
                                    className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-5xl mx-auto mb-20">
                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                            MoodChick by the Numbers
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                    5
                                </div>
                                <div className="text-xl text-purple-100">
                                    Mood Categories
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                    ∞
                                </div>
                                <div className="text-xl text-purple-100">
                                    Caption Possibilities
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                    100%
                                </div>
                                <div className="text-xl text-purple-100">
                                    Free to Use
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <Zap className="w-8 h-8 text-purple-600 mr-3" />
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                Built with Modern Tech
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            MoodChick is powered by cutting-edge technologies to deliver
                            the best experience:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "Next.js 15",
                                "TypeScript",
                                "Tailwind CSS",
                                "AI/ML Models",
                                "React 19",
                                "HuggingFace",
                                "Lucide Icons",
                                "Modern UI/UX",
                            ].map((tech, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 text-center font-semibold text-gray-700 dark:text-gray-300 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow"
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Connect Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-3xl p-12 shadow-2xl border border-purple-200 dark:border-purple-800 text-center">
                        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                            Let&apos;s Connect! 🚀
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            We&apos;re always excited to hear from our users. Have
                            feedback, suggestions, or just want to say hi?
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://github.com/yourusername/mood-chick"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                GitHub
                            </a>
                            <a
                                href="https://twitter.com/moodchick"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Twitter className="w-5 h-5 mr-2" />
                                Twitter
                            </a>
                            <a
                                href="mailto:hello@moodchick.com"
                                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                        Ready to express your mood?
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Try MoodChick Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

