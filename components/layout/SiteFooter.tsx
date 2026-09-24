import Link from "next/link";
import { getModules, moduleHref } from "@/lib/content";
import { MAIN_NAV, SECONDARY_NAV, SITE } from "@/lib/site";
import { LINE_STYLES } from "@/lib/line-colors";
import { cn } from "@/lib/cn";
import { LogoMark } from "./Logo";

export function SiteFooter() {
  const modules = getModules();
  return (
    <footer className="on-dark mt-auto bg-ink text-paper">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-extrabold">
            <LogoMark /> Tokenline
          </p>
          <p className="mt-3 max-w-sm text-sm text-paper/80">
            An interactive AI learning portal for high school students — learn how AI works, use it with skill, and use it with integrity.
          </p>
          <p className="mt-4 text-sm text-paper/80">
            Your progress is saved only in this browser. Nothing is sent to a server.
          </p>
        </div>

        <FooterColumn title="Learning lines">
          {modules.map((module) => (
            <li key={module.id}>
              <Link href={moduleHref(module.id)} className="inline-flex items-center gap-2 hover:underline">
                <span aria-hidden className={cn("h-1.5 w-4 rounded-full", LINE_STYLES[module.color].bg)} />
                {module.title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Portal">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Project">
          {SECONDARY_NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/references#framework-declaration" className="hover:underline">
              Framework declaration
            </Link>
          </li>
        </FooterColumn>
      </div>
      <div className="border-t border-paper/15">
        <p className="container-page py-5 text-xs text-paper/70">
          {SITE.name} — created for {SITE.event} (theme: AI Learning Portal). Built with Next.js, React, TypeScript and Tailwind CSS. All layouts,
          visuals and components are original team work.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-sun">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">{children}</ul>
    </div>
  );
}
