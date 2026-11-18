"use client";

import { useRef } from "react";

type Props = { nav: { href: string; label: string }[]; linkedin: string | null; github: string; label: string };

// Native <details>: opens with the keyboard and works before hydration. Choosing a link closes it.
export function MobileMenu({ nav, linkedin, github, label }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");
  const item = "block rounded-lg px-3 py-2.5 text-[15px] hover:bg-paper";
  return (
          <details ref={ref} className="group relative md:hidden">
            <summary
              className="grid h-8 w-8 cursor-pointer list-none place-items-center rounded-full border border-rule text-muted hover:text-ink [&::-webkit-details-marker]:hidden"
              aria-label={label}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <div className="absolute right-0 top-11 w-56 rounded-xl border border-rule bg-card p-2 shadow-lg">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={close} className={item}>
                  {n.label}
                </a>
              ))}
              <div className="mt-1 border-t border-rule pt-1">
                {linkedin && (
                  <a href={linkedin} className="block rounded-lg px-3 py-2.5 text-[15px] hover:bg-paper">
                    LinkedIn ↗
                  </a>
                )}
                <a href={github} className="block rounded-lg px-3 py-2.5 text-[15px] hover:bg-paper">
                  GitHub ↗
                </a>
              </div>
            </div>
          </details>
  );
}
