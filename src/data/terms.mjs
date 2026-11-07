// Vysvětlivky zkratek a pojmů pro tooltipy (rehype plugin i komponenty).
// Instituce: jen popis. Pojmy ze slovníčku: popis + odkaz na /slovnicek/#id (texty drž v souladu se src/data/slovnicek.ts).

/** @type {Record<string, { tip: string; href?: string }>} */
export const terms = {
  WHO: { tip: 'Světová zdravotnická organizace (World Health Organization)' },
  UNICEF: { tip: 'Dětský fond Organizace spojených národů' },
  FAO: { tip: 'Organizace OSN pro výživu a zemědělství' },
  AAP: { tip: 'Americká pediatrická akademie (American Academy of Pediatrics)' },
  CDC: { tip: 'Americké Centrum pro kontrolu a prevenci nemocí (Centers for Disease Control and Prevention)' },
  FDA: { tip: 'Americký Úřad pro kontrolu potravin a léčiv (Food and Drug Administration)' },
  NHS: { tip: 'Britská státní zdravotní služba (National Health Service)' },
  NICE: { tip: 'Britský Národní institut pro zdraví a péči (National Institute for Health and Care Excellence)' },
  ESPGHAN: { tip: 'Evropská společnost pro dětskou gastroenterologii, hepatologii a výživu' },
  EFSA: { tip: 'Evropský úřad pro bezpečnost potravin (European Food Safety Authority)' },
  SZPI: { tip: 'Státní zemědělská a potravinářská inspekce – dozor nad potravinami v ČR' },
  MZd: { tip: 'Ministerstvo zdravotnictví České republiky' },
  RASFF: { tip: 'Evropský systém rychlého varování pro potraviny a krmiva' },
  Cochrane: { tip: 'Mezinárodní nezávislá síť, která zpracovává systematické přehledy lékařských studií' },

  HA: { tip: 'Mléko se štěpenou (hydrolyzovanou) bílkovinou kravského mléka. Důkazy o prevenci alergie jsou slabé.', href: '/slovnicek/#ha' },
  AR: { tip: 'Antirefluxní, zahuštěné mléko proti ublinkávání – jen na doporučení lékaře.', href: '/slovnicek/#ar' },
  ABKM: { tip: 'Alergie na bílkovinu kravského mléka.', href: '/slovnicek/#abkm' },
  AAF: { tip: 'Aminokyselinové mléko – bez bílkoviny kravského mléka, pro těžké případy ABKM.', href: '/slovnicek/#aminokyselinove' },
  DMT: { tip: 'Datum minimální trvanlivosti na obalu.', href: '/slovnicek/#dmt' },
  Comfort: { tip: 'Mléko s částečně štěpenou bílkovinou prodávané proti kolikám a zácpě; důkazy o účinku chybí.', href: '/slovnicek/#comfort' },
  Cronobacter: { tip: 'Bakterie, která se může vyskytnout v sušeném mléce – proto se připravuje vodou alespoň 70 °C.', href: '/slovnicek/#cronobacter' },
  cereulid: { tip: 'Toxin bakterie Bacillus cereus, kvůli kterému byla v roce 2026 stažena některá mléka.', href: '/slovnicek/#cereulid' },
};

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const keys = Object.keys(terms).sort((a, b) => b.length - a.length);
/** Celá slova, citlivé na velikost písmen, s ohledem na českou diakritiku */
export const termRegex = new RegExp(`(?<![\\p{L}\\p{N}])(${keys.map(escape).join('|')})(?![\\p{L}\\p{N}])`, 'gu');

const html = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Pro prosté texty (popisky, perex): obalí známé zkratky tooltipem. Vrací HTML.
 * Každý pojem jen u prvního výskytu.
 */
export function annotate(text, seen = new Set()) {
  return html(text).replace(termRegex, (m) => {
    if (seen.has(m)) return m;
    seen.add(m);
    const t = terms[m];
    return t.href
      ? `<a class="term" href="${t.href}" data-tip="${html(t.tip)}">${m}</a>`
      : `<abbr class="term" tabindex="0" data-tip="${html(t.tip)}">${m}</abbr>`;
  });
}
