import type { MetadataRoute } from "next";
import { profile } from "@/content/site";
import { caseStudies } from "@/content/case-studies";

export const dynamic = "force-static";

const pages = ["/", ...caseStudies.map((c) => `/work/${c.slug}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${profile.site}${p}`;
  const fr = (p: string) => `${profile.site}${p === "/" ? "/fr/" : `/fr${p}`}`;
  return [
    ...pages.flatMap((p) => {
      const languages = { en: url(p), fr: fr(p) };
      return [
        { url: url(p), alternates: { languages }, priority: p === "/" ? 1 : 0.8 },
        { url: fr(p), alternates: { languages }, priority: p === "/" ? 0.9 : 0.7 },
      ];
    }),
    { url: `${profile.site}/Jospen-Wolongwo-CV.pdf`, priority: 0.6 },
    { url: `${profile.site}/Jospen-Wolongwo-CV-FR.pdf`, priority: 0.5 },
  ];
}
