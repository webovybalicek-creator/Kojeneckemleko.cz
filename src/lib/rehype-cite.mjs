// Rehype plugin: citace v textu `[[n]](#zdroj-n)` převede na nenápadný horní index.
// <a href="#zdroj-1">[1]</a> → <sup class="cite"><a href="#zdroj-1" aria-label="Zdroj 1">1</a></sup>
// Sousední citace (oddělené jen mezerou) sloučí do jednoho <sup> s čárkou: ¹˒⁵.
const isCite = (n) =>
  n?.type === 'element' && n.tagName === 'a' && typeof n.properties?.href === 'string' && /^#zdroj-\d+$/.test(n.properties.href);

const toLink = (a) => {
  const num = a.properties.href.replace('#zdroj-', '');
  return {
    type: 'element', tagName: 'a',
    properties: { href: a.properties.href, ariaLabel: `Zdroj ${num}` },
    children: [{ type: 'text', value: num }],
  };
};

export default function rehypeCite() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      const out = [];
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (!isCite(child)) {
          if (child.type === 'element') walk(child);
          out.push(child);
          continue;
        }
        const links = [toLink(child)];
        // připojit další citace oddělené jen bílými znaky
        while (true) {
          const ws = node.children[i + 1];
          const next = node.children[i + 2];
          if (ws?.type === 'text' && /^\s*$/.test(ws.value) && isCite(next)) {
            links.push(toLink(next));
            i += 2;
          } else if (isCite(ws)) {
            links.push(toLink(ws));
            i += 1;
          } else break;
        }
        const children = [];
        links.forEach((l, k) => {
          if (k) children.push({ type: 'text', value: ',' });
          children.push(l);
        });
        // mezera před indexem pryč: „text ¹“ → „text¹“
        const prev = out[out.length - 1];
        if (prev?.type === 'text') prev.value = prev.value.replace(/[ \u00a0]+$/, '');
        out.push({ type: 'element', tagName: 'sup', properties: { className: ['cite'] }, children });
      }
      node.children = out;
    };
    walk(tree);
  };
}
