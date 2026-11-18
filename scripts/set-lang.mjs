// Static export renders one root layout with lang="en". French pages live under out/fr/,
// so set their <html lang> to "fr" in the built HTML, where search engines read it.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function* html(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* html(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

let n = 0;
for await (const file of html(new URL("../out/fr", import.meta.url).pathname)) {
  const src = await readFile(file, "utf8");
  const out = src.replace(/<html lang="en"/, '<html lang="fr"');
  if (out !== src) {
    await writeFile(file, out);
    n++;
  }
}
console.log(`set lang="fr" on ${n} pages`);
