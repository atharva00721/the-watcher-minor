"use client";
import {
  Eye,
  Cpu,
  Brain,
  BarChart3,
  ArrowRight,
  Activity,
  Shield,
  Clock,
  Settings,
} from "lucide-react";
import { WatcherModelCardList } from "@/components/landing/demo-section";
import Sidebar from "@/components/landing/sidebar";
import FeatureCard from "@/components/landing/feature-card";
import TechStack from "@/components/landing/tech-stack";
import { VideoPreprocessingFlow } from "@/components/landing/flow";
import Hero from "@/components/landing/hero";
import Footer from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 max-w-6xl mx-auto">
        <div className="py-20 px-8">
          <Hero />

          <section className="mb-24">
            <VideoPreprocessingFlow />
          </section>

          <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8 tracking-tight">
              Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
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
          </section>

          <section className="mb-24">
            <TechStack />
          </section>

          <section className="mb-24">
            <h2 className="text-3xl font-bold  tracking-tight">Our Models</h2>
            <p className="text-muted-foreground">
              Explore our cutting-edge AI models designed for real-world
              applications.
            </p>
            <WatcherModelCardList />
          </section>

          <section className="mb-24">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Implementation Process
              </h2>
              {/* <Button variant="outline" className="group">
                Learn more{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button> */}
            </div>
            <div className="bg-card rounded-lg shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      System Assessment
                    </h3>
                    <p className="text-muted-foreground">
                      Our team evaluates your current security infrastructure
                      and identifies optimal integration points for The Watcher.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Custom Configuration
                    </h3>
                    <p className="text-muted-foreground">
                      We configure The Watcher's ML models to your specific
                      security needs and environment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Deployment & Training
                    </h3>
                    <p className="text-muted-foreground">
                      Seamless installation followed by a training period where
                      The Watcher learns your environment's normal patterns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
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
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
