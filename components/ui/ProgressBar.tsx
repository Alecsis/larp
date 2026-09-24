import { cn } from "@/lib/cn";

const FILLS = {
  cobalt: "bg-cobalt",
  tangerine: "bg-tangerine",
  emerald: "bg-emerald",
  ink: "bg-ink",
  sun: "bg-sun",
} as const;

export type ProgressColor = keyof typeof FILLS;

/**
 * Horizontal progress bar. Uses role="progressbar" so screen readers
 * announce the value (e.g. "AI Fundamentals progress, 50%").
 */
export function ProgressBar({
  value,
  label,
  color = "cobalt",
  size = "md",
  className,
}: {
  value: number;
  label: string;
  color?: ProgressColor;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn(
        "w-full overflow-hidden rounded-full border border-ink/15 bg-paper-2",
        size === "sm" ? "h-2" : size === "lg" ? "h-4" : "h-3",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", FILLS[color])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
