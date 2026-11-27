/**
 * Rozcestník „Začněte tady“ – cesty podle situace rodiče. Články jsou v doporučeném pořadí čtení
 * (ID = název souboru v src/content/clanky). Stránka /zacnete-tady/ a sekce na úvodu.
 */
export interface Situace {
  id: string;
  title: string;
  text: string;
  tone: 'keylime' | 'mint' | 'sage' | 'slate';
  clanky: string[];
}

export const situace: Situace[] = [
  {
    id: 'cekame-miminko', tone: 'keylime',
    title: 'Čekáme miminko',
    text: 'Co se hodí vědět o kojení i lahvi ještě před porodem.',
    clanky: ['krmeni-novorozence', 'prisati-a-bolave-bradavky', 'pije-miminko-dost', 'lahev-a-savicka', 'sterilizace-lahvi', 'krmeni-a-bezpecny-spanek'],
  },
  {
    id: 'nedari-se-kojeni', tone: 'mint',
    title: 'Nedaří se kojení',
    text: 'Bolavé bradavky, málo mléka nebo nejistota, jestli miminko pije dost.',
    clanky: ['prisati-a-bolave-bradavky', 'pije-miminko-dost', 'malo-mleka', 'bolest-prsou-pri-kojeni', 'zanet-prsu', 'kombinovane-krmeni'],
  },
  {
    id: 'umele-mleko', tone: 'sage',
    title: 'Krmíme umělým mlékem',
    text: 'Jak mléko vybrat, připravit a kolik ho dát.',
    clanky: ['jak-vybrat-kojenecke-mleko', 'priprava-umeleho-mleka', 'kolik-mleka-podle-veku', 'jak-dlouho-vydrzi-umele-mleko', 'sterilizace-lahvi'],
  },
  {
    id: 'navrat-do-prace', tone: 'slate',
    title: 'Vracím se do práce',
    text: 'Odstříkávání, skladování mléka a kombinace kojení s lahví.',
    clanky: ['kojeni-a-navrat-do-prace', 'odstrikavani-materskeho-mleka', 'skladovani-materskeho-mleka', 'kombinovane-krmeni', 'jak-prestat-kojit'],
  },
  {
    id: 'obtize', tone: 'mint',
    title: 'Miminko má obtíže',
    text: 'Koliky, ublinkávání, zácpa nebo podezření na alergii – a kdy k lékaři.',
    clanky: ['koliky', 'ublinkavani', 'zacpa-u-kojence', 'stolice-miminka', 'alergie-na-bilkovinu-kravskeho-mleka'],
  },
  {
    id: 'prikrmy', tone: 'keylime',
    title: 'Začínáme s příkrmy',
    text: 'Kdy začít, čím, jak zavádět alergeny a jak poznat dávení.',
    clanky: ['kdy-zacit-s-prikrmy', 'prvni-prikrmy', 'alergeny', 'duseni-a-daveni', 'jidelnicek-podle-veku'],
  },
];

export const zacneteUrl = '/zacnete-tady/';
