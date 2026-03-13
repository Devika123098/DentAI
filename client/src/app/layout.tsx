import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  FileSearch,
  LayoutDashboard,
  Leaf,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DentAI | Enterprise Clinical Intelligence",
  description:
    "The precision platform for modern dental practice and radiological analysis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[var(--color-background)] selection:bg-[var(--color-primary)] selection:text-[var(--color-primary-foreground)]">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-72 border-r border-[var(--glass-border)] glass-panel flex flex-col z-50">
            <div className="px-8 py-8 border-b border-[var(--glass-border)]">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-brand-dark)] rounded-lg flex items-center justify-center">
                  <span className="font-outfit font-bold text-xl text-[var(--color-on-dark)]">
                    D
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-outfit font-bold tracking-tight leading-none text-[var(--color-foreground)]">
                    DENTAI
                  </h1>
                  <p className="text-[11px] font-medium text-[var(--color-muted-foreground)] mt-1">
                    Clinical Intelligence
                  </p>
                </div>
              </Link>
            </div>

            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {[
                {
                  href: "/dashboard",
                  label: "Dashboard",
                  icon: LayoutDashboard,
                },
                {
                  href: "/analysis",
                  label: "Radiology Analysis",
                  icon: FileSearch,
                },
                {
                  href: "/chatbot",
                  label: "Clinical Assistant",
                  icon: MessageSquareText,
                },
                {
                  href: "/sustainability",
                  label: "Sustainability Audit",
                  icon: Leaf,
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 relative hover:bg-[var(--color-secondary)]"
                >
                  <item.icon className="w-5 h-5 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors" />
                  <span className="font-outfit font-medium text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]">
                    {item.label}
                  </span>

                  {/* Subtle Active/Hover Marker */}
                  <div className="absolute inset-y-2 left-0 w-[3px] bg-[var(--color-primary)] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-8 py-8 border-t border-[var(--glass-border)] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <p className="text-xs font-medium text-[var(--color-muted-foreground)]">
                System operational
              </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto custom-scrollbar bg-[var(--color-background)]">
              {/* Clinical Structured Container */}
              <div className="min-h-full w-full max-w-7xl mx-auto p-6 md:p-12">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
