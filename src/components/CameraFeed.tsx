"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { loadModel, clearModelCache } from "@/lib/model";
import { InferenceSession } from "onnxruntime-web";
import { FramesDisplay } from "@/components/FramesDisplay";
import { captureVideoFrame } from "@/lib/frameCapture";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { runInference, InferenceResult } from "@/lib/inference";
import { Progress } from "@/components/ui/progress";
import { ViolenceReport } from "@/lib/gemini";
import { ViolenceReportsList } from "@/components/ViolenceReportsList";
import { AlertCircle, Clock, Loader2 } from "lucide-react";
import { processAndAlertIfNeeded } from "@/lib/alertManager";

// Constants
const MAX_FRAMES = 16;
const MAX_VIOLENCE_FRAMES = 10;
const VIOLENCE_THRESHOLD = 0.7;
const COOLDOWN_PERIOD = 5 * 60; // 5 minutes in seconds
const CAPTURE_INTERVAL = 500; // ms

export default function CameraFeed() {
  // DOM References
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processCanvasRef = useRef<HTMLCanvasElement>(null);

  // Camera and capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [modelUrl, setModelUrl] = useState("/models/500model.onnx");
  const [session, setSession] = useState<typeof InferenceSession | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // UI state
  const [showFrames, setShowFrames] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Frame collection
  const [recentFrames, setRecentFrames] = useState<string[]>([]);
  const [processedFrames, setProcessedFrames] = useState<string[]>([]);
  const [inferenceResult, setInferenceResult] =
    useState<InferenceResult | null>(null);

  // Performance metrics
  const [fps, setFps] = useState<number>(0);
  const frameTimestamps = useRef<number[]>([]);
  const lastCapture = useRef<number>(0);

  // Violence detection
  const [violenceDetected, setViolenceDetected] = useState(false);
  const [violenceFrames, setViolenceFrames] = useState<string[]>([]);
  const [violenceScores, setViolenceScores] = useState<number[]>([]);
  const [violenceReports, setViolenceReports] = useState<
    (ViolenceReport | null)[]
  >([]);

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const violenceDetectionTimeout = useRef<NodeJS.Timeout | null>(null);

  // Stats and cooldown
  const [falsePositives, setFalsePositives] = useState(0);
  const [actualViolence, setActualViolence] = useState(0);
  const [reportCooldown, setReportCooldown] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
  const cooldownInterval = useRef<NodeJS.Timeout | null>(null);

  // Camera control functions
  const startCamera = useCallback(async () => {
    try {
      setErrorMessage(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setErrorMessage("Camera access denied. Please check permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;

      setStream(null);
      setIsCameraActive(false);
      setIsCapturing(false);
      setRecentFrames([]);
      setProcessedFrames([]);
      setInferenceResult(null);
    }
  }, [stream]);

  // Handle violence detection
  const handleViolenceDetection = useCallback(
    (frame: string, confidenceScore: number) => {
      // Set violence detected flag
      setViolenceDetected(true);

      // Add frame and score to collections if under limit
      setViolenceFrames((prev) =>
        prev.length < MAX_VIOLENCE_FRAMES ? [...prev, frame] : prev
      );

      setViolenceScores((prev) =>
        prev.length < MAX_VIOLENCE_FRAMES ? [...prev, confidenceScore] : prev
      );

      // Reset timeout if exists
      if (violenceDetectionTimeout.current) {
        clearTimeout(violenceDetectionTimeout.current);
      }

      // Reset violence detection if no more violence detected in 5s
      violenceDetectionTimeout.current = setTimeout(() => {
        setViolenceDetected(false);
      }, 5000);
    },
    []
  );

  // Cooldown handling
  const startCooldown = useCallback(() => {
    setReportCooldown(true);
    setCooldownTimeLeft(COOLDOWN_PERIOD);

    if (cooldownInterval.current) {
      clearInterval(cooldownInterval.current);
    }

    cooldownInterval.current = setInterval(() => {
      setCooldownTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownInterval.current!);
          setReportCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Format time as MM:SS
  const formatCooldownTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Frame processing
  const captureFrame = useCallback(async () => {
    const now = performance.now();
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const processCanvas = processCanvasRef.current;

    if (!video || !canvas || !processCanvas || !session) return;
    if (now - lastCapture.current < CAPTURE_INTERVAL) return;

    lastCapture.current = now;
    try {
      setIsProcessing(true);

      // Calculate FPS
      frameTimestamps.current.push(now);
      if (frameTimestamps.current.length > 10) {
        frameTimestamps.current.shift();
      }

      if (frameTimestamps.current.length > 1) {
        const timeElapsed = now - frameTimestamps.current[0];
        const framesElapsed = frameTimestamps.current.length - 1;
        setFps(Math.round((framesElapsed / timeElapsed) * 10000) / 10);
      }

      // Capture and process frame
      const { originalFrame, processedFrame } = captureVideoFrame(
        video,
        canvas,
        processCanvas
      );

      // Update frame collections
      setRecentFrames((prev) => [
        originalFrame,
        ...prev.slice(0, MAX_FRAMES - 1),
      ]);

      if (processedFrame) {
        setProcessedFrames((prev) => [
          processedFrame,
          ...prev.slice(0, MAX_FRAMES - 1),
        ]);
      }

      // Run inference
      if (session && processCanvas) {
        try {
          const result = await runInference(processCanvas, session);
          setInferenceResult(result);

          // Check for violence
          if (
            result?.prediction === "Violence" &&
            result?.confidence >= VIOLENCE_THRESHOLD
          ) {
            handleViolenceDetection(originalFrame, result.confidence);
          }

          setErrorMessage(null);
        } catch (err) {
          console.error("Inference failed:", err);
          setErrorMessage("Inference failed. Check console for details.");
        }
      }
    } catch (err) {
      console.error("Frame capture failed:", err);
      setErrorMessage("Frame capture failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  }, [session, handleViolenceDetection]);

  // Report generation effect
  useEffect(() => {
    // Check conditions for report generation
    if (
      violenceFrames.length >= MAX_VIOLENCE_FRAMES &&
      !isGeneratingReport &&
      violenceDetected &&
      !reportCooldown
    ) {
      const generateReport = async () => {
        setIsGeneratingReport(true);
        try {
          // Process frames and send alert if needed
          const result = await processAndAlertIfNeeded(
            [...violenceFrames],
            [...violenceScores]
          );

          if (result.report) {
            // Update stats
            if (result.report.isActualViolence) {
              setActualViolence((prev) => prev + 1);
            } else {
              setFalsePositives((prev) => prev + 1);
            }

            // Update UI state
            if (result.report) {
              setViolenceReports((prev) => [...prev, result.report]);
            }

            // Show alert status
            if (result.alertSent) {
              setErrorMessage("Alert sent to monitoring team!");
              setTimeout(() => setErrorMessage(null), 5000);
            }

            setViolenceFrames([]);
            setViolenceScores([]);
            setViolenceDetected(result.report.isActualViolence);

            // Start cooldown period
            startCooldown();
          }
        } catch (error) {
          console.error("Failed to generate report:", error);
          setErrorMessage(
            "Failed to generate report. Check console for details."
          );
        } finally {
          setIsGeneratingReport(false);
        }
      };

      generateReport();
    }
  }, [violenceFrames, violenceDetected, reportCooldown, startCooldown]);

  // Animation frame for continuous capture
  useEffect(() => {
    let animationFrame: number;

    if (isCapturing) {
      const processFrame = () => {
        captureFrame();
        animationFrame = requestAnimationFrame(processFrame);
      };

      animationFrame = requestAnimationFrame(processFrame);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isCapturing, captureFrame]);

  // Clean up resources
  useEffect(() => {
    return () => {
      // Clean up stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Clean up timers
      if (violenceDetectionTimeout.current) {
        clearTimeout(violenceDetectionTimeout.current);
      }
      if (cooldownInterval.current) {
        clearInterval(cooldownInterval.current);
      }

      // Clean up models
      clearModelCache();
    };
  }, [stream]);

  // Reset violence detection when stopping
  useEffect(() => {
    if (!isCapturing && violenceDetectionTimeout.current) {
      clearTimeout(violenceDetectionTimeout.current);
      violenceDetectionTimeout.current = null;
      setViolenceDetected(false);
    }
  }, [isCapturing]);

  // Load model when URL changes
  useEffect(() => {
    setInferenceResult(null);
    setRecentFrames([]);
    setProcessedFrames([]);

    loadModel(modelUrl)
      .then(setSession)
      .catch((err) => {
        console.error("Model loading failed:", err);
        setSession(null);
        setErrorMessage("Failed to load model. Check console for details.");
      });
  }, [modelUrl]);

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-5xl mx-auto">
      {/* Video display */}
      <Card className="w-full bg-transparent h-fit border-none">
        <CardContent className="p-0">
          <div className="relative w-full">
            {/* Inactive camera overlay */}
            {!isCameraActive && (
              <div className="absolute inset-0 bg-muted/50 flex items-center justify-center rounded-lg z-10">
                <div className="bg-background/80 px-4 py-2 rounded-md backdrop-blur-sm">
                  <p className="text-muted-foreground font-medium">
                    Camera inactive
                  </p>
                </div>
              </div>
            )}

            {/* Video element */}
            <video
              ref={videoRef}
              autoPlay
              muted
              className="rounded-lg border border-border w-full h-auto aspect-video bg-muted/20"
            />

            {/* Inference results overlay */}
            {inferenceResult && (
              <div className="absolute bottom-4 right-4 bg-background/80 p-3 rounded-lg backdrop-blur-sm border shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-lg font-bold ${
                      inferenceResult.prediction === "Safe"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {inferenceResult.prediction === "Safe"
                      ? "✅ Safe"
                      : "⚠️ Violence"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Confidence:</span>
                    <span className="font-medium">
                      {Math.round(inferenceResult.confidence * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={inferenceResult.confidence * 100}
                    className={`h-1.5 ${
                      inferenceResult.prediction === "Safe"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {inferenceResult.inferenceTime.toFixed(2)}ms
                  </div>
                </div>
              </div>
            )}

            {/* Status indicators */}
            {isProcessing && (
              <div className="absolute top-2 left-2">
                <Badge
                  variant="outline"
                  className="bg-background/50 animate-pulse"
                >
                  Processing...
                </Badge>
              </div>
            )}

            {isCapturing && (
              <div className="absolute top-2 right-2 bg-background/70 px-2 py-1 rounded text-xs">
                {fps.toFixed(1)} FPS
              </div>
            )}

            {errorMessage && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-500/80 text-white px-4 py-2 rounded-md backdrop-blur-sm">
                {errorMessage}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert notifications */}
      {violenceDetected && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-pulse flex items-center gap-2 z-50">
          <AlertCircle className="h-5 w-5" />
          <span className="font-bold">Potential Violence Detected</span>
          <span className="text-xs bg-red-700 px-2 py-0.5 rounded-full">
            {violenceFrames.length}/{MAX_VIOLENCE_FRAMES} frames
          </span>
        </div>
      )}

      {isGeneratingReport && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Generating report...</span>
        </div>
      )}

      {reportCooldown && (
        <div className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50">
          <Clock className="h-5 w-5" />
          <span>Cooldown: {formatCooldownTime(cooldownTimeLeft)}</span>
        </div>
      )}

      {/* Hidden canvases */}
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
      <canvas
        ref={processCanvasRef}
        width={128}
        height={128}
        className="hidden"
      />

      {/* Control buttons */}
      <div className="flex gap-3 w-full justify-center items-center">
        <Button
          onClick={isCameraActive ? stopCamera : startCamera}
          variant={isCameraActive ? "destructive" : "accent"}
          size="lg"
        >
          {isCameraActive ? "Stop Camera" : "Start Camera"}
        </Button>
        <Button
          onClick={() => setIsCapturing((prev) => !prev)}
          disabled={!isCameraActive}
          variant={isCapturing ? "secondary" : "minimal"}
          size="lg"
        >
          {isCapturing ? (
            <>
              <span className="mr-2">●</span> Stop Capturing
            </>
          ) : (
            "Start Capturing"
          )}
        </Button>
        <Select value={modelUrl} onValueChange={setModelUrl}>
          <SelectTrigger id="model-select" className="w-full">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/models/500model.onnx">500model.onnx</SelectItem>
            <SelectItem value="/models/violence-light.onnx">
              violence-light.onnx
            </SelectItem>
            <SelectItem value="/models/custom.onnx">custom.onnx</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="outline" className={session ? "" : "bg-yellow-500/20"}>
          {session ? "Model loaded" : "Loading model..."}
        </Badge>
      </div>

      {/* Report controls and stats */}
      <div className="flex flex-wrap gap-4 w-full justify-between items-center border rounded-lg p-4 bg-background/50">
        <div className="flex items-center space-x-2">
          <Switch
            id="show-reports"
            checked={showReports}
            onCheckedChange={setShowReports}
          />
          <Label htmlFor="show-reports" className="font-medium">
            Show Reports
          </Label>
        </div>

        <div className="flex items-center gap-2">
          {violenceReports.length > 0 && (
            <Badge variant="outline">
              {violenceReports.length} Report
              {violenceReports.length !== 1 ? "s" : ""}
            </Badge>
          )}

          <div className="flex items-center  gap-2 ml-4">
            <Badge
              variant="outline"
              className="text-green-500 dark:text-green-400"
            >
              Verified: {actualViolence}
            </Badge>
            <Badge
              variant="outline"
              className="text-amber-500 dark:text-amber-400"
            >
              False Alerts: {falsePositives}
            </Badge>

            {reportCooldown && (
              <Badge
                variant="outline"
                className="text-blue-500 dark:text-blue-400"
              >
                Cooldown: {formatCooldownTime(cooldownTimeLeft)}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Reports list */}
      {showReports && (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">Violence Reports</h3>
          <ViolenceReportsList
            reports={violenceReports.filter(
              (report): report is ViolenceReport => report !== null
            )}
            onDeleteReport={(id) =>
              setViolenceReports((prev) => prev.filter((r) => r?.id !== id))
            }
          />
        </div>
      )}

      {/* Frames controls */}
      {isCapturing && recentFrames.length > 0 && (
        <div className="flex flex-wrap justify-between items-center w-full border rounded-lg p-3 bg-background/50">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="ml-2">
              {recentFrames.length} frames captured
            </Badge>

            {inferenceResult && (
              <Badge
                variant={
                  inferenceResult.prediction === "Safe"
                    ? "default"
                    : "destructive"
                }
              >
                {inferenceResult.prediction === "Safe"
                  ? "✅ Safe"
                  : "⚠️ Violence"}{" "}
                ({Math.round(inferenceResult.confidence * 100)}%)
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-frames"
              checked={showFrames}
              onCheckedChange={setShowFrames}
            />
            <Label htmlFor="show-frames" className="text-sm">
              Show Frames
            </Label>
          </div>
        </div>
      )}

      {/* Frames display */}
      {showFrames && (
        <FramesDisplay
          originalFrames={recentFrames}
          processedFrames={processedFrames}
          isCapturing={isCapturing}
        />
      )}
    </div>
  );
}
