import  type { AnalysisResult } from '@/types/analysis';

export async function analyzeXrayMock(file: File): Promise<AnalysisResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response
    return {
        id: Math.random().toString(36).substring(7),
        date: new Date().toISOString(),
        imageUrl: URL.createObjectURL(file),
        condition: "Periapical Radiolucency (Possible Abscess)",
        confidenceScore: 0.92,
        explanation: "The AI detected a well-defined radiolucent area around the apex of tooth #19. This is highly indicative of a periapical infection or abscess resulting from pulpal necrosis.",
        recommendation: "Clinical vitality testing recommended. Endodontic therapy (root canal treatment) or extraction is likely necessary."
    };
}
