import type { Product } from "@/content/site";
import { getSite } from "@/content";
import { t } from "@/content/ui";
import { localize, type Locale } from "@/lib/i18n";
import { live } from "@/content/live";

// Two separate facts per product:
//   lifecycle    – what the product is (in production, on staging, delivered to a client)
//   availability – what the last CI request to its URL returned
// A failed request is shown as a failed request, never as "live".

function availability(p: Product, b: ReturnType<typeof t>["board"]): { label: string; tone: "ok" | "fail" | "none" } {
  if (!p.url) return { label: p.status === "delivered" ? b.handedOver : b.private, tone: "none" };
  const r = live.results[p.slug];
  if (!r) return { label: b.notChecked, tone: "none" };
  return r.ok ? { label: b.up(r.status), tone: "ok" } : { label: b.noResponse, tone: "fail" };
}

function Dot({ tone, status }: { tone: "ok" | "fail" | "none"; status: Product["status"] }) {
  if (tone === "fail") return <span className="h-2 w-2 rounded-full border-2 border-amber" aria-hidden />;
  if (tone === "none") return <span className="h-2 w-2 rounded-full border border-muted" aria-hidden />;
  return <span className={`h-2 w-2 rounded-full ${status === "live" ? "bg-signal pulse" : "bg-amber"}`} aria-hidden />;
}

export function StatusBoard({ locale }: { locale: Locale }) {
  const { products } = getSite(locale);
  const b = t(locale).board;
  const inProd = products.filter((p) => p.status === "live").length;
  const up = products.filter((p) => p.status === "live" && live.results[p.slug]?.ok).length;
  return (
    <div className="reveal self-start rounded-2xl border border-rule bg-card p-1" style={{ animationDelay: "120ms" }}>
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{b.title}</h2>
        <span className="font-mono text-[11px] text-signal">
          {b.responding(up, inProd)}
        </span>
      </div>
      <ul className="divide-y divide-rule/70 rounded-xl bg-paper/60">
        {products.map((p) => {
          const a = availability(p, b);
          return (
            <li key={p.slug}>
              <a
                href={p.url ?? (p.caseStudy ? localize(locale, `/work/${p.caseStudy}/`) : "#systems")}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 hover:bg-card"
              >
                <Dot tone={a.tone} status={p.status} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium">{p.name}</span>
                  <span className="block truncate font-mono text-[11px] text-muted">{p.org}</span>
                </span>
                <span className="text-right font-mono text-[11px] leading-tight">
                  <span className="block text-ink-2">
                    {b.lifecycle[p.status]}
                    {p.play ? " · Play" : ""}
                  </span>
                  <span className={`block ${a.tone === "fail" ? "text-amber" : "text-muted"}`}>{a.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="px-4 pb-2 pt-2.5 font-mono text-[10.5px] leading-relaxed text-muted">
        {live.checkedAt
          ? b.checked(live.checkedAt.slice(0, 16).replace("T", " "))
          : b.checkedNever}
      </p>
    </div>
  );
}
