// Verifies every live product URL and writes content/live-status.json.
// Runs in CI before each build, and daily on a schedule, so the status board never lies.
import { readFile, writeFile } from "node:fs/promises";

const src = await readFile(new URL("../content/site.ts", import.meta.url), "utf8");
const targets = [...src.matchAll(/slug: "([^"]+)",\s*name: "[^"]+",\s*url: "(https:[^"]+)"/g)].map((m) => ({
  slug: m[1],
  url: m[2],
}));

async function check(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "portfolio-status-check" } });
      if (res.status < 500) return { ok: res.ok, status: res.status };
    } catch {}
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  return { ok: false, status: null };
}

const results = Object.fromEntries(await Promise.all(targets.map(async (t) => [t.slug, await check(t.url)])));
const out = { checkedAt: new Date().toISOString(), results };
await writeFile(new URL("../content/live-status.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
for (const [slug, r] of Object.entries(results)) console.log(`${r.ok ? "up  " : "DOWN"} ${slug} ${r.status ?? "-"}`);
