export interface AnalysisResult {
  id: string;
  date: string;
  imageUrl: string;
  condition: string;
  confidenceScore: number;
  explanation: string;
  recommendation: string;
  detections: {
    class_id: number;
    class_name: string;
    confidence: number;
    bbox: number[];
  }[];
}

export interface AnalysisHistory {
  records: AnalysisResult[];
}
