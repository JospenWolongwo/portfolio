import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { Diagram } from "@/components/diagrams";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  const url = `/work/${c.slug}/`;
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: c.title, description: c.summary, images: [`/og/${c.slug}.png`] },
    twitter: { card: "summary_large_image", title: c.title, description: c.summary, images: [`/og/${c.slug}.png`] },
  };
}

// Where each section sits in the story, so a reader can jump to the decision or the validation.
const phase: Record<string, string> = {
  Context: "Context",
  "The symptom": "Problem",
  "The problem": "Problem",
  "The real cause": "Diagnosis",
  "The decision": "Decision",
  "The design": "Decision",
  Proof: "Validation",
  "What it changed for users": "Outcome",
  "Around it": "Related work",
  "Two more from the same codebase": "Related work",
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const idx = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-rule">
        <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
          <Link href="/#work" className="font-mono text-[12px] text-muted hover:text-ink">
            ← All work
          </Link>
          <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-signal">{c.kicker}</p>
          <h1 className="reveal mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.015em]">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-2">{c.summary}</p>
          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-rule pt-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Product</dt>
              <dd className="mt-1 text-[15px]">{c.product} · {c.org}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">My role</dt>
              <dd className="mt-1 text-[15px]">{c.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Period</dt>
              <dd className="mt-1 text-[15px]">{c.period}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-4 -mt-px">
          {c.facts.map((f) => (
            <div key={f.label} className="bg-card p-4">
              <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{f.label}</dt>
              <dd className="mt-1 font-display text-[1.6rem] leading-tight">{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-rule bg-card px-4 py-3 text-[14.5px] leading-relaxed text-ink-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Evidence · {c.stage.label}</span>
          {c.stage.detail}
        </p>

        <div className="py-8">
          {c.sections.map((s, i) => (
            <section key={s.heading} id={s.heading.toLowerCase().includes("more") ? "more" : undefined} className="border-b border-rule py-10 last:border-0">
              {phase[s.heading] && (
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {phase[s.heading] !== s.heading && ` · ${phase[s.heading]}`}
                </p>
              )}
              <h2 className="mt-2 font-display text-[clamp(1.6rem,4vw,2rem)] leading-tight">{s.heading}</h2>
              {s.body.map((para) => (
                <p key={para.slice(0, 32)} className="mt-4 max-w-[68ch] text-[16px] leading-[1.75] text-ink-2 sm:text-[16.5px]">
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mt-5 max-w-[68ch] space-y-3">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                      <span className="mt-[0.15em] font-mono text-[13px] text-signal" aria-hidden>✓</span>
                      {li}
                    </li>
                  ))}
                </ul>
              )}
              {s.diagram && <Diagram k={s.diagram} />}
              {s.code && (
                <figure className="mt-8 overflow-hidden rounded-2xl border border-rule">
                  <figcaption className="code-block flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] opacity-80">
                    <span>{s.code.file}</span>
                    <span className="uppercase">{s.code.lang} · excerpt</span>
                  </figcaption>
                  <pre tabIndex={0} aria-label={`Code excerpt from ${s.code.file}`} className="code-block overflow-x-auto p-4 font-mono text-[12px] leading-[1.7] sm:p-5 sm:text-[12.5px]">
                    <code>{s.code.source}</code>
                  </pre>
                </figure>
              )}
            </section>
          ))}
        </div>

        <aside className="mb-12 rounded-2xl border border-amber/40 bg-amber-soft/50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">Still open · stated honestly</p>
          <ul className="mt-3 space-y-2">
            {c.open.map((o) => (
              <li key={o} className="text-[15px] leading-relaxed text-ink-2">{o}</li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[11.5px] text-muted">
            Evidence: {c.evidence.join(" · ")} (private repository, walkthrough on request)
          </p>
        </aside>

        <Link
          href={`/work/${next.slug}/`}
          className="group mb-20 block rounded-2xl border border-rule bg-card p-6 hover:border-ink sm:p-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Next case study</p>
          <p className="mt-2 font-display text-[1.9rem] leading-tight group-hover:text-signal">{next.title} →</p>
        </Link>
      </div>
    </article>
  );
}
