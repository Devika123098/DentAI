type SustainabilityResult = {
  material: string;
  ecoFriendlyAlternative: string;
  wasteDisposal: string;
  impact: string;
};

export async function getSustainabilityRecommendations(
  material: string,
): Promise<SustainabilityResult> {
  const prompt = [
    "You are a dental sustainability assistant.",
    "Given a clinical material, respond with a concise JSON object with keys:",
    '"material", "ecoFriendlyAlternative", "wasteDisposal", "impact".',
    "Keep each value under 2 sentences. Return ONLY JSON with no extra text.",
    `Material: ${material}`,
  ].join("\n");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          id: "sustainability",
          role: "user",
          content: prompt,
          timestamp: new Date().toISOString(),
        },
      ],
      mode: "sustainability",
    }),
  });

  if (!res.ok) {
    throw new Error("Sustainability request failed");
  }

  const data = await res.json();
  const raw = String(data.message ?? "").trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  try {
    const parsed = JSON.parse(
      jsonMatch ? jsonMatch[0] : raw,
    ) as SustainabilityResult;
    return {
      material: parsed.material ?? material,
      ecoFriendlyAlternative: parsed.ecoFriendlyAlternative ?? "",
      wasteDisposal: parsed.wasteDisposal ?? "",
      impact: parsed.impact ?? "",
    };
  } catch {
    return {
      material,
      ecoFriendlyAlternative: raw,
      wasteDisposal:
        "Review local biomedical waste protocols for proper handling.",
      impact: "Consider lower-impact substitutes when clinically appropriate.",
    };
  }
}
