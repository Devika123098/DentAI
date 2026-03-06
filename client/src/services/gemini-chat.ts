import type { ChatMessage } from '@/types/chatbot';

export async function sendMessageMock(messages: ChatMessage[], contextId?: string): Promise<ChatMessage> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lastMessage = messages[messages.length - 1]?.content.toLowerCase();

    let response = "I'm your DentAI clinical assistant. How can I help you today?";

    if (lastMessage?.includes('infection') || lastMessage?.includes('x-ray') || lastMessage?.includes('result')) {
        response = "Based on the recent X-ray analysis, the AI detected possible infection around the root region (Periapical Radiolucency). This could indicate pulp infection or abscess formation. Clinical evaluation and possible endodontic treatment may be required. Would you like me to pull up standard endodontic protocols?";
    } else if (lastMessage?.includes('hello') || lastMessage?.includes('hi')) {
        response = "Hello Doctor. I am ready to assist with diagnosing X-rays, providing treatment recommendations, or answering sustainability questions.";
    } else {
        response = "I understand. I recommend reviewing the latest clinical guidelines for that specific scenario, or we can look at a recent patient X-ray to provide more concrete insights.";
    }

    return {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
    };
}
