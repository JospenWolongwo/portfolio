import { products, type Product } from "@/content/site";
import { live } from "@/content/live";

function Dot({ p }: { p: Product }) {
  if (p.status === "build") return <span className="h-2 w-2 rounded-full bg-amber" aria-hidden />;
  if (p.status === "delivered") return <span className="h-2 w-2 rounded-full border border-muted" aria-hidden />;
  const r = live.results[p.slug];
  const down = r && !r.ok;
  return <span className={`h-2 w-2 rounded-full ${down ? "bg-muted" : "bg-signal pulse"}`} aria-hidden />;
}

function label(p: Product) {
  if (p.status === "build") return "in build";
  if (p.status === "delivered") return "delivered";
  const r = live.results[p.slug];
  if (r && !r.ok) return "checking";
  return "live";
}

export function StatusBoard() {
  const liveCount = products.filter((p) => p.status === "live").length;
  return (
    <div className="reveal self-start rounded-2xl border border-rule bg-card p-1 shadow-[0_1px_0_var(--rule),0_24px_48px_-32px_rgba(0,0,0,0.35)]" style={{ animationDelay: "120ms" }}>
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Systems I work on</span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-signal">
          <span className="pulse h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          {liveCount} live
        </span>
      </div>
      <ul className="divide-y divide-rule/70 rounded-xl bg-paper/60">
        {products.map((p) => (
          <li key={p.slug}>
            <a
              href={p.url ?? (p.caseStudy ? `/work/${p.caseStudy}/` : "#systems")}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 hover:bg-card"
            >
              <Dot p={p} />
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-medium">{p.name}</span>
                <span className="block truncate font-mono text-[11px] text-muted">{p.org}</span>
              </span>
              <span className="font-mono text-[11px] text-muted">
                {label(p)}
                {p.play ? " · play" : ""}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="px-4 pb-2 pt-2.5 font-mono text-[10.5px] leading-relaxed text-muted">
        {live.checkedAt
          ? `Each URL verified by CI · ${live.checkedAt.slice(0, 16).replace("T", " ")} UTC`
          : "Each URL is verified by CI before every deploy"}
      </p>
    </div>
  );
}
