import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Typographie française : espace insécable avant « ; : ! ? » et à l'intérieur des guillemets.
// Appliquée au texte des pages générées, jamais au code ni aux balises.
function typoFr() {
  const fix = (text) =>
    text
      .replace(/ ([;!?])/g, ' $1')
      .replace(/ :/g, ' :')
      .replace(/« /g, '« ')
      .replace(/ »/g, ' »');
  const SKIP = /(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>|<textarea[\s\S]*?<\/textarea>|<[^>]+>)/g;

  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.name.endsWith('.html')) {
        const html = await readFile(path, 'utf8');
        const out = html
          .split(SKIP)
          .map((part, i) => (i % 2 === 1 ? part : fix(part)))
          .join('');
        await writeFile(path, out);
      }
    }
  }

  return {
    name: 'typographie-francaise',
    hooks: {
      'astro:build:done': async ({ dir }) => walk(fileURLToPath(dir)),
    },
  };
}

export default defineConfig({
  site: 'https://le-web-en-cornet.vercel.app',
  trailingSlash: 'always',
  integrations: [typoFr()],
});
