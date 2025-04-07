"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export function AISurveillanceFlow() {
  // Use ref for each step in the flow
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const detectionRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      {/* Vertical arrangement for the flowchart */}
      <div className="flex flex-col items-center gap-10">
        <Circle ref={cameraRef}>Camera</Circle>
        <Circle ref={streamRef}>Stream</Circle>
        <Circle ref={analyticsRef}>Analytics</Circle>
        <Circle ref={detectionRef}>Detection</Circle>
        <Circle ref={alertRef}>Alert</Circle>
      </div>

      {/* Beams to visualize the data flow between nodes */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={cameraRef}
        toRef={streamRef}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={streamRef}
        toRef={analyticsRef}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={analyticsRef}
        toRef={detectionRef}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={detectionRef}
        toRef={alertRef}
        curvature={0}
      />
    </div>
  );
}

export default function TestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AISurveillanceFlow />
    </div>
  );
}
