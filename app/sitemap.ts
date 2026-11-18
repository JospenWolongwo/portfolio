import type { MetadataRoute } from "next";
import { profile } from "@/content/site";
import { caseStudies } from "@/content/case-studies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${profile.site}/`, changeFrequency: "weekly", priority: 1 },
    ...caseStudies.map((c) => ({ url: `${profile.site}/work/${c.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${profile.site}/Jospen-Wolongwo-CV.pdf`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
