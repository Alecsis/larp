import { cn } from "@/lib/cn";

/**
 * The Tokenline mark: three colored lines (one per module) meeting at a
 * station — the idea of three learning paths leading to one goal.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#111a33" />
      <path d="M6 10 H14 L20 16 H26" stroke="#2b50d8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 16 H26" stroke="#f2711c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M6 22 H14 L20 16" stroke="#12976e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="16" r="3.6" fill="#f6f4ee" stroke="#ffd84d" strokeWidth="2" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-xl font-extrabold tracking-tight">Tokenline</span>
    </span>
  );
}
