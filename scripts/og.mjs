// Vygeneruje obrázky pro sdílení (Open Graph) do public/images/og/<slug>.png (šablony jsou na /og/<slug>/).
// Použití: npm run og  (po přidání nebo přejmenování článku; PNG se commitují do repa)
// Vyžaduje Playwright s Chromiem (npx playwright install chromium).
import { execSync, spawn } from 'node:child_process';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

// Playwright z projektu, jinak z globální instalace
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  const globalRoot = execSync('npm root -g').toString().trim();
  ({ chromium } = createRequire(join(globalRoot, 'noop.js'))('playwright'));
}

const root = new URL('..', import.meta.url).pathname;
execSync('npx astro build', { cwd: root, stdio: 'inherit' });

const ogDir = join(root, 'dist', 'og');
const slugs = readdirSync(ogDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const outDir = join(root, 'public', 'images', 'og');
mkdirSync(outDir, { recursive: true });

const port = 4391;
const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { cwd: root, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 3000));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const slug of slugs) {
  await page.goto(`http://localhost:${port}/og/${slug}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(outDir, `${slug}.png`), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('og:', slug);
}
await browser.close();
server.kill();
try { execSync('npx astro preview stop', { cwd: root, stdio: 'ignore' }); } catch {}
