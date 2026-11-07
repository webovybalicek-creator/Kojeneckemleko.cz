import type { clusters } from '../content.config';

export type Cluster = (typeof clusters)[number];

export const clusterMeta: Record<Cluster, {
  title: string;
  description: string;
  lead: string;
  tone: 'sage' | 'mint' | 'keylime';
  planned: string[];
}> = {
  mleka: {
    title: 'Kojenecká mléka',
    description: 'Typy kojeneckých mlék, složení, značky dostupné v ČR a srovnávací tabulky. Nezávisle a s odkazy na odborné zdroje.',
    lead: 'Počáteční, pokračovací, HA, AR, kozí nebo A2? Vysvětlujeme, čím se mléka liší a co z toho opravdu vyplývá.',
    tone: 'sage',
    planned: [
      'Jak vybrat kojenecké mléko',
      'Počáteční vs. pokračovací mléko',
      'HA, AR a comfort mléka – kdy dávají smysl',
      'Kozí mléko pro kojence',
      'Jak správně připravit umělé mléko',
      'Kolik mléka dát miminku podle věku',
    ],
  },
  krmeni: {
    title: 'Krmení',
    description: 'Kojení, kombinované krmení, lahve, sterilizace a běžné obtíže s krmením miminka. Podle WHO, NHS a ESPGHAN.',
    lead: 'Kojení, lahev nebo obojí – praktické informace pro každý způsob krmení.',
    tone: 'mint',
    planned: [
      'Kombinované krmení',
      'Jak vybrat kojeneckou láhev a savičku',
      'Sterilizace lahví',
      'Koliky a ublinkávání',
      'Alergie na bílkovinu kravského mléka',
    ],
  },
  prikrmy: {
    title: 'Příkrmy',
    description: 'Kdy začít s příkrmy, BLW nebo kaše, zavádění alergenů a jídelníček podle věku miminka.',
    lead: 'Kdy začít, jak na to a co zařadit v jakém věku.',
    tone: 'keylime',
    planned: [
      'Kdy začít s příkrmy',
      'BLW, nebo kaše?',
      'Zavádění alergenů',
      'Jídelníček podle věku',
    ],
  },
};
