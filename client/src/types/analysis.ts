export interface AnalysisResult {
    id: string;
    date: string;
    imageUrl: string;
    condition: string;
    confidenceScore: number;
    explanation: string;
    recommendation: string;
}

export interface AnalysisHistory {
    records: AnalysisResult[];
}
