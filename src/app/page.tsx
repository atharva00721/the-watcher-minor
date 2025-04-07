"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Server,
  AlertTriangle,
  Lock,
  Fingerprint,
  Zap,
} from "lucide-react";

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.3)_0%,rgba(0,0,0,0.7)_70%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Watcher AI Surveillance
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI-powered surveillance solutions for unparalleled
              security and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors duration-300">
                Explore Solutions
                <ArrowRight className="inline-block ml-2" />
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 font-medium transition-colors duration-300">
                Request Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Real-Time Monitoring",
                description:
                  "24/7 surveillance with instant alerts and insights.",
              },
              {
                icon: <Server className="w-6 h-6" />,
                title: "AI-Driven Analytics",
                description: "Advanced threat detection and behavior analysis.",
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: "Anomaly Detection",
                description:
                  "Identify unusual activities before they escalate.",
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Secure Data Storage",
                description:
                  "End-to-end encrypted data storage with access control.",
              },
              {
                icon: <Fingerprint className="w-6 h-6" />,
                title: "Biometric Recognition",
                description:
                  "Advanced facial and object recognition capabilities.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Rapid Response",
                description:
                  "Automated alerts and incident management workflows.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="h-12 w-12 flex items-center justify-center text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Technology Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src="https://placehold.co/600x400"
              alt="AI Surveillance Tech"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-4 md:order-1">
            <h2 className="text-3xl font-bold text-white">
              Advanced Technology
            </h2>
            <p className="text-gray-300">
              Our AI surveillance system uses cutting-edge technology to provide
              superior threat detection and response.
            </p>
            <ul className="list-disc pl-5 text-gray-400">
              <li>Deep Neural Networks</li>
              <li>Predictive Analytics</li>
              <li>Real-Time Data Processing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security and Compliance Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Security and Compliance
            </h2>
            <p className="text-gray-300">
              We prioritize the security and privacy of your data. Our
              surveillance solutions comply with industry standards and
              regulations.
            </p>
            <ul className="list-disc pl-5 text-gray-400">
              <li>End-to-End Encryption</li>
              <li>GDPR Compliance</li>
              <li>Regular Security Audits</li>
            </ul>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400"
              alt="Security Compliance"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Customer Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Watcher AI has transformed our security operations. The AI-driven insights are invaluable.",
                author: "John Doe, CEO",
              },
              {
                quote:
                  "The anomaly detection feature has helped us prevent numerous incidents. Highly recommended!",
                author: "Jane Smith, Security Manager",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-gray-700 rounded-lg">
                <p className="text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-400">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white">
            Secure Your Future with Watcher AI
          </h2>
          <p className="text-xl text-gray-300 mt-4">
            Get in touch with our experts to discuss your surveillance needs.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors duration-300">
            Contact Us
            <ArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-500 border-t border-gray-700">
        <p>
          &copy; {new Date().getFullYear()} Watcher AI Surveillance. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
