"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Clock,
  Leaf,
  MessageSquare,
  ShieldCheck,
  Target,
  UploadCloud,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const overviewStats = [
  { id: "analytics", title: "Active Analyses", value: "2,438", sub: "Processed this week", icon: Activity },
  { id: "review", title: "Pending Reviews", value: "8", sub: "Require specialist validation", icon: Zap },
  { id: "uptime", title: "Platform Uptime", value: "99.9%", sub: "Last 30 days", icon: ShieldCheck },
  { id: "accuracy", title: "Model Precision", value: "98.0%", sub: "Validated confidence score", icon: Target },
];

const modules = [
  { id: "analysis", href: "/analysis", label: "Radiology Analysis", icon: UploadCloud, desc: "Upload and assess x-rays with structured findings." },
  { id: "chatbot", href: "/chatbot", label: "Clinical Assistant", icon: MessageSquare, desc: "Ask treatment and diagnostic questions instantly." },
  { id: "sustainability", href: "/sustainability", label: "Sustainability Audit", icon: Leaf, desc: "Review eco impact for materials and workflows." },
  { id: "history", href: "/history", label: "Case History", icon: Clock, desc: "Track prior reports and decision timelines." },
];

const recentEvents = [
  { id: "evt-1", name: "Panoramic scan review completed", meta: "Patient ID 7201", time: "09:31 AM" },
  { id: "evt-2", name: "Follow-up recommendation generated", meta: "Patient ID 7202", time: "09:32 AM" },
  { id: "evt-3", name: "Confidence threshold check passed", meta: "Patient ID 7203", time: "09:33 AM" },
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
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--color-border)] pb-10">
        <div>
          <motion.h1 variants={item} className="text-4xl md:text-5xl font-outfit font-bold tracking-tight text-[var(--color-foreground)]">
            Operations Dashboard
          </motion.h1>
          <motion.p variants={item} className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Live overview of diagnostics, assistant usage, and case progress for your clinic.
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

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <motion.div key={stat.id} variants={item}>
            <Card className="group border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/50 hover:shadow-[var(--soft-shadow)] transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xs font-semibold text-[var(--color-muted-foreground)]">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-outfit font-semibold tracking-tight text-[var(--color-foreground)]">{stat.value}</div>
                <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <motion.h2 variants={item} className="text-sm font-semibold text-[var(--color-foreground)]">
            Core Modules
          </motion.h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {modules.map((module) => (
              <motion.div key={module.id} variants={item} whileHover={{ y: -4 }} className="h-full">
                <Link
                  href={module.href}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-secondary)]/50 hover:shadow-[var(--soft-shadow)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-colors group-hover:border-[var(--color-primary)]/50">
                    <module.icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-foreground)]">{module.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted-foreground)]">{module.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <motion.h2 variants={item} className="text-sm font-semibold text-[var(--color-foreground)]">
            Recent Activity
          </motion.h2>
          <Card className="relative overflow-hidden border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--elevation-shadow)]">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
            <CardContent className="pt-6">
              <div className="space-y-6">
                {recentEvents.map((event) => (
                  <motion.div key={event.id} variants={item} className="group flex items-start gap-4">
                    <div className="mt-0.5 h-8 w-1 rounded-full bg-[var(--color-border)] transition-colors group-hover:bg-[var(--color-primary)]" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-[var(--color-foreground)]">{event.name}</p>
                        <span className="text-[11px] text-[var(--color-muted-foreground)]">{event.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{event.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </motion.div>
  );
}
