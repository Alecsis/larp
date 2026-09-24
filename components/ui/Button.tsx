import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "sun";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  // Ink button with a "hard" shadow that shifts when pressed — our signature CTA.
  primary:
    "bg-ink text-paper border-2 border-ink shadow-[3px_3px_0_0_var(--color-cobalt)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--color-cobalt)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  secondary:
    "bg-surface text-ink border-2 border-ink hover:bg-paper-2 active:translate-y-px",
  ghost: "bg-transparent text-ink border-2 border-transparent hover:bg-ink/5",
  sun: "bg-sun text-ink border-2 border-ink shadow-pop-sm hover:-translate-y-px hover:shadow-pop active:translate-y-0.5 active:shadow-none",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm gap-1.5",
  md: "min-h-11 px-4 text-[0.95rem] gap-2",
  lg: "min-h-12 px-6 text-base gap-2.5",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg font-bold leading-tight transition-[transform,box-shadow,background-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
