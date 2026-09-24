import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Circular progress indicator with content (e.g. a percentage) in the middle. */
export function ProgressRing({
  value,
  label,
  color = "#2b50d8",
  size = 120,
  stroke = 12,
  children,
  className,
}: {
  value: number;
  label: string;
  color?: string;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn("relative grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ece8dc" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="relative text-center">{children}</div>
    </div>
  );
}
