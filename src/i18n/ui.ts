/**
 * Jazykové verze webu: čeština v kořeni, slovenština v /sk/.
 * Slovenské rubriky mají vlastní slugy v URL (mleka → mlieka…), články vlastní slugy a pole `cs` s ID českého originálu.
 */
import type { Cluster } from '../data/clusters';

export type Lang = 'cs' | 'sk';

export const langFromPath = (path: string): Lang => (path === '/sk' || path.startsWith('/sk/') ? 'sk' : 'cs');

/** Slug rubriky ve slovenské URL */
export const skCluster: Record<Cluster, string> = {
  mleka: 'mlieka',
  krmeni: 'krmenie',
  prikrmy: 'prikrmy',
  batole: 'batolata',
};
export const clusterFromSk = (slug: string) =>
  (Object.entries(skCluster).find(([, v]) => v === slug)?.[0] ?? null) as Cluster | null;

export const clusterPath = (lang: Lang, c: Cluster) => (lang === 'sk' ? `/sk/${skCluster[c]}/` : `/${c}/`);
export const articlePath = (lang: Lang, c: Cluster, id: string) => `${clusterPath(lang, c)}${id}/`;

/** Rubriky ve slovenštině (název, popis, perex) */
export const skClusterMeta: Record<Cluster, { title: string; description: string; lead: string }> = {
  mleka: {
    title: 'Dojčenské mlieka',
    description: 'Druhy dojčenských mliek, príprava, trvanlivosť a dávkovanie podľa veku. Nezávisle a s odkazmi na odborné zdroje (WHO, NHS, CDC).',
    lead: 'Počiatočné, následné, príprava a trvanlivosť – čo z odporúčaní naozaj vyplýva.',
  },
  krmeni: {
    title: 'Kŕmenie',
    description: 'Dojčenie, odsávanie, uchovávanie materského mlieka a bežné ťažkosti s kŕmením bábätka. Podľa WHO, NHS a CDC.',
    lead: 'Dojčenie, fľaša alebo oboje – praktické informácie pre každý spôsob kŕmenia.',
  },
  prikrmy: {
    title: 'Príkrmy',
    description: 'Kedy začať s príkrmami, ako na prvé lyžičky a čo zaradiť v akom veku bábätka. Podľa WHO, NHS a ESPGHAN.',
    lead: 'Kedy začať, ako na to a čo zaradiť v akom veku.',
  },
  batole: {
    title: 'Batoľa',
    description: 'Jedálniček a pitie batoľaťa od 1 do 3 rokov podľa odporúčaní NHS a WHO.',
    lead: 'Po prvých narodeninách je dieťa s rodinou – čo, koľko a čo piť od 1 do 3 rokov.',
  },
};

export const ui = {
  cs: {
    siteName: 'Kojenecké mléko',
    siteTagline: 'průvodce krmením miminka',
    locale: 'cs_CZ',
    bcp47: 'cs-CZ',
    home: 'Úvod',
    skip: 'Přeskočit na obsah',
    mainNav: 'Hlavní navigace',
    menu: 'Menu',
    crumbs: 'Drobečková navigace',
    verified: 'Ověřeno',
    published: 'publikováno',
    howWeWork: 'jak tvoříme obsah',
    howWeWorkUrl: '/jak-tvorime-obsah/',
    toc: 'Obsah článku',
    tocParts: 'částí',
    faq: 'Časté otázky',
    related: 'Související články',
    readMore: 'Číst článek',
    sources: 'Zdroje',
    source: 'Zdroj',
    authors: 'Autoři',
    kind: { studie: 'Studie', doporuceni: 'Doporučení', legislativa: 'Legislativa' },
    sourcesUpdated: 'Zdroje ověřeny',
    disclaimer: 'Článek má informativní charakter a nenahrazuje konzultaci s pediatrem. Máte-li o zdraví dítěte obavy, obraťte se na lékaře.',
    articles: 'Články',
    sourceWord: (n: number) => (n === 1 ? 'zdroj' : n >= 2 && n <= 4 ? 'zdroje' : 'zdrojů'),
    studyWord: (n: number) => (n >= 1 && n <= 4 ? 'studie' : 'studií'),
    otherLang: { label: 'Slovensky', hreflang: 'sk' },
  },
  sk: {
    siteName: 'Dojčenské mlieko',
    siteTagline: 'sprievodca kŕmením bábätka',
    locale: 'sk_SK',
    bcp47: 'sk-SK',
    home: 'Úvod',
    skip: 'Preskočiť na obsah',
    mainNav: 'Hlavná navigácia',
    menu: 'Menu',
    crumbs: 'Navigácia',
    verified: 'Overené',
    published: 'publikované',
    howWeWork: 'ako tvoríme obsah',
    howWeWorkUrl: '/sk/ako-tvorime-obsah/',
    toc: 'Obsah článku',
    tocParts: 'častí',
    faq: 'Časté otázky',
    related: 'Súvisiace články',
    readMore: 'Čítať článok',
    sources: 'Zdroje',
    source: 'Zdroj',
    authors: 'Autori',
    kind: { studie: 'Štúdia', doporuceni: 'Odporúčanie', legislativa: 'Legislatíva' },
    sourcesUpdated: 'Zdroje overené',
    disclaimer: 'Článok má informatívny charakter a nenahrádza konzultáciu s pediatrom. Ak máte o zdravie dieťaťa obavy, obráťte sa na lekára.',
    articles: 'Články',
    sourceWord: (n: number) => (n === 1 ? 'zdroj' : n >= 2 && n <= 4 ? 'zdroje' : 'zdrojov'),
    studyWord: (n: number) => (n === 1 ? 'štúdia' : n >= 2 && n <= 4 ? 'štúdie' : 'štúdií'),
    otherLang: { label: 'Česky', hreflang: 'cs' },
  },
} as const;

export const t = (lang: Lang) => ui[lang];
