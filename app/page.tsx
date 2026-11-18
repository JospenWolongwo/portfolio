import Link from "next/link";
import { experience, principles, products, profile } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { StatusBoard } from "@/components/status-board";
import { Systems } from "@/components/systems";
import { AiSection } from "@/components/ai-section";

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
      <span className="text-signal">{n}</span>
      <span className="h-px w-8 bg-rule" aria-hidden />
      {children}
    </p>
  );
}

const shotFor = (slug: string) => products.find((p) => p.caseStudy === slug)?.shot;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.site,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  knowsAbout: profile.stack,
  worksFor: { "@type": "Organization", name: "Nexma", url: "https://nexma.org" },
};

export default function Home() {
  const liveCount = products.filter((p) => p.status === "live").length;
  const playCount = products.filter((p) => p.play).length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="reveal">
            <p className="font-mono text-[12px] text-muted">
              <span className="text-ink">{profile.role}</span> · TypeScript · {profile.location} ·{" "}
              <span className="text-signal">{profile.availability}</span>
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.9rem,7.2vw,5.6rem)] leading-[0.98] tracking-[-0.02em]">
              I ship products people use, <em className="text-signal">and keep them running.</em>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-2">{profile.intro}</p>
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-y border-rule py-4">
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">In production</dt>
                <dd className="mt-1 font-display text-3xl">{liveCount}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">On Google Play</dt>
                <dd className="mt-1 font-display text-3xl">{playCount}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Sole engineer on</dt>
                <dd className="mt-1 font-display text-3xl">{products.filter((p) => p.role.startsWith("Sole engineer")).length}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.cv && (
                <a href={profile.cv} className="rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-paper hover:opacity-90">
                  Download CV <span className="font-mono text-[12px] opacity-70">PDF</span>
                </a>
              )}
              <Link href="#work" className="rounded-full border border-rule px-5 py-3 text-[15px] hover:border-ink">
                Read the case studies
              </Link>
            </div>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12.5px]">
              <a href={`mailto:${profile.email}`} className="text-ink-2 underline decoration-rule underline-offset-4 hover:text-signal">
                {profile.email}
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} className="text-ink-2 underline decoration-rule underline-offset-4 hover:text-signal">
                  LinkedIn
                </a>
              )}
              <a href={profile.github} className="text-ink-2 underline decoration-rule underline-offset-4 hover:text-signal">
                GitHub
              </a>
            </p>
            <p className="mt-6 font-mono text-[11.5px] text-muted">{profile.stack.join("  ·  ")}</p>
          </div>
          <StatusBoard />
        </div>
      </section>

      {/* Case studies */}
      <section id="work" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow n="01">Selected work</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">
            Four problems, the decisions I made, and the proof.
          </h2>
          <div className="mt-12 grid gap-5">
            {caseStudies.map((c, i) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}/`}
                className="group grid gap-6 rounded-2xl border border-rule bg-card p-5 transition hover:border-ink sm:p-8 lg:grid-cols-[1fr_1.4fr]"
              >
                <div>
                  {shotFor(c.slug) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={shotFor(c.slug)}
                      alt=""
                      loading="lazy"
                      className="mb-6 aspect-[16/10] w-full rounded-lg border border-rule object-cover object-top"
                    />
                  )}
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {String(i + 1).padStart(2, "0")} · {c.product} · {c.org}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.08] group-hover:text-signal">
                    {c.title}
                  </h3>
                  <p className="mt-3 font-mono text-[11.5px] text-muted">{c.kicker}</p>
                  <p className="mt-3 inline-block rounded-full border border-rule px-2.5 py-0.5 font-mono text-[10.5px] text-ink-2">
                    Evidence: {c.stage.label}
                  </p>
                </div>
                <div>
                  <p className="text-[15.5px] leading-relaxed text-ink-2">{c.summary}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3">
                    {c.facts.slice(0, 4).map((f) => (
                      <div key={f.label} className="border-l-2 border-signal/60 pl-3">
                        <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{f.label}</dt>
                        <dd className="mt-0.5 text-[15px] font-medium">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] text-ink group-hover:text-signal">
                    Read the case study <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Systems */}
      <section id="systems" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow n="02">More systems</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">
            Other products I&apos;ve shipped, and exactly what my part was.
          </h2>
          <Systems />
        </div>
      </section>

      <AiSection />

      {/* Principles */}
      <section className="border-t border-rule bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow n="04">How I work</Eyebrow>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-[1.75rem] leading-tight">{p.title}</h3>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-2">{p.body}</p>
                {p.href ? (
                  <Link href={p.href} className="mt-3 inline-block font-mono text-[12px] text-signal hover:underline">
                    Evidence: {p.proof} →
                  </Link>
                ) : (
                  <p className="mt-3 font-mono text-[12px] text-muted">Evidence: {p.proof}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow n="05">Experience</Eyebrow>
          <ol className="mt-10 divide-y divide-rule border-y border-rule">
            {experience.map((r) => (
              <li key={r.org} className="grid gap-4 py-8 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="font-mono text-[12px] text-muted">{r.period}</p>
                </div>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-tight">
                    {r.org}
                    {r.title && <span className="font-normal text-muted"> · {r.title}</span>}
                  </h3>
                  {r.note && <p className="mt-1 font-mono text-[11.5px] text-muted">{r.note}</p>}
                  {r.points.length > 0 && <ul className="mt-3 space-y-2">
                    {r.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                        <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
