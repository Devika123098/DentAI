'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileImage, Settings2, Scan, Activity } from "lucide-react";
import { analyzeXrayMock } from '@/services/mock-ai';
import type { AnalysisResult } from '@/types/analysis';
import { motion, AnimatePresence } from 'framer-motion';

export default function Analysis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await analyzeXrayMock(file);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--color-border)] pb-10">
        <div>
          <motion.h1 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-outfit font-bold tracking-tight text-[var(--color-foreground)]"
          >
            Radiology Analysis
          </motion.h1>
          <motion.p 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[var(--color-muted-foreground)] mt-2"
          >
            Module: <span className="text-[var(--color-foreground)]">Diagnostic Audit v4</span> • Status: Ready
          </motion.p>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-12"
        >
          <Card className="bg-[var(--color-card)] border-[var(--color-border)] shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--color-border)] bg-[var(--color-secondary)]/50">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[var(--color-primary)]" />
                    <h2 className="text-sm font-semibold text-[var(--color-foreground)]">Image Upload</h2>
                  </div>
                  
                  {!preview ? (
                    <label className="flex flex-col items-center justify-center w-full h-[400px] border border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)]/50 rounded-2xl cursor-pointer bg-[var(--color-card)] transition-all group relative overflow-hidden">
                      <div className="absolute inset-0 bg-[var(--color-primary)]/[0.02] group-hover:bg-[var(--color-primary)]/[0.04] transition-colors" />
                      <div className="flex flex-col items-center justify-center text-center px-10 relative z-10">
                        <div className="w-16 h-16 rounded-full border border-[var(--color-border)] flex items-center justify-center mb-6 group-hover:border-[var(--color-primary)] transition-colors">
                          <Scan className="w-6 h-6 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] transition-colors" />
                        </div>
                        <p className="text-sm font-semibold text-[var(--color-foreground)]">Select an image to begin</p>
                        <p className="text-xs text-[var(--color-muted-foreground)] mt-2 px-8">Use DICOM or high-resolution clinical imaging for best results.</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  ) : (
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-[var(--color-border)] group">
                      <img src={preview} alt="X-ray preview" className="object-contain w-full h-full bg-[var(--color-surface-soft)]" />
                      <div className="absolute inset-0 bg-[var(--color-brand-dark)]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                          className="h-10 rounded-full text-xs px-6 py-3"
                        >
                          Remove image
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full h-14 disabled:bg-[var(--color-brand)] disabled:text-[var(--color-on-dark)] disabled:border-[var(--color-brand-dark)]/40 disabled:opacity-100" 
                    onClick={handleAnalyze} 
                    disabled={!file || loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Settings2 className="w-4 h-4 animate-spin text-[var(--color-primary-foreground)]" />
                        <span className="font-outfit text-sm">Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4" />
                        <span className="font-outfit text-sm">Run analysis</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-8">
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-[1px] bg-[var(--color-primary)]" />
                    <h2 className="text-sm font-semibold text-[var(--color-foreground)]">Diagnostic Readout</h2>
                  </div>

                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 space-y-10"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-[var(--color-secondary)]/40 border border-[var(--color-border)] space-y-2 rounded-xl">
                            <p className="text-xs font-semibold text-[var(--color-muted-foreground)]">Finding</p>
                            <p className="text-base font-outfit font-semibold text-[var(--color-foreground)]">{result.condition}</p>
                          </div>
                          <div className="p-6 bg-[var(--color-secondary)]/40 border border-[var(--color-border)] space-y-2 rounded-xl">
                            <p className="text-xs font-semibold text-[var(--color-muted-foreground)]">Confidence</p>
                            <p className="text-base font-outfit font-semibold text-[var(--color-accent)]">{(result.confidenceScore * 100).toFixed(1)}%</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animte-pulse" />
                            <h4 className="text-xs font-semibold text-[var(--color-foreground)]">Assessment Summary</h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                            {result.explanation}
                          </p>
                        </div>

                        <div className="mt-auto space-y-4 pt-6 border-t border-[var(--color-border)]">
                          <p className="text-xs font-semibold text-[var(--color-accent)]">Recommended Next Step</p>
                          <div className="p-4 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-xl">
                            <p className="text-sm font-medium text-[var(--color-foreground)] leading-relaxed">
                              {result.recommendation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                        <div className="relative">
                          <FileImage className="w-16 h-16 text-[var(--color-muted-foreground)]" />
                          <motion.div 
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-[var(--color-primary)]/10 blur-xl rounded-full"
                          />
                        </div>
                        <p className="text-sm font-semibold mt-8 text-center">Awaiting image input</p>
                        <p className="text-xs text-[var(--color-muted-foreground)] mt-2 text-center max-w-[240px]">Upload an x-ray image to generate a structured diagnostic report.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

