/** Nástroje pro rodiče – rozcestník /nastroje/. Vše běží v prohlížeči, bez registrace a zdarma. */
export interface Nastroj {
  href: string;
  title: string;
  text: string;
  motif: 'lupa' | 'hodiny' | 'kapka';
  tone: 'sage' | 'mint' | 'keylime' | 'slate';
  cta: string;
}

export const nastroje: Nastroj[] = [
  {
    href: '/nastroje/kontrola-mleka/',
    title: 'Kontrola staženého mléka',
    text: 'Vyberte mléko a datum minimální trvanlivosti. Hned uvidíte, jestli je balení na seznamu stažených.',
    motif: 'lupa', tone: 'slate', cta: 'Zkontrolovat balení',
  },
  {
    href: '/nastroje/denik-krmeni/',
    title: 'Deník krmení a časovač kojení',
    text: 'Kdy miminko naposledy pilo, z kterého prsu a kolik z lahve. Bez registrace, záznamy zůstávají ve vašem telefonu.',
    motif: 'hodiny', tone: 'sage', cta: 'Otevřít deník',
  },
  {
    href: '/mleka/kolik-mleka-podle-veku/#výpočet-podle-hmotnosti',
    title: 'Kalkulačka množství mléka',
    text: 'Orientační denní množství umělého mléka podle hmotnosti miminka do 6 měsíců.',
    motif: 'kapka', tone: 'keylime', cta: 'Spočítat množství',
  },
];
