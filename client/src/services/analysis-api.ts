import type { AnalysisResult } from "@/types/analysis";

type Detection = {
  class_id: number;
  class_name: string;
  confidence: number;
  bbox: number[];
};

type PredictResponse = {
  detections: Detection[];
  image_base64: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

function buildSummary(detections: Detection[]): {
  condition: string;
  confidenceScore: number;
  explanation: string;
  recommendation: string;
} {
  if (!detections.length) {
    return {
      condition: "No findings detected",
      confidenceScore: 0,
      explanation:
        "The model did not detect any target structures or conditions in this image.",
      recommendation:
        "If clinical symptoms persist, consider repeat imaging or a specialist review.",
    };
  }

  const top = [...detections].sort((a, b) => b.confidence - a.confidence)[0];
  const condition = top.class_name || `Class ${top.class_id}`;
  const confidenceScore = top.confidence;
  const explanation = `Primary detection: ${condition} with ${(top.confidence * 100).toFixed(1)}% confidence.`;
  const recommendation =
    "Correlate with clinical findings and consider additional imaging if needed.";

  return { condition, confidenceScore, explanation, recommendation };
}

export async function analyzeXray(file: File): Promise<AnalysisResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Analysis request failed");
  }

  const data = (await res.json()) as PredictResponse;
  const summary = buildSummary(data.detections);

  return {
    id: Math.random().toString(36).substring(7),
    date: new Date().toISOString(),
    imageUrl: `data:image/jpeg;base64,${data.image_base64}`,
    condition: summary.condition,
    confidenceScore: summary.confidenceScore,
    explanation: summary.explanation,
    recommendation: summary.recommendation,
    detections: data.detections,
  };
}
