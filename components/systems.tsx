import Link from "next/link";
import type { Product } from "@/content/site";
import { getSite } from "@/content";
import { t } from "@/content/ui";
import { localize, type Locale } from "@/lib/i18n";

function Pill({ p, locale }: { p: Product; locale: Locale }) {
  const map = {
    live: "bg-signal-soft text-signal",
    build: "bg-amber-soft text-amber",
    delivered: "border border-rule text-muted",
  } as const;
  const text = t(locale).pill[p.status];
  return <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10.5px] ${map[p.status]}`}>{text}</span>;
}

function Shot({ p, locale }: { p: Product; locale: Locale }) {
  if (p.shot) {
    return (
      <div className="overflow-hidden rounded-t-xl border-b border-rule bg-paper">
        <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="h-2 w-2 rounded-full bg-rule" />
          <span className="ml-2 truncate font-mono text-[10px] text-muted">{p.url?.replace("https://", "")}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.shot} alt={t(locale).shotAlt(p.name)} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
      </div>
    );
  }
  return (
    <div className="grid aspect-[16/10] place-items-center rounded-t-xl border-b border-rule bg-paper font-display text-4xl text-muted/70 grid-paper">
      {p.name}
    </div>
  );
}

// The three flagship products have full case studies above; this grid holds the rest.
export function Systems({ locale }: { locale: Locale }) {
  const { products } = getSite(locale);
  const u = t(locale);
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2">
      {products.filter((p) => !p.caseStudy).map((p) => (
        <article key={p.slug} className="flex flex-col rounded-xl border border-rule bg-card">
          <Shot p={p} locale={locale} />
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight">{p.name}</h3>
                <p className="font-mono text-[11px] text-muted">{p.org}</p>
              </div>
              <Pill p={p} locale={locale} />
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{p.what}</p>
            <p className="mt-3 border-l-2 border-signal pl-3 text-[14px] font-medium">{p.role}</p>
            {p.metric?.value && (
              <p className="mt-3 font-mono text-[12px]">
                <span className="text-muted">{p.metric.label}: </span>
                {p.metric.value}
              </p>
            )}
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">{p.stack.join(" · ")}</p>
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 font-mono text-[12px]">
              {p.url && (
                <a href={p.url} className="text-ink hover:text-signal" target="_blank" rel="noreferrer">
                  {p.status === "build" ? u.staging : u.visit}
                </a>
              )}
              {p.caseStudy && (
                <Link href={localize(locale, `/work/${p.caseStudy}/`)} className="text-signal hover:underline">
                  {u.caseStudy}
                </Link>
              )}
              {p.play && <span className="text-muted">Google Play</span>}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
