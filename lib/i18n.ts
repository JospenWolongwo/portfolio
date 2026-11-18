export type Locale = "en" | "fr";
export const locales: Locale[] = ["en", "fr"];

/** Locale of a pathname: everything under /fr is French, the rest is English. */
export function localeOf(pathname: string | null | undefined): Locale {
  return pathname === "/fr" || pathname?.startsWith("/fr/") ? "fr" : "en";
}

/** Prefix an English path for a locale: ("fr", "/work/x/") -> "/fr/work/x/". */
export function localize(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/fr/" : `/fr${path}`;
}

/** The same page in the other language. */
export function counterpart(pathname: string): { locale: Locale; href: string } {
  if (localeOf(pathname) === "fr") {
    const rest = pathname.replace(/^\/fr/, "") || "/";
    return { locale: "en", href: rest };
  }
  return { locale: "fr", href: localize("fr", pathname || "/") };
}
