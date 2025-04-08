import Link from "next/link";
import React from "react";
import { Brain, Cpu, Eye, Github, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Hero = () => {
  return (
    <div>
      <h1 className="doto-black text-6xl font-light tracking-widest mb-6 text-primary glow-text">
        THE WATCHER
      </h1>

      <div className="max-w-2xl mb-10">
        <p className="text-lg mb-4 leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">The Watcher</span> is an
          advanced AI-powered surveillance platform integrating
          <span className="font-medium text-primary"> Gemini</span> technology
          and proprietary{" "}
          <span className="font-medium text-foreground">ML models</span> to
          revolutionize security monitoring and threat prediction.
        </p>
        <p className="text-lg mb-4 leading-relaxed text-muted-foreground">
          Our system comprehends environments in real-time, adapts to evolving
          patterns, and identifies potential security risks with unparalleled
          accuracy.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <Badge variant="outline" className="bg-accent text-accent-foreground">
            <Shield className="w-3 h-3 mr-1" /> Enterprise-grade security
          </Badge>
          <Badge variant="outline" className="bg-accent text-accent-foreground">
            <Brain className="w-3 h-3 mr-1" /> AI-powered analytics
          </Badge>
          <Badge variant="outline" className="bg-accent text-accent-foreground">
            <Cpu className="w-3 h-3 mr-1" /> Edge processing
          </Badge>
        </div>
      </div>

      <div className="flex justify-items-start w-full space-x-4 mb-12">
        <div className="flex w-[60%] h-fit gap-6">
          <Button asChild variant="primary" className="w-fit px-0">
            <Link href="/demo" className="flex items-center w-fit gap-2">
              <Eye className="w-4 h-4 mr-2" /> Try Demo
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            <Shield className="w-4 h-4 mr-2" />
            Learn More
          </Button>
        </div>
        <div className="ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="p-2" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-popover border-border">
                <p className="text-popover-foreground text-sm">
                  View our GitHub repository
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
