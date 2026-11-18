"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/content/site";
import { t } from "@/content/ui";
import { localeOf, localize } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitch } from "./language-switch";

export function SiteHeader() {
  const locale = localeOf(usePathname());
  const u = t(locale);
  // Keep <html lang> right after in-app language switches (the built HTML already has it).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const home = localize(locale, "/");
  const nav = [
    { href: `${home}#work`, label: u.nav.work },
    { href: `${home}#systems`, label: u.nav.systems },
    { href: `${home}#experience`, label: u.nav.experience },
    { href: `${home}#contact`, label: u.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={home} className="group flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-display text-[15px] leading-none text-paper">
            J
          </span>
          <span className="hidden font-mono text-[12px] tracking-wide text-ink-2 group-hover:text-ink min-[400px]:inline">
            jospen.wolongwo
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hidden rounded px-2 py-1 font-mono text-[12px] text-muted hover:text-ink md:inline-block"
            >
              {n.label}
            </Link>
          ))}
          {profile.cv && (
            <a
              href={profile.cv}
              className="rounded-full bg-ink px-3 py-1.5 font-mono text-[12px] text-paper hover:opacity-90"
            >
              {u.cv} <span aria-hidden>↓</span>
              <span className="sr-only"> {u.cvPdf}</span>
            </a>
          )}
          <LanguageSwitch />
          <ThemeToggle />
          <MobileMenu nav={nav} linkedin={profile.linkedin} github={profile.github} label={u.nav.menu} />
        </nav>
      </div>
    </header>
  );
}
