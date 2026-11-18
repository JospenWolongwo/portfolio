// One entry point for content in either language.
import type { Locale } from "@/lib/i18n";
import * as en from "./site";
import * as fr from "./site.fr";
import { caseStudies as caseStudiesEn, type CaseStudy } from "./case-studies";
import { caseStudiesFr } from "./case-studies.fr";

export function getSite(locale: Locale) {
  const src = locale === "fr" ? fr : en;
  return { profile: src.profile, products: src.products, experience: src.experience, principles: src.principles };
}

// Section keys stay in English so the page can label each section's role in the story.
export type LocalizedCaseStudy = Omit<CaseStudy, "sections"> & { sections: (CaseStudy["sections"][number] & { key: string })[] };

export function getCaseStudies(locale: Locale): LocalizedCaseStudy[] {
  return caseStudiesEn.map((c) => {
    const keyed = c.sections.map((s) => ({ ...s, key: s.heading }));
    const f = locale === "fr" ? caseStudiesFr[c.slug] : undefined;
    if (!f) return { ...c, sections: keyed };
    return {
      ...c,
      kicker: f.kicker,
      title: f.title,
      org: f.org,
      period: f.period,
      role: f.role,
      summary: f.summary,
      facts: f.facts,
      stage: f.stage,
      open: f.open,
      evidence: f.evidence,
      sections: keyed.map((s, i) => ({ ...s, ...f.sections[i] })),
    };
  });
}

export function getCaseStudy(locale: Locale, slug: string) {
  return getCaseStudies(locale).find((c) => c.slug === slug);
}
