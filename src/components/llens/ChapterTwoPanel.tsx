import { type ReactNode } from "react";

interface ChapterTwoPanelProps {
  /**
   * Current step index.
   * - `0`: full-width centered intro layout.
   * - `1`: side-by-side two-panel layout (left 2/5, right 3/5 on desktop).
   */
  step: number;
  /** Left panel content (text, cards, buttons). */
  leftPanel: ReactNode;
  /** Right panel content (interactive widget). */
  rightPanel: ReactNode;
  /** Extra content rendered below the two panels (e.g. "Continue" button). */
  footer?: ReactNode;
}

/**
 * Responsive two-panel layout shell for Llens chapter pages.
 *
 * Step 0 — intro:
 *   Desktop: left panel centered, max-w-4xl, right panel hidden.
 *   Mobile:  same, stacked.
 *
 * Step 1 — interactive:
 *   Desktop: left panel 2/5 width, right panel 3/5 width, side-by-side.
 *   Mobile:  left panel full-width, right panel full-width, stacked vertically.
 *
 * Both panels use opacity + translateX transitions for smooth step changes.
 */
export function ChapterTwoPanel({
  step,
  leftPanel,
  rightPanel,
  footer,
}: ChapterTwoPanelProps) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* ── Left panel ─────────────────────────────────────────────── */}
        <div
          className={`transition-all duration-700 ease-out ${
            step === 0
              ? "w-full lg:max-w-4xl lg:mx-auto text-center"
              : "w-full lg:w-2/5 lg:max-w-none lg:mx-0 text-left"
          }`}
        >
          {leftPanel}
        </div>

        {/* ── Right panel ────────────────────────────────────────────── */}
        <div
          className={`transition-all duration-700 ease-out w-full lg:w-3/5 ${
            step === 1
              ? "opacity-100 translate-x-0"
              : "opacity-0 h-0 overflow-hidden lg:h-auto lg:translate-x-8 pointer-events-none lg:max-w-0 lg:overflow-hidden"
          }`}
        >
          {rightPanel}
        </div>
      </div>

      {footer && <div className="mt-10">{footer}</div>}
    </div>
  );
}
