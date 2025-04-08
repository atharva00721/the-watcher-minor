"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Radar, Network } from "lucide-react";
// import AISurveillanceFlow from "./test/page";

const Landing = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-black selection:bg-blue-500/30 selection:text-white">
      {/* Unique Navigation with Animated Indicator */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-white font-medium tracking-wider">
                WATCHER
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 relative">
              {["Overview", "Technology", "Security", "API"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`text-sm relative px-4 py-2 transition-colors ${
                    activeTab === item.toLowerCase()
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                  {activeTab === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/5 rounded-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button className="relative group px-4 py-2 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-blue-500/20 transition-transform group-hover:translate-x-full duration-300" />
              <div className="relative text-sm text-white font-medium">
                Get Access →
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Dynamic Grid */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] grid-rows-[repeat(auto-fit,minmax(50px,1fr))] opacity-[0.15]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="border border-blue-500/20"
              style={{
                opacity: Math.random() * 0.3,
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-black" />
        </motion.div>

        <div className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block"
              >
                <div className="text-sm text-blue-500 border border-blue-500/30 rounded-full px-4 py-1 mb-4 backdrop-blur-sm">
                  Version 2.0 Now Available
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl sm:text-7xl font-medium tracking-tight text-white"
              >
                The Future of
                <span className="block mt-1">Surveillance AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mx-auto max-w-2xl text-lg text-gray-400"
              >
                Advanced machine learning algorithms process surveillance data
                in real-time, providing unparalleled security insights with
                quantum-grade encryption.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-4"
              >
                <button className="group relative px-6 py-3 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500 transition-transform group-hover:translate-x-full duration-300" />
                  <span className="relative text-white font-medium">
                    Request Demo
                  </span>
                </button>

                <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
                  Documentation →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid with Hover Effects */}
      <div className="relative py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Radar className="w-6 h-6" />,
                title: "Real-time Detection",
                description:
                  "Process surveillance data with sub-millisecond latency using edge computing",
              },
              {
                icon: <Network className="w-6 h-6" />,
                title: "Neural Analysis",
                description:
                  "Advanced pattern recognition across distributed sensor networks",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Quantum Security",
                description:
                  "Military-grade encryption for all data in transit and at rest",
              },
              // Add more features...
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative h-full p-6 bg-black rounded-xl border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Stats Display */}
      {/* <div className="border-t border-white/10 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.99%", label: "Accuracy Rate" },
              { value: "0.1ms", label: "Response Time" },
              { value: "24/7/365", label: "Monitoring" },
              { value: "Quantum", label: "Encryption" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="group relative text-center"
              >
                <div className="text-3xl font-light text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Testimonials Section */}
      {/* <AISurveillanceFlow /> */}
      {/* CTA Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-medium text-white">
              Ready to transform your surveillance capabilities?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join leading organizations using Watcher AI to secure their
              infrastructure and gain real-time insights.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors">
                Get Started Now →
              </button>
              <a
                href="/demo"
                className="px-8 py-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg font-medium transition-colors"
              >
                Demo Page →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400">
            &copy; {new Date().getFullYear()} WATCHER. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
