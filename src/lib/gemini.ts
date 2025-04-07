import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with key
const API_KEY =
  process.env.GEMINI_API_KEY || "AIzaSyDp2luq01bXhCLfJZUli2FSouO0DI00W4E";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface ViolenceReport {
  id: string;
  timestamp: number;
  summary: string;
  details: string;
  severity: "low" | "medium" | "high";
  recommendations: string[];
  frames: string[];
  isActualViolence: boolean;
}

/**
 * Select representative frames based on confidence scores
 */
function selectRepresentativeFrames(
  frames: string[],
  confidenceScores: number[],
  maxFrames: number
): string[] {
  if (frames.length <= maxFrames) return frames;

  // Sort by confidence score (highest first)
  const framesWithScores = frames
    .map((frame, index) => ({ frame, score: confidenceScores[index] || 0 }))
    .sort((a, b) => b.score - a.score);

  // Return top N frames
  return framesWithScores.slice(0, maxFrames).map((item) => item.frame);
}

/**
 * Generate a unique ID for reports
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Generate a violence report using Gemini AI
 */
export async function generateViolenceReport(
  frames: string[],
  confidenceScores: number[]
): Promise<ViolenceReport> {
  try {
    if (!API_KEY) {
      throw new Error("Gemini API key missing");
    }

    // Select a subset of representative frames (max 4)
    const frameSubset = selectRepresentativeFrames(frames, confidenceScores, 4);

    // Convert to Gemini-compatible format
    const imageParts = await Promise.all(
      frameSubset.map((frame) => ({
        inlineData: {
          data: frame.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
          mimeType: "image/jpeg",
        },
      }))
    );

    // Get model and create prompt
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `
    You are a security analysis expert. I'm showing you frames from a surveillance system that detected potential violence.
    
    Analyze these frames and provide:
    1. Brief summary (2-3 sentences)
    2. Detailed description of concerning behavior
    3. Severity assessment (low, medium, or high)
    4. Recommendations for response
    5. MOST IMPORTANTLY: Determine if this contains real physical violence requiring intervention
    
    Format as JSON:
    {
      "summary": "Brief overview",
      "details": "Detailed description",
      "severity": "low|medium|high",
      "recommendations": ["Recommendation 1", "Recommendation 2"],
      "isActualViolence": true|false
    }
    
    For "isActualViolence", only TRUE for clear physical violence/assault/weapons.
    FALSE for non-violent scenes, playful behavior, media, sports.
    
    RESPOND WITH JSON ONLY.`;

    // Generate content with Gemini
    const result = await model.generateContent([prompt, ...imageParts]);
    const text = result.response.text();

    // Parse JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [
      null,
      text,
    ];
    const jsonContent = jsonMatch[1].trim();
    const parsedResponse = JSON.parse(jsonContent);

    // Create and return report
    return {
      id: generateId(),
      timestamp: Date.now(),
      summary: parsedResponse.summary,
      details: parsedResponse.details,
      severity: parsedResponse.severity as "low" | "medium" | "high",
      recommendations: parsedResponse.recommendations,
      frames: frameSubset, // Ensure we're passing the correct frames for alerts
      isActualViolence: Boolean(parsedResponse.isActualViolence),
    };
  } catch (error) {
    console.error("Error generating violence report:", error);
    throw error;
  }
}
