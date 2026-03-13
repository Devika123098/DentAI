import { NextResponse } from "next/server";

type IncomingMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export async function POST(req: Request) {
  const { messages, mode } = (await req.json()) as {
    messages?: IncomingMessage[];
    mode?: "clinical" | "sustainability";
  };

  if (!messages || !messages.length) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY" },
      { status: 500 },
    );
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const systemInstruction =
    mode === "sustainability"
      ? "You are a dental sustainability assistant. Return ONLY valid JSON, no markdown, no code fences. " +
        "Keys: material, ecoFriendlyAlternative, wasteDisposal, impact. Values must be concise (max 2 sentences each)."
      : "You are a clinical dental assistant. Provide concise, evidence-informed guidance. " +
        "Avoid markdown. Use short paragraphs and bullet points when helpful. " +
        "Do not provide a final diagnosis. Encourage clinical correlation.";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [
          {
            text: systemInstruction,
          },
        ],
      },
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 512,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const data = await res.json();
  const message =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text: string }) => p.text)
      .join("") ?? "No response from model.";

  return NextResponse.json({ message });
}
