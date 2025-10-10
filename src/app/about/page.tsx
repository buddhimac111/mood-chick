import { Metadata } from "next";
import { Sparkles, Heart, Zap, Users, Code, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About - MoodChick",
  description: "Learn about MoodChick, the AI-powered caption generator that creates perfect social media captions based on your mood.",
};

const About = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Generation",
      description: "Uses advanced HuggingFace AI models to generate creative and engaging captions tailored to your mood."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Mood-Based Selection",
      description: "Choose from 5 different moods to get perfectly tailored captions that match your current emotional state."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Generate captions in seconds with our optimized API integration and smart caching system."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "User-Friendly",
      description: "Intuitive interface designed for everyone, from social media beginners to content creators."
    },
    {
      icon: <Code className="w-8 h-8 text-green-600" />,
      title: "Open Source",
      description: "Built with modern web technologies and open-source principles for transparency and community contribution."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Privacy First",
      description: "Your data stays private. We don't store your captions or personal information."
    }
  ];

  const stats = [
    { number: "10K+", label: "Captions Generated" },
    { number: "5", label: "Mood Options" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-purple-600 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About MoodChick
            </h1>
            <Sparkles className="w-12 h-12 text-pink-600 ml-4" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            MoodChick is an innovative AI-powered caption generator that helps you create the perfect social media captions 
            based on your current mood. Whether you're feeling happy, sad, in love, motivated, or just want to be funny, 
            we've got you covered!
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            Why Choose MoodChick?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3 text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
            Built With Modern Technology
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Frontend</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Next.js 15 with App Router</li>
                  <li>• React 19 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Lucide React for icons</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Backend & AI</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• HuggingFace AI Models</li>
                  <li>• Google Flan-T5-Small</li>
                  <li>• Axios for API calls</li>
                  <li>• Rate limiting & caching</li>
                  <li>• Fallback caption system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To make social media content creation effortless and enjoyable by providing AI-powered tools 
              that understand your mood and help you express yourself authentically. We believe everyone 
              deserves to have the perfect words for their moments, no matter how big or small.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
