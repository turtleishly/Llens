import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface TopBarLink {
  label: string;
  to: string;
}

interface ChapterTopBarProps {
  /** Links shown on the right side of the bar (left to right). */
  links: TopBarLink[];
  /** Optional extra link only rendered when a condition is true (e.g. "Next Chapter"). */
  conditionalLink?: TopBarLink;
  /** Called whenever isTopBarHidden changes so parents can react to the value. */
  onHiddenChange?: (hidden: boolean) => void;
}

/**
 * Shared top navigation bar for Llens chapter pages.
 *
 * - Auto-hides after 1200 ms via CSS `-translate-y-full`.
 * - Reveals on hover via the Tailwind `group` / `group-hover:translate-y-0` pattern.
 * - Exposes `isTopBarHidden` upward through `onHiddenChange` so parents can
 *   adjust layout padding while the bar is visible.
 */
export function ChapterTopBar({
  links,
  conditionalLink,
  onHiddenChange,
}: ChapterTopBarProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsHidden(true);
      onHiddenChange?.(true);
    }, 1200);
    return () => window.clearTimeout(id);
  }, [onHiddenChange]);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-14 group">
      <div
        className={`absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-sm transition-transform duration-700 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } group-hover:translate-y-0`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8 md:py-5">
          <Link
            to="/"
            className="text-base font-semibold uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition"
          >
            Rakan Tutor
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {conditionalLink && (
              <Link
                to={conditionalLink.to}
                className="text-sm uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition"
              >
                {conditionalLink.label}
              </Link>
            )}
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-border" />
      </div>
    </div>
  );
}
