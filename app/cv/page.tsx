import type { Metadata } from "next";
import { commitsByMonth, experience, principles, products, profile, type Product } from "@/content/site";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "CV",
  description: `${profile.name}, ${profile.role}. One-page-per-sheet CV, printable to A4.`,
};

const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

const toolbox: [string, string][] = [
  ["Languages", "TypeScript, JavaScript, SQL"],
  ["Backend", "NestJS (Fastify), Prisma, Drizzle, BullMQ, Supabase, Edge Functions"],
  ["Data", "PostgreSQL, MongoDB, Redis / Valkey, PgBouncer"],
  ["Web", "Next.js, React 19, Angular, TanStack Query, Tailwind CSS"],
  ["Mobile", "Expo, React Native, EAS builds and OTA updates"],
  ["Cloud", "AWS CDK, ECS, Aurora, ECR, S3, Fly.io, Vercel, Firebase"],
  ["Delivery", "GitHub Actions, GitLab CI, Playwright, Testcontainers, pgTAP"],
  ["Payments", "PawaPay, MTN MoMo, Orange Money: collections, payouts, refunds"],
];

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section">
      <h2 className="cv-h2">
        <span className="cv-n">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Dot({ p }: { p: Product }) {
  const cls = p.status === "live" ? "cv-dot live" : p.status === "build" ? "cv-dot build" : "cv-dot done";
  return <span className={cls} aria-hidden />;
}

function Ribbon() {
  const max = Math.max(...commitsByMonth.map(([, n]) => n));
  const total = commitsByMonth.reduce((s, [, n]) => s + n, 0);
  const w = 100 / commitsByMonth.length;
  return (
    <figure className="cv-ribbon">
      <svg viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden>
        {commitsByMonth.map(([ym, n], i) => {
          const h = Math.max(0.6, (n / max) * 14);
          return <rect key={ym} x={i * w + w * 0.14} y={14 - h} width={w * 0.72} height={h} rx={0.3} />;
        })}
      </svg>
      <figcaption>
        <span>Jan 2025</span>
        <span>
          <b>{total.toLocaleString("en-US")} commits</b> across every product I work on, most in private repositories
        </span>
        <span>Nov 2026</span>
      </figcaption>
    </figure>
  );
}

function Role({ r }: { r: (typeof experience)[number] }) {
  return (
    <article className="cv-row">
      <p className="cv-ledger">{r.period}</p>
      <div>
        <h3 className="cv-h3">
          {r.org}
          {r.title && <span> · {r.title}</span>}
        </h3>
        {r.points.length > 0 && (
          <ul className="cv-list">
            {r.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function Foot({ page }: { page: number }) {
  return (
    <footer className="cv-foot">
      <span>{profile.name} · CV</span>
      <span>Every line maps to a commit, a merged PR or a live URL · {host(profile.site)}</span>
      <span>{page} / 2</span>
    </footer>
  );
}

export default function CV() {
  const split = 3; // roles on sheet one
  return (
    <div className="cv-desk">
      <div className="cv-toolbar print:hidden">
        <p className="font-mono text-[12px] text-muted">A4 · 2 pages · selectable text, ATS friendly</p>
        <a href={profile.cv ?? "#"} download className="rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-paper hover:opacity-90">
          Download PDF
        </a>
      </div>

      {/* Sheet 1 */}
      <div className="cv-sheet">
        <header className="cv-head">
          <div>
            <p className="cv-kicker">
              <span className="cv-dot live" aria-hidden /> {profile.availability} · {profile.location}
            </p>
            <h1 className="cv-name">{profile.name}</h1>
            <p className="cv-role">
              Full-stack engineer · Co-founder &amp; CTO, Poky Group
            </p>
          </div>
          <address className="cv-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.site}>{host(profile.site)}</a>
            <a href={profile.github}>{host(profile.github)}</a>
            {profile.linkedin && <a href={profile.linkedin}>{host(profile.linkedin).replace("www.", "")}</a>}
          </address>
        </header>

        <p className="cv-lede">
          I ship products people use, <em>and keep them running.</em>
        </p>
        <p className="cv-intro">
          {profile.intro} Comfortable owning a system end to end: schema, API, web and mobile clients, CI, cloud and the
          release that reaches users.
        </p>

        <Ribbon />

        <Section n="01" title="Systems I build and run">
          <ul className="cv-systems">
            {products.map((p) => (
              <li key={p.slug}>
                <Dot p={p} />
                <div>
                  <p className="cv-sys-name">
                    {p.name}
                    {p.url ? (
                      <a href={p.url}>{host(p.url)}</a>
                    ) : (
                      <span className="cv-sys-tag">{p.status === "build" ? "in build" : "delivered"}</span>
                    )}
                    {p.play && <span className="cv-sys-tag">Google Play</span>}
                  </p>
                  <p className="cv-sys-role">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section n="02" title="Experience">
          {experience.slice(0, split).map((r) => (
            <Role key={r.org} r={r} />
          ))}
        </Section>

        <Foot page={1} />
      </div>

      {/* Sheet 2 */}
      <div className="cv-sheet">
        <Section n="02" title="Experience, continued">
          {experience.slice(split).map((r) => (
            <Role key={r.org} r={r} />
          ))}
        </Section>

        <Section n="03" title="Problems I can walk you through">
          {caseStudies.map((c) => (
            <article key={c.slug} className="cv-row">
              <p className="cv-ledger">{c.product}</p>
              <div>
                <h3 className="cv-h3 cv-serif">{c.title}</h3>
                <p className="cv-body">{c.summary}</p>
                <a className="cv-link" href={`${profile.site}/work/${c.slug}/`}>
                  {host(profile.site)}/work/{c.slug}
                </a>
              </div>
            </article>
          ))}
        </Section>

        <Section n="04" title="How I work">
          <ul className="cv-principles">
            {principles.map((p) => (
              <li key={p.title}>
                <p className="cv-body">
                  <strong className="cv-inline-title">{p.title}</strong> {p.body}{" "}
                  <span className="cv-proof">{p.proof}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section n="05" title="Toolbox">
          <dl className="cv-tools">
            {toolbox.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Foot page={2} />
      </div>
    </div>
  );
}
