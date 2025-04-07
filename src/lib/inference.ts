import { InferenceSession, Tensor } from "onnxruntime-web";
import { preprocessFrame } from "./preprocess";

export interface InferenceResult {
  prediction: string;
  confidence: number;
  inferenceTime: number;
  timestamp: number;
}

// Cache for input and output names
const modelMetadataCache: Record<
  string,
  { inputName: string; outputName: string }
> = {};

/**
 * Run inference on a single frame
 */
export async function runInference(
  canvas: HTMLCanvasElement,
  session: typeof InferenceSession
): Promise<InferenceResult> {
  const startTime = performance.now();

  // Get or cache model metadata
  const sessionId = (session as any).sessionId;
  let inputName, outputName;

  if (modelMetadataCache[sessionId]) {
    ({ inputName, outputName } = modelMetadataCache[sessionId]);
  } else {
    inputName = session.inputNames[0];
    outputName = session.outputNames[0];
    modelMetadataCache[sessionId] = { inputName, outputName };
  }

  // Preprocess and prepare input tensor
  const preprocessedData = preprocessFrame(canvas);
  const inputTensor = new Tensor("float32", preprocessedData, [1, 128, 128, 3]);

  // Run inference
  const feeds: Record<string,typeof Tensor> = { [inputName]: inputTensor };
  const outputMap = await session.run(feeds);

  // Extract results
  const outputTensor = outputMap[outputName];
  const outputData = outputTensor.data as Float32Array;
  const inferenceTime = performance.now() - startTime;

  // Process outputs
  let confidence: number;
  let prediction: string;

  if (outputData.length === 1) {
    // Single sigmoid output
    confidence = outputData[0];
    prediction = confidence >= 0.5 ? "Violence" : "Safe";
  } else {
    // Two-class softmax output
    const safeScore = outputData[0];
    const violenceScore = outputData[1];
    prediction = violenceScore > safeScore ? "Violence" : "Safe";
    confidence = Math.max(safeScore, violenceScore);
  }

  // Clean up
  inputTensor.dispose();

  return {
    prediction,
    confidence,
    inferenceTime,
    timestamp: Date.now(),
  };
}

/**
 * Pre-warm the model with a dummy run
 */
export async function warmupInference(
  session: typeof InferenceSession
): Promise<void> {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 128, 128);

    try {
      await runInference(canvas, session);
      console.log("🔥 Inference pipeline warmed up");
    } catch (e) {
      console.warn("Warmup failed:", e);
    }
  }
}
