"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { t } from "@/content/ui";
import { counterpart, localeOf } from "@/lib/i18n";

const KEY = "lang-switch-anchor";

// Both languages render the same sections in the same order, so the reader's place is
// "section n, this far into it". Text lengths differ between languages, pixels don't carry over.
function currentAnchor() {
  const sections = [...document.querySelectorAll("main section, main article, footer")];
  for (let i = sections.length - 1; i >= 0; i--) {
    const r = sections[i].getBoundingClientRect();
    if (r.top <= 80) return { i, ratio: Math.min(1, (80 - r.top) / Math.max(1, r.height)) };
  }
  return { i: -1, ratio: 0 };
}

function restoreAnchor() {
  let saved: { i: number; ratio: number } | null = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
    sessionStorage.removeItem(KEY);
  } catch {}
  if (!saved) return;
  if (saved.i < 0) return window.scrollTo({ top: 0, behavior: "instant" });
  const el = document.querySelectorAll("main section, main article, footer")[saved.i] as HTMLElement | undefined;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + saved.ratio * el.offsetHeight - 80, behavior: "instant" });
}

// Switches language in place: client-side navigation to the same page in the other language,
// no full reload, and the reader stays where they were.
export function LanguageSwitch() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const current = localeOf(pathname);
  const target = counterpart(pathname);
  const s = t(current).langSwitch;

  // The new page's content can land a moment after the URL changes; wait for it, then restore.
  useEffect(() => {
    let tries = 0;
    let id = 0;
    const tick = () => {
      const ready = document.querySelector(`main [data-locale="${current}"]`);
      if (ready || tries++ > 40) restoreAnchor();
      else id = window.setTimeout(tick, 25);
    };
    tick();
    return () => window.clearTimeout(id);
  }, [pathname, current]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // keep "open in new tab"
    e.preventDefault();
    const dest = counterpart(window.location.pathname);
    try {
      localStorage.setItem("lang", dest.locale);
      sessionStorage.setItem(KEY, JSON.stringify(currentAnchor()));
    } catch {}
    router.push(dest.href, { scroll: false });
  };

  return (
    <a
      href={target.href}
      hrefLang={target.locale}
      lang={target.locale}
      onClick={go}
      aria-label={s.aria}
      title={s.label}
      className="grid h-8 min-w-8 place-items-center rounded-full border border-rule px-2 font-mono text-[11px] text-muted hover:border-ink hover:text-ink"
    >
      {s.short}
    </a>
  );
}
