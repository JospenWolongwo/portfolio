import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/content/site";

// Self-hosted (latin subset) so builds never depend on a font CDN and visitors make no third-party requests.
const serif = localFont({
  src: [
    { path: "./fonts/serif-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const inter = localFont({ src: "./fonts/inter-normal.woff2", weight: "400 700", variable: "--font-inter", display: "swap" });
const mono = localFont({ src: "./fonts/mono-normal.woff2", weight: "400 600", variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.intro,
  openGraph: { title: `${profile.name} · ${profile.role}`, description: profile.headline, type: "website", url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Runs before paint so a saved theme choice never flashes.
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <div className="print:hidden"><SiteHeader /></div>
        <main id="main">{children}</main>
        <div className="print:hidden"><SiteFooter /></div>
      </body>
    </html>
  );
}
