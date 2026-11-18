import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-32 sm:px-6">
      <p className="font-mono text-[12px] text-amber">404 · route not found</p>
      <h1 className="mt-4 font-display text-6xl leading-none">This page never shipped.</h1>
      <Link href="/" className="mt-8 inline-block font-mono text-[13px] text-signal hover:underline">
        ← Back to the systems that did
      </Link>
    </section>
  );
}
