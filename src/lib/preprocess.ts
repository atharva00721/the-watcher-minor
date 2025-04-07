// Reuse buffer to avoid memory allocations
let cachedFloatArray: Float32Array | null = null;

/**
 * Preprocess a canvas image for model input
 * - Converts to RGB normalized Float32Array
 * - Reuses buffer for better memory performance
 */
export function preprocessFrame(canvas: HTMLCanvasElement): Float32Array {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  const width = 128;
  const height = 128;
  const channelCount = 3; // RGB
  const pixelCount = width * height;
  const totalSize = pixelCount * channelCount;

  // Get pixel data from canvas
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data; // RGBA

  // Reuse previous buffer if available and same size
  if (!cachedFloatArray || cachedFloatArray.length !== totalSize) {
    cachedFloatArray = new Float32Array(totalSize);
  }

  // Fast conversion from RGBA to normalized RGB
  const floatArray = cachedFloatArray;
  for (let p = 0, f = 0; p < data.length; p += 4, f += 3) {
    floatArray[f] = data[p] / 255; // R
    floatArray[f + 1] = data[p + 1] / 255; // G
    floatArray[f + 2] = data[p + 2] / 255; // B
    // Alpha channel ignored
  }

  return floatArray;
}
