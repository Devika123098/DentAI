"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const historyRecords = [
  { id: "r-1", date: "2024.03.10", condition: "Periapical Radiolucency", score: 0.92, patient: "PATIENT_8291" },
  { id: "r-2", date: "2024.03.09", condition: "Caries (Class II)", score: 0.88, patient: "PATIENT_1102" },
  { id: "r-3", date: "2024.03.08", condition: "Normal Anatomy", score: 0.99, patient: "PATIENT_4432" },
  { id: "r-4", date: "2024.03.05", condition: "Periodontal Bone Loss", score: 0.85, patient: "PATIENT_9011" },
];

export default function History() {
  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
        <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-semibold tracking-tight text-[var(--color-foreground)]">
          Neural <span className="text-[var(--color-primary)]">Archive</span>
        </motion.h1>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[var(--color-muted-foreground)]"
        >
          Central storage for reports and structured diagnostic history.
        </motion.p>
      </header>

      <Card className="overflow-hidden border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--soft-shadow)]">
        <CardHeader className="bg-[var(--color-secondary)] border-b border-[var(--color-border)] flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-[var(--color-foreground)]">Query Results Log</CardTitle>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-6 px-8 py-4 text-xs font-semibold text-[var(--color-muted-foreground)] border-b border-[var(--color-border)] bg-[var(--color-secondary)]">
            <div>Timestamp</div>
            <div>Subject ID</div>
            <div className="col-span-2">Clinical Interpretation</div>
            <div className="text-center">Confidence</div>
            <div className="text-right">Action</div>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {historyRecords.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-6 items-center px-8 py-6 hover:bg-[var(--color-secondary)]/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
                  <Clock3 className="h-4 w-4" />
                  {record.date}
                </div>
                <div className="text-sm font-semibold text-[var(--color-foreground)]">{record.patient}</div>
                <div className="col-span-2 flex items-center gap-3 text-sm font-semibold text-[var(--color-foreground)]">
                  <div className={`h-2 w-2 rounded-full ${record.score < 0.9 ? "bg-[var(--color-destructive)]" : "bg-[var(--color-primary)]"}`} />
                  {record.condition}
                </div>
                <div className="text-center text-sm font-semibold text-[var(--color-accent)]">{(record.score * 100).toFixed(1)}%</div>
                <div className="flex justify-end">
                  <Button variant="outline" className="h-8 px-5 text-xs">
                    Open Report <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-secondary)] px-8 py-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">End of secure activity logs</p>
          <div className="flex gap-6 text-sm font-semibold text-[var(--color-accent)]">
            <button type="button" className="hover:underline">Download XLS</button>
            <button type="button" className="hover:underline">Clear Local Cache</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
