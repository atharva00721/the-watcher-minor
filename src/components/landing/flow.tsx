"use client";

import React, { forwardRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Video, Cpu, Brain, Bot, Bell, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { CardContent } from "../ui/card";

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    text?: string;
    animate?: boolean;
  }
>(({ className, children, text, animate = true }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={animate ? { scale: 0.9, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "z-10 flex flex-col items-center justify-center rounded-xl",
        "bg-background/10 backdrop-blur-sm",
        "border-2 border-foreground/10",
        "shadow-[0_4px_16px_0_hsl(var(--shadow)/0.1)]",
        "hover:bg-muted/20 hover:border-foreground/20 transition-all duration-300",
        "p-4",
        className
      )}
    >
      {children}
      {text && (
        <span className="text-sm font-medium text-foreground/80 mt-3">
          {text}
        </span>
      )}
    </motion.div>
  );
});

Circle.displayName = "Circle";

export function VideoPreprocessingFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoInputRef = useRef<HTMLDivElement>(null);
  const preprocessRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const iconClass = "h-8 w-8 text-foreground/60";
  const modelIconClass = "h-10 w-10 text-foreground/60";

  // Optional: Add loading state animation
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const beamConfig = {
    containerRef,
    duration: 10,
    pathColor: "#366666",
    gradientStartColor: "#f2f2f2",
    gradientStopColor: "#f2f2f2",
    pathWidth: 3,
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-foreground/60" />
      </div>
    );
  }

  return (
    <div className="bg-transparent  relative w-full mb-16 rounded-lg overflow-hidden  p-0 border-none">
      <div className="mb-6 ">
        <div className=" text-card-foreground text-2xl  font-semibold doto-black">
          Next-Gen AI Surveillance
        </div>
        <div className="text-md max-w-2xl text-muted-foreground">
          Intelligent monitoring powered by advanced machine learning
        </div>
      </div>

      <CardContent>
        <div
          className="relative flex flex-col md:flex-row mb-4 w-full items-center justify-center bg-background/5"
          ref={containerRef}
        >
          {/* Main Flow - Responsive Layout */}
          <div className="flex flex-col md:flex-row w-full max-w-6xl justify-between items-center gap-6 md:gap-0">
            <Circle ref={videoInputRef} text="CCTV Input">
              <Video className={cn(iconClass, "group-hover:text-primary")} />
            </Circle>

            <Circle ref={preprocessRef} text="Preprocessing">
              <Cpu className={cn(iconClass, "group-hover:text-primary")} />
            </Circle>

            <Circle ref={modelRef} className="size-24" text="Arvie">
              <Brain
                className={cn(modelIconClass, "group-hover:text-primary")}
              />
            </Circle>

            <Circle ref={geminiRef} className="size-24" text="Gemini">
              <Bot className={cn(modelIconClass, "group-hover:text-primary")} />
            </Circle>

            <div className="flex flex-col gap-6">
              <Circle ref={alertRef} text="Alert System">
                <Bell className={cn(iconClass, "group-hover:text-primary")} />
              </Circle>

              <Circle ref={reportRef} text="Report">
                <FileText
                  className={cn(iconClass, "group-hover:text-primary")}
                />
              </Circle>
            </div>
          </div>

          {/* Primary Flow */}
          <AnimatedBeam
            {...beamConfig}
            fromRef={videoInputRef}
            toRef={preprocessRef}
          />
          <AnimatedBeam
            {...beamConfig}
            fromRef={preprocessRef}
            toRef={modelRef}
          />
          <AnimatedBeam {...beamConfig} fromRef={modelRef} toRef={geminiRef} />

          {/* Split beams from Gemini */}
          <div className="flex flex-col justify-center gap-2">
            <AnimatedBeam
              {...beamConfig}
              fromRef={geminiRef}
              toRef={reportRef}
            />
            <AnimatedBeam
              {...beamConfig}
              fromRef={geminiRef}
              toRef={alertRef}
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
}
