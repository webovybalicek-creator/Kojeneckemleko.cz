// Rehype plugin: v obsahu článků obalí první výskyt známé zkratky/pojmu tooltipem.
// Přeskakuje nadpisy, odkazy, kód, tabulkové hlavičky a už označené prvky.
import { terms, termRegex } from '../data/terms.mjs';

const SKIP = new Set(['a', 'abbr', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'th', 'script', 'style']);

export default function rehypeTerms() {
  return (tree) => {
    const seen = new Set();

    const walk = (node) => {
      if (!node.children) return;
      const out = [];
      for (const child of node.children) {
        if (child.type === 'element') {
          if (!SKIP.has(child.tagName)) walk(child);
          out.push(child);
          continue;
        }
        if (child.type !== 'text' || !termRegex.test(child.value)) {
          termRegex.lastIndex = 0;
          out.push(child);
          continue;
        }
        termRegex.lastIndex = 0;
        let last = 0;
        const text = child.value;
        for (const m of text.matchAll(termRegex)) {
          const word = m[0];
          if (seen.has(word)) continue;
          seen.add(word);
          if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) });
          const t = terms[word];
          out.push(
            t.href
              ? { type: 'element', tagName: 'a', properties: { className: ['term'], href: t.href, dataTip: t.tip }, children: [{ type: 'text', value: word }] }
              : { type: 'element', tagName: 'abbr', properties: { className: ['term'], tabIndex: 0, dataTip: t.tip }, children: [{ type: 'text', value: word }] },
          );
          last = m.index + word.length;
        }
        if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
      }
      node.children = out;
    };

    walk(tree);
  };
}
