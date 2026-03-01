import { type ReactNode } from "react";

type GradientColor = "sky" | "amber" | "emerald" | "violet";

const gradientMap: Record<GradientColor, string> = {
  sky: "from-sky-500/10",
  amber: "from-amber-500/10",
  emerald: "from-emerald-500/10",
  violet: "from-violet-500/10",
};

interface ChapterShellProps {
  /** Background gradient accent colour. */
  gradient?: GradientColor;
  children: ReactNode;
}

/**
 * Outer scroll-safe wrapper for Llens chapter pages.
 *
 * Mobile  (< lg / 1024 px): `overflow-y-auto` — page scrolls freely.
 * Desktop (≥ lg / 1024 px): `overflow-hidden h-screen` — fixed viewport height, no scroll.
 *
 * The gradient overlay is rendered here so every chapter gets a consistent
 * background treatment without duplicating markup.
 */
export function ChapterShell({ gradient = "sky", children }: ChapterShellProps) {
  return (
    <div className="min-h-screen overflow-y-auto bg-background text-foreground">
      {/* Gradient background */}
      <div
        className={`pointer-events-none fixed inset-0 bg-gradient-to-br ${gradientMap[gradient]} via-background to-transparent`}
      />
      {children}
    </div>
  );
}
