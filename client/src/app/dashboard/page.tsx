"use client";

import { motion } from "framer-motion";
import { Leaf, MessageSquare, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  {
    id: "analysis",
    href: "/analysis",
    label: "Radiology Analysis",
    icon: UploadCloud,
    desc: "Upload and assess x-rays with structured findings.",
  },
  {
    id: "chatbot",
    href: "/chatbot",
    label: "Clinical Assistant",
    icon: MessageSquare,
    desc: "Ask treatment and diagnostic questions instantly.",
  },
  {
    id: "sustainability",
    href: "/sustainability",
    label: "Sustainability Audit",
    icon: Leaf,
    desc: "Review eco impact for materials and workflows.",
  },
];

export default function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const item = {
    hidden: { y: 12, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-10"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--color-border)] pb-10">
        <div>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-outfit font-bold tracking-tight text-[var(--color-foreground)]"
          >
            Operations Dashboard
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-2 text-sm text-[var(--color-muted-foreground)]"
          >
            Live overview of diagnostics, assistant usage, and case progress for
            your clinic.
          </motion.p>
        </div>
        <motion.div variants={item}>
          <Button asChild className="h-11 px-6 rounded-full">
            <Link href="/analysis">
              <UploadCloud className="w-4 h-4" />
              Start New Analysis
            </Link>
          </Button>
        </motion.div>
      </header>

      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <motion.h2
            variants={item}
            className="text-sm font-semibold text-[var(--color-foreground)]"
          >
            Core Modules
          </motion.h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {modules.map((module) => (
              <motion.div
                key={module.id}
                variants={item}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  href={module.href}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-secondary)]/50 hover:shadow-[var(--soft-shadow)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-colors group-hover:border-[var(--color-primary)]/50">
                    <module.icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                      {module.label}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                      {module.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <motion.h2
            variants={item}
            className="text-sm font-semibold text-[var(--color-foreground)]"
          >
            Quick Start
          </motion.h2>
          <Card className="relative overflow-hidden border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--elevation-shadow)]">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--color-foreground)]">
                  Connect your services
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Ensure FastAPI is running on port 8000 and your Gemini key is
                  set in <code>.env.local</code>.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-secondary)]/50 px-4 py-3">
                  <span className="text-xs font-semibold text-[var(--color-foreground)]">
                    Radiology API
                  </span>
                  <Link
                    href="/analysis"
                    className="text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    Open
                  </Link>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-secondary)]/50 px-4 py-3">
                  <span className="text-xs font-semibold text-[var(--color-foreground)]">
                    Clinical Assistant
                  </span>
                  <Link
                    href="/chatbot"
                    className="text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    Open
                  </Link>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-secondary)]/50 px-4 py-3">
                  <span className="text-xs font-semibold text-[var(--color-foreground)]">
                    Sustainability Audit
                  </span>
                  <Link
                    href="/sustainability"
                    className="text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </motion.div>
  );
}
