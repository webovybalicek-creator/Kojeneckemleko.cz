// Ohlásí změněné stránky vyhledávačům přes IndexNow (Seznam.cz, Bing a další).
// Porovná otisky HTML v dist/ s otisky z minulého deploye (.indexnow/hashes.json, cache v Actions)
// a pošle jen nové nebo změněné URL. Klíč je veřejný soubor public/<klíč>.txt.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://kojeneckemleko.cz';
const HOST = new URL(SITE).host;
const KEY = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace('.txt', '');
const DIST = 'dist';
const STATE = '.indexnow/hashes.json';
const SKIP = [/^\/og\//, /^\/styleguide\//, /^\/navstevnost\//, /^\/api\//, /^\/404/];
const ENDPOINTS = ['https://search.seznam.cz/indexnow', 'https://api.indexnow.org/indexnow'];

if (!KEY) { console.log('IndexNow: chybí klíč v public/, přeskakuji.'); process.exit(0); }

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f === 'index.html') out.push(p);
  }
  return out;
}

const current = {};
for (const file of walk(DIST)) {
  const path = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (SKIP.some((r) => r.test(path))) continue;
  const html = readFileSync(file, 'utf8');
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  // ignoruje hashované názvy assetů, aby se neposílalo vše po každé změně CSS
  const body = html.replace(/\/_astro\/[^"']+/g, '');
  current[path] = createHash('sha256').update(body).digest('hex');
}

const previous = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const changed = Object.keys(current).filter((p) => previous[p] !== current[p]);
console.log(`IndexNow: ${Object.keys(current).length} stránek, změněno ${changed.length}.`);

mkdirSync('.indexnow', { recursive: true });

if (changed.length) {
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: changed.map((p) => SITE + p) });
  let ok = false;
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
      console.log(`  ${url} → ${res.status}`);
      if (res.status < 300) ok = true;
    } catch (e) {
      console.log(`  ${url} → chyba ${e.message}`);
    }
  }
  // stav uložit jen při úspěchu, jinak se změny pošlou při dalším deployi
  if (ok) writeFileSync(STATE, JSON.stringify(current));
  else if (existsSync(STATE)) writeFileSync(STATE, JSON.stringify(previous));
} else {
  writeFileSync(STATE, JSON.stringify(current));
}
