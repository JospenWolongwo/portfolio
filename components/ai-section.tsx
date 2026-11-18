import { products } from "@/content/site";
import { t } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

const hopimed = products.find((p) => p.slug === "hopimed");

const copy = {
  en: {
    title: "HopiMed: AI features with guardrails, for a health app.",
    intro:
      "HopiMed helps people in Cameroon find on-call pharmacies and doctors. I built both AI features as Supabase Edge Functions, alone, with one rule: in health, a confident wrong answer is worse than no answer.",
    features: [
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
    ],
    live: "Live at",
    footer: "Angular PWA · Supabase Edge Functions (Deno) · private repository, walkthrough on request",
  },
  fr: {
    title: "HopiMed : des fonctionnalités IA avec garde-fous, pour une application de santé.",
    intro:
      "HopiMed aide les gens au Cameroun à trouver les pharmacies et médecins de garde. J'ai construit seul les deux fonctionnalités IA, en Supabase Edge Functions, avec une règle : en santé, une mauvaise réponse donnée avec assurance est pire que pas de réponse.",
    features: [
      {
        title: "Un assistant ancré dans les données réelles",
        points: [
          "Appels d'outils OpenAI sur cinq outils : médecins de garde, pharmacies de garde, recherche de pharmacies, informations sur les hôpitaux et le fil d'actualité du ministère de la Santé (MINSANTE).",
          "Les réponses viennent de la base de données, avec de vraies coordonnées pour « près de moi ». Il dit quand il ne sait pas, et ne donne jamais d'avis médical.",
          "Chaque message est d'abord modéré, limité par adresse IP, et plafonné à deux appels au modèle par tour, pour que le coût reste maîtrisé.",
        ],
      },
      {
        title: "Lire la photo d'une ordonnance",
        points: [
          "Un modèle de vision (gpt-4o) remplit un schéma JSON strict : nom, dosage, forme, quantité et posologie, plus les champs lus avec un doute.",
          "Un nom illisible reste vide et est signalé, jamais deviné. Pas de substitution, pas de conseil.",
          "L'image et le résultat ne sont jamais stockés ni journalisés. Le patient compare ensuite les pharmacies pour chaque médicament.",
        ],
      },
    ],
    live: "En ligne sur",
    footer: "PWA Angular · Supabase Edge Functions (Deno) · dépôt privé, démonstration sur demande",
  },
};

export function AiSection({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section id="ai" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
          <span className="text-signal">03</span>
          <span className="h-px w-8 bg-rule" aria-hidden />
          {t(locale).aiEyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">{c.title}</h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-2">{c.intro}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {c.features.map((f) => (
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
            {c.live}{" "}
            <a href={hopimed.url} className="text-ink underline decoration-rule underline-offset-4 hover:text-signal">
              {hopimed.url.replace("https://", "")}
            </a>{" "}
            · {c.footer}
          </p>
        )}
      </div>
    </section>
  );
}
