import type { ChatMessage } from "@/types/chatbot";

export async function sendMessage(
  messages: ChatMessage[],
): Promise<ChatMessage> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, mode: "clinical" }),
  });

  if (!res.ok) {
    throw new Error("Chat request failed");
  }

  const data = await res.json();
  return {
    id: Math.random().toString(36).substring(7),
    role: "assistant",
    content: data.message,
    timestamp: new Date().toISOString(),
  };
}
