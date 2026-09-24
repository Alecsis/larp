import type { LineColor } from "@/types/content";

/**
 * Tailwind only generates classes it can find written out in full, so each
 * module color's classes are listed here instead of being built with
 * string templates like `bg-${color}`.
 */
export const LINE_STYLES: Record<
  LineColor,
  {
    /** Solid fill (line strokes, dots, progress bars). */
    bg: string;
    /** Light tint background. */
    soft: string;
    /** Text color that passes WCAG AA contrast on light backgrounds. */
    text: string;
    border: string;
    /** Raw hex for SVG strokes. */
    hex: string;
  }
> = {
  cobalt: {
    bg: "bg-cobalt",
    soft: "bg-cobalt-soft",
    text: "text-cobalt-ink",
    border: "border-cobalt",
    hex: "#2b50d8",
  },
  tangerine: {
    bg: "bg-tangerine",
    soft: "bg-tangerine-soft",
    text: "text-tangerine-ink",
    border: "border-tangerine",
    hex: "#f2711c",
  },
  emerald: {
    bg: "bg-emerald",
    soft: "bg-emerald-soft",
    text: "text-emerald-ink",
    border: "border-emerald",
    hex: "#12976e",
  },
};
