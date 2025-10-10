import { Metadata } from "next";
import { Shield, Eye, Lock, Database, Users, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - MoodChick",
  description: "Learn about how MoodChick protects your privacy and handles your data.",
};

const Privacy = () => {
  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Information We Collect",
      content: [
        "We do not collect personal information from users.",
        "Captions generated are not stored on our servers.",
        "We may collect anonymous usage statistics to improve our service.",
        "Any data sent to our API is processed in real-time and immediately discarded."
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-green-600" />,
      title: "How We Protect Your Data",
      content: [
        "All API communications are encrypted using HTTPS.",
        "We use secure, industry-standard practices for data handling.",
        "No personal data is stored in our databases.",
        "We implement rate limiting to prevent abuse and protect our services."
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-purple-600" />,
      title: "Data Processing",
      content: [
        "Caption generation requests are sent to HuggingFace AI services.",
        "We do not retain or store the content of your requests.",
        "All processing happens in real-time and is not logged.",
        "We use fallback captions when AI services are unavailable."
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Third-Party Services",
      content: [
        "We use HuggingFace AI services for caption generation.",
        "HuggingFace's privacy policy applies to data sent to their services.",
        "We do not share your data with any other third parties.",
        "All third-party integrations are carefully vetted for privacy compliance."
      ]
    }
  ];

  const principles = [
    "Privacy by Design - We build privacy into every aspect of our service",
    "Data Minimization - We only collect what's absolutely necessary",
    "Transparency - We're open about how we handle your data",
    "User Control - You have full control over your data and usage",
    "Security First - We prioritize the security of our platform"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-purple-600 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <Shield className="w-12 h-12 text-pink-600 ml-4" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how MoodChick collects, uses, and protects your information.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Privacy Principles */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
            Our Privacy Principles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-400">{principle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                {section.icon}
                <h2 className="text-2xl font-bold ml-3 text-gray-800 dark:text-gray-200">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-400">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 space-y-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-lg leading-relaxed mb-6">
              Since we don't collect personal data, there's no personal information to access, modify, or delete. 
              However, if you have any concerns about your privacy or our data practices, please don't hesitate to contact us.
            </p>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>privacy@moodchick.com</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Cookies and Tracking</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use minimal cookies and tracking technologies:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Essential cookies for basic functionality</li>
              <li>• Anonymous analytics to improve our service</li>
              <li>• No advertising or marketing cookies</li>
              <li>• No cross-site tracking</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. 
              We encourage you to review this policy periodically to stay informed about how we protect your privacy.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Questions About Privacy?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about this privacy policy or our data practices, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600 dark:text-gray-400">privacy@moodchick.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600 dark:text-gray-400">hello@moodchick.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
