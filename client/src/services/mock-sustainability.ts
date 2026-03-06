interface SustainabilityResult {
    material: string;
    ecoFriendlyAlternative: string;
    wasteDisposal: string;
    impact: string;
}

export async function getSustainabilityRecommendations(material: string): Promise<SustainabilityResult> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const materialLower = material.toLowerCase();

    if (materialLower.includes('plastic') || materialLower.includes('suction')) {
        return {
            material: "Single-use Plastic Suction Tips",
            ecoFriendlyAlternative: "Autoclavable stainless steel suction tips or biodegradable paper-based tips.",
            wasteDisposal: "If plastic, dispose of in standard clinical waste (non-recyclable due to contamination).",
            impact: "Switching to reusable metal tips saves approximately 5,000 plastic tips per year per operatory."
        };
    }

    if (materialLower.includes('glove')) {
        return {
            material: "Nitrile/Latex Gloves",
            ecoFriendlyAlternative: "Biodegradable nitrile gloves (e.g., those using EcoTek technology).",
            wasteDisposal: "Must be disposed of as biohazardous waste if contaminated with blood/saliva.",
            impact: "Biodegradable options breakdown in 1-3 years in landfills compared to 100+ years for standard nitrile."
        };
    }

    // Default response
    return {
        material: material,
        ecoFriendlyAlternative: `Consider reusable or biodegradable alternatives for ${material}. Check with dental suppliers for "green" or "eco-friendly" lines.`,
        wasteDisposal: "Dispose according to local clinical waste regulations. Segregate contaminated from non-contaminated waste.",
        impact: "Small changes in daily consumables significantly reduce the clinic's carbon footprint."
    };
}
