// Rehype plugin: ve slovenských článcích (src/content/sk-clanky) přepíše interní odkazy na české články
// na jejich slovenské verze, pokud existují (pole `cs` ve frontmatteru). Odkazy bez překladu zůstanou
// na češtině a dostanou hreflang="cs". Rubriky a „jak tvoříme obsah“ vedou na slovenské stránky.
import fs from 'node:fs';
import path from 'node:path';

const SK_CLUSTER = { mleka: 'mlieka', krmeni: 'krmenie', prikrmy: 'prikrmy', batole: 'batolata' };
const PAGES = { '/': '/sk/', '/jak-tvorime-obsah/': '/sk/ako-tvorime-obsah/', '/ochrana-soukromi/': '/sk/ochrana-sukromia/', '/nastroje/rustove-grafy/': '/sk/nastroje/rastove-grafy/' };

const loadMap = () => {
  const dir = path.resolve('src/content/sk-clanky');
  const map = {};
  if (!fs.existsSync(dir)) return map;
  for (const f of fs.readdirSync(dir)) {
    if (!/\.mdx?$/.test(f) || f.startsWith('_')) continue;
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const cs = fm.match(/^cs:\s*['"]?([\w-]+)/m)?.[1];
    const cluster = fm.match(/^cluster:\s*['"]?(\w+)/m)?.[1];
    if (cs && cluster) map[cs] = `/sk/${SK_CLUSTER[cluster]}/${f.replace(/\.mdx?$/, '')}/`;
  }
  return map;
};

export default function rehypeSkLinks() {
  return (tree, file) => {
    if (!String(file?.path ?? '').includes('/sk-clanky/')) return;
    const map = loadMap();
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
        const href = node.properties.href;
        const [p, hash = ''] = href.split('#');
        const m = p.match(/^\/(mleka|krmeni|prikrmy|batole)\/([\w-]+)\/$/);
        if (m && map[m[2]]) node.properties.href = map[m[2]] + (hash ? `#${hash}` : '');
        else if (/^\/(mleka|krmeni|prikrmy|batole)\/$/.test(p)) node.properties.href = `/sk/${SK_CLUSTER[p.slice(1, -1)]}/` + (hash ? `#${hash}` : '');
        else if (PAGES[p]) node.properties.href = PAGES[p] + (hash ? `#${hash}` : '');
        else if (p.startsWith('/') && !p.startsWith('/sk/')) node.properties.hreflang = 'cs';
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
