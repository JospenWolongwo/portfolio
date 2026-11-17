import { profile } from "@/content/site";
import { live } from "@/content/live";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">Contact</p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
          Building something that has to keep working? <em className="text-signal">Let&apos;s talk.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-paper hover:opacity-90"
          >
            {profile.email}
          </a>
          <a href={profile.github} className="rounded-full border border-rule px-5 py-3 text-[15px] hover:border-ink">
            GitHub
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} className="rounded-full border border-rule px-5 py-3 text-[15px] hover:border-ink">
              LinkedIn
            </a>
          )}
          {profile.cv && (
            <a href={profile.cv} className="rounded-full border border-rule px-5 py-3 text-[15px] hover:border-ink">
              CV (PDF)
            </a>
          )}
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-rule pt-6 font-mono text-[11px] text-muted sm:flex-row sm:justify-between">
          <span>
            {profile.name} · {profile.location} · {profile.availability}
          </span>
          <span>
            {live.checkedAt
              ? `Live status checked by CI on ${live.checkedAt.slice(0, 10)}`
              : "Live status is checked by CI on every deploy"}
            {" · static, no trackers"}
          </span>
        </div>
      </div>
    </footer>
  );
}
