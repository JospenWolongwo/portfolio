import { products } from "@/content/site";

const hopimed = products.find((p) => p.slug === "hopimed");

const features = [
  {
    title: "An assistant grounded in live data",
    points: [
      "OpenAI tool calling over five tools: on-call doctors, on-call pharmacies, pharmacy search, hospital details and the Ministry of Health (MINSANTE) news feed.",
      "Answers come from the database, with real geocoordinates for “near me”. It says when it does not know, and it never gives medical advice.",
      "Every message is moderated first, rate-limited per IP, and capped at two model calls per turn, so cost stays bounded.",
    ],
  },
  {
    title: "Reading a prescription photo",
    points: [
      "A vision model (gpt-4o) fills a strict JSON schema: name, dosage, form, quantity and dosage instructions, plus the fields it read with doubt.",
      "An illegible name stays empty and is flagged, never guessed. No substitutions, no advice.",
      "The image and the result are never stored or logged. The patient then compares pharmacies for each medicine.",
    ],
  },
];

export function AiSection() {
  return (
    <section id="ai" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
          <span className="text-signal">03</span>
          <span className="h-px w-8 bg-rule" aria-hidden />
          AI in production
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">
          HopiMed: AI features with guardrails, for a health app.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-2">
          HopiMed helps people in Cameroon find on-call pharmacies and doctors. I built both AI features as Supabase Edge
          Functions, alone, with one rule: in health, a confident wrong answer is worse than no answer.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-rule bg-card p-6">
              <h3 className="font-display text-[1.6rem] leading-tight">{f.title}</h3>
              <ul className="mt-4 space-y-3">
                {f.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                    <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {hopimed?.url && (
          <p className="mt-6 font-mono text-[12px] text-muted">
            Live at{" "}
            <a href={hopimed.url} className="text-ink underline decoration-rule underline-offset-4 hover:text-signal">
              {hopimed.url.replace("https://", "")}
            </a>{" "}
            · Angular PWA · Supabase Edge Functions (Deno) · private repository, walkthrough on request
          </p>
        )}
      </div>
    </section>
  );
}
