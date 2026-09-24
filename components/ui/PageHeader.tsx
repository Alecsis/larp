import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The compact header band at the top of inner pages. Deliberately short:
 * students should reach real content without scrolling past a giant hero.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  accent = "bg-cobalt",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Tailwind bg class for the colored stripe above the eyebrow. */
  accent?: string;
  className?: string;
}) {
  return (
    <div className={cn("graph-paper border-b-2 border-ink", className)}>
      <div className="container-page py-10 sm:py-12">
        <span aria-hidden className={cn("block h-1.5 w-14 rounded-full", accent)} />
        <p className="eyebrow mt-4 text-ink-2">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-display-lg font-extrabold">{title}</h1>
        {description && <div className="mt-3 max-w-2xl text-lg text-ink-2">{description}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

/** Section heading used inside pages (h2 + optional intro). */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow text-ink-3">{eyebrow}</p>}
      <h2 id={id} className="mt-1 text-display-md font-extrabold">
        {title}
      </h2>
      {intro && <p className="mt-2 text-ink-2">{intro}</p>}
    </div>
  );
}
