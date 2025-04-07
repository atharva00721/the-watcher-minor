import { generateViolenceReport, type ViolenceReport } from "./gemini";
import { sendTelegramAlert } from "./sendTelegramAlert";

/**
 * Process frames from surveillance, generate a violence report, and send alert if necessary
 */
export async function processAndAlertIfNeeded(
  frames: string[],
  confidenceScores: number[]
): Promise<{ report: ViolenceReport | null; alertSent: boolean }> {
  try {
    // Generate the violence report using Gemini
    console.log(`Generating violence report from ${frames.length} frames...`);
    const report = await generateViolenceReport(frames, confidenceScores);
    console.log(
      `Report generated with ID: ${report.id}, severity: ${report.severity}`
    );

    // Log frame info for debugging
    console.log(`Report contains ${report.frames.length} images`);
    if (report.frames.length > 0) {
      console.log(
        `First image format check: ${report.frames[0].substring(0, 50)}...`
      );
    }

    // Only send alerts for actual violence or high severity incidents
    if (report.isActualViolence || report.severity === "high") {
      console.log(`Violence detected - sending alert...`);
      const result = await sendTelegramAlert(report);

      if (!result.success) {
        console.error(`Failed to send alert: ${result.error}`);
      } else {
        console.log(`Alert sent successfully!`);
      }

      return { report, alertSent: result.success };
    } else {
      console.log(
        `No actual violence detected (${report.severity} severity) - skipping alert`
      );
    }

    return { report, alertSent: false };
  } catch (error) {
    console.error("Error in processAndAlertIfNeeded:", error);
    return { report: null, alertSent: false };
  }
}
