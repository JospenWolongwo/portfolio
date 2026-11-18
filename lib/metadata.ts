import type { Metadata } from "next";
import { getSite } from "@/content";
import { localize, type Locale } from "./i18n";

const ogLocale = { en: "en_US", fr: "fr_FR" } as const;

function alternates(path: string) {
  return {
    canonical: undefined as string | undefined,
    languages: { en: localize("en", path), fr: localize("fr", path), "x-default": localize("en", path) },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const { profile } = getSite(locale);
  const title = `${profile.name} · ${profile.role}`;
  return {
    title: { absolute: title },
    description: profile.intro,
    alternates: { ...alternates("/"), canonical: localize(locale, "/") },
    openGraph: { title, description: profile.headline, type: "website", url: localize(locale, "/"), locale: ogLocale[locale] },
  };
}

export function caseMetadata(locale: Locale, c: { slug: string; title: string; summary: string }): Metadata {
  const path = `/work/${c.slug}/`;
  const url = localize(locale, path);
  return {
    title: c.title,
    description: c.summary,
    alternates: { ...alternates(path), canonical: url },
    openGraph: { type: "article", url, title: c.title, description: c.summary, images: [`/og/${c.slug}.png`], locale: ogLocale[locale] },
    twitter: { card: "summary_large_image", title: c.title, description: c.summary, images: [`/og/${c.slug}.png`] },
  };
}
