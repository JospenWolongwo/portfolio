import Link from "next/link";

// Static hosting serves one 404 page for both languages, so it speaks both.
export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-32 sm:px-6">
      <p className="font-mono text-[12px] text-amber">404 · route not found · page introuvable</p>
      <h1 className="mt-4 font-display text-6xl leading-none">This page never shipped.</h1>
      <p className="mt-3 font-display text-3xl leading-tight text-muted" lang="fr">Cette page n&apos;a jamais été livrée.</p>
      <div className="mt-8 flex flex-wrap gap-6 font-mono text-[13px]">
        <Link href="/" className="text-signal hover:underline">← Back to the systems that did</Link>
        <Link href="/fr/" className="text-signal hover:underline" lang="fr">← Retour aux systèmes livrés</Link>
      </div>
    </section>
  );
}
