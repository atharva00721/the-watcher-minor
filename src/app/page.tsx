"use client";

import Link from "next/link";

import {
  Eye,
  Cpu,
  Brain,
  BarChart3,
  Lock,
  ArrowRight,
  Github,
} from "lucide-react";

import { WatcherModelCardList } from "@/components/landing/demo-section";
import Sidebar from "@/components/landing/sidebar";
import FeatureCard from "@/components/landing/feature-card";
import TechStack from "@/components/landing/tech-stack";
import { VideoPreprocessingFlow } from "@/components/landing/flow";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex items-center justify-center pt-20 p-8 w-6xl mx-auto">
        <div className="mb-16">
          <Hero />

          <VideoPreprocessingFlow />

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 doto-black">
              Core Features
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <FeatureCard
                icon={<Eye className="w-6 h-6" />}
                title="Intelligent Monitoring"
                description="24/7 surveillance with advanced object and behavior recognition capabilities"
              />
              <FeatureCard
                icon={<Brain className="w-6 h-6" />}
                title="Gemini-Powered Analysis"
                description="Leveraging Google's Gemini for sophisticated scene understanding and context awareness"
              />
              <FeatureCard
                icon={<Cpu className="w-6 h-6" />}
                title="Custom ML Models"
                description="Proprietary machine learning models trained for specific security scenarios"
              />
              <FeatureCard
                icon={<BarChart3 className="w-6 h-6" />}
                title="Predictive Analytics"
                description="Identify potential security threats before they occur with pattern recognition"
              />
            </div>
          </div>

          <TechStack />
          <div className="mb-22  pt-10 pb-20">
            <WatcherModelCardList />
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">
              Implementation Process
            </h2>
            <div className="bg-card rounded-md p-8">
              <div className="flex flex-col space-y-8">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
                    <span>1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      System Assessment
                    </h3>
                    <p className="text-muted-foreground">
                      Our team evaluates your current security infrastructure
                      and identifies optimal integration points for The Watcher.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
                    <span>2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Custom Configuration
                    </h3>
                    <p className="text-muted-foreground">
                      We configure The Watcher&apos;s ML models to your specific
                      security needs and environment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
                    <span>3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Deployment & Training
                    </h3>
                    <p className="text-muted-foreground">
                      Seamless installation followed by a training period where
                      The Watcher learns your environment&apos;s normal
                      patterns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
                    <span>4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Ongoing Optimization
                    </h3>
                    <p className="text-muted-foreground">
                      Continuous improvement through regular updates and model
                      refinement based on performance data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Get Started</h2>
            <div className="bg-card rounded-md p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-lg font-medium mb-2">
                  Ready to enhance your security?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Deploy The Watcher in your environment and experience
                  next-generation AI surveillance.
                </p>
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md flex items-center hover:bg-primary/90 transition-colors">
                  Request Access <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-accent p-6 rounded-md">
                  <h4 className="text-md font-medium mb-4">
                    Enterprise Solutions
                  </h4>
                  <ul className="space-y-2 text-accent-foreground">
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                      Custom deployment
                    </li>
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                      Dedicated support
                    </li>
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                      Model customization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <footer className="text-center text-muted-foreground mt-16">
            <div className="mb-4">
              <Eye className="inline-block w-6 h-6" />
            </div>
            <p className="mb-2">The Watcher — Intelligent Surveillance</p>
            <p className="mb-4">© 2025 The Watcher AI. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
