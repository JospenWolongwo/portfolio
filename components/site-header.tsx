import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#systems", label: "Systems" },
  { href: "/#experience", label: "Experience" },
  { href: "/Jospen-Wolongwo-CV.pdf", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Jospen Wolongwo, home">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-display text-[15px] leading-none text-paper">
            J
          </span>
          <span className="font-mono text-[12px] tracking-wide text-ink-2 group-hover:text-ink">jospen.wolongwo</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hidden rounded px-2 py-1 font-mono text-[12px] text-muted hover:text-ink sm:inline-block"
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
