"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { XpChip } from "@/components/gamification/XpChip";
import { cn } from "@/lib/cn";
import { MAIN_NAV, SECONDARY_NAV } from "@/lib/site";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu with the Escape key (keyboard accessibility).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="rounded-md" aria-label="Tokenline home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 font-bold text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink",
                      active && "text-ink after:absolute after:inset-x-3 after:-bottom-[11px] after:h-1 after:rounded-full after:bg-cobalt",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <XpChip className="ml-auto lg:ml-2" />

        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg border-2 border-ink bg-surface lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile menu: a full-width panel with large tap targets */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="border-t-2 border-ink bg-paper lg:hidden"
      >
        <ul className="container-page grid gap-1 py-3 sm:grid-cols-2">
          {[...MAIN_NAV, ...SECONDARY_NAV].map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-lg border-2 px-4 font-display text-lg font-bold",
                    active ? "border-ink bg-sun-soft" : "border-transparent hover:bg-ink/5",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
