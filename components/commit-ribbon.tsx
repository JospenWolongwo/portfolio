import { commitsByMonth } from "@/content/site";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function CommitRibbon() {
  const max = Math.max(...commitsByMonth.map(([, n]) => n));
  const total = commitsByMonth.reduce((s, [, n]) => s + n, 0);
  const first = commitsByMonth[0][0];
  const last = commitsByMonth[commitsByMonth.length - 1][0];
  const fmt = (ym: string) => `${MONTHS[Number(ym.slice(5)) - 1]} ${ym.slice(0, 4)}`;

  return (
    <figure className="mt-14">
      <div className="flex items-end justify-between gap-4">
        <figcaption className="max-w-md text-[14px] leading-relaxed text-ink-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Shipping log</span>
          <br />
          <strong className="font-semibold text-ink">{total.toLocaleString("en-US")} commits</strong> across every
          product I work on, month by month. Most of them are in private repositories.
        </figcaption>
        <span className="hidden font-mono text-[11px] text-muted sm:block">peak {max}/month</span>
      </div>
      <div
        className="mt-5 flex h-28 items-end gap-[3px] sm:gap-1.5"
        role="img"
        aria-label={`Commits per month from ${fmt(first)} to ${fmt(last)}, ${total} in total, rising from 2 to a peak of ${max}.`}
      >
        {commitsByMonth.map(([ym, n]) => (
          <div key={ym} className="group relative flex h-full flex-1 items-end">
            <div
              className="w-full rounded-t-[3px] bg-ink/80 transition-colors group-hover:bg-signal"
              style={{ height: `${Math.max(3, (n / max) * 100)}%` }}
            />
            <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper group-hover:block">
              {fmt(ym)} · {n}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between border-t border-rule pt-2 font-mono text-[10.5px] text-muted">
        <span>{fmt(first)}</span>
        <span>{fmt(last)}</span>
      </div>
    </figure>
  );
}
