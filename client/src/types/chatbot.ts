export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface ChatSession {
    id: string;
    messages: ChatMessage[];
    contextId?: string; // Reference to a specific X-ray analysis ID
}
