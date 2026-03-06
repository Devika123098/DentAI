"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Recycle, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSustainabilityRecommendations } from "@/services/mock-sustainability";

export default function Sustainability() {
  const [material, setMaterial] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!material) return;
    setLoading(true);
    try {
      const data = await getSustainabilityRecommendations(material);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      <header className="space-y-2">
        <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-semibold tracking-tight text-[var(--color-foreground)]">
          Eco <span className="text-[var(--color-primary)]">Intelligence</span>
        </motion.h1>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[var(--color-muted-foreground)]"
        >
          Evaluate clinical materials and choose lower-impact alternatives.
        </motion.p>
      </header>

      <Card className="border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--soft-shadow)]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Material Audit Query</CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <Input
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Enter clinical material (e.g. plastic tips, DICOM film)"
              className="h-12 flex-1"
            />
            <Button type="submit" disabled={loading || !material} className="h-12 px-8">
              {loading ? "Running..." : <><Search className="h-4 w-4" /> Start Analysis</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
            <Card className="border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--soft-shadow)] overflow-hidden">
              <CardHeader className="bg-[var(--color-secondary)] border-b border-[var(--color-border)]">
                <CardTitle className="text-xl font-semibold text-[var(--color-foreground)]">{result.material}</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-secondary)]/60 p-5">
                  <div className="flex items-center gap-2 text-[var(--color-accent)] mb-2">
                    <Leaf className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">Alternative</h3>
                  </div>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{result.ecoFriendlyAlternative}</p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-secondary)]/60 p-5">
                  <div className="flex items-center gap-2 text-[var(--color-accent)] mb-2">
                    <Recycle className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">Disposal</h3>
                  </div>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{result.wasteDisposal}</p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-secondary)]/60 p-5">
                  <div className="flex items-center gap-2 text-[var(--color-accent)] mb-2">
                    <Zap className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">Impact</h3>
                  </div>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{result.impact}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
