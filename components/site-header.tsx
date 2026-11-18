import Link from "next/link";
import { profile } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#systems", label: "Systems" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Jospen Wolongwo, home">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-display text-[15px] leading-none text-paper">
            J
          </span>
          <span className="font-mono text-[12px] tracking-wide text-ink-2 group-hover:text-ink">jospen.wolongwo</span>
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
              CV <span aria-hidden>↓</span>
              <span className="sr-only"> (PDF)</span>
            </a>
          )}
          <ThemeToggle />
          <MobileMenu nav={nav} linkedin={profile.linkedin} github={profile.github} />
        </nav>
      </div>
    </header>
  );
}
