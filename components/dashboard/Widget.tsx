import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared frame for every dashboard widget: consistent heading + padding. */
export function Widget({
  title,
  eyebrow,
  action,
  children,
  className,
  id,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("flex flex-col rounded-2xl border-2 border-ink bg-surface p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {eyebrow && <p className="eyebrow text-ink-3">{eyebrow}</p>}
          <h2 id={id} className="font-display text-xl font-bold">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
