/**
 * První rok krmení po obdobích – výběr věku na úvodu a stránka /prvni-rok/.
 * Každé tvrzení je převzaté z ověřeného článku (odkaz `clanek`) a má u sebe zdroj z jeho `sources`.
 * Když se článek změní, upravte i tento soubor.
 */

export interface Zdroj { label: string; href: string }
export interface Fakt { text: string; zdroje: Zdroj[] }
export interface Odkaz { label: string; href: string }

export interface Obdobi {
  id: string;
  /** Krátký štítek na přepínači */
  stitek: string;
  /** Delší název období */
  nazev: string;
  tone: 'cream' | 'keylime' | 'mint' | 'sage' | 'slate';
  mleko: Fakt;
  kolik: Fakt;
  /** Popisek řádku „kolik“, když nejde o množství */
  kolikLabel?: string;
  jidlo: Fakt;
  /** Další body pro časovou osu */
  dalsi: Fakt[];
  odkazy: Odkaz[];
}

const Z = {
  aap: { label: 'AAP', href: 'https://healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/Amount-and-Schedule-of-Formula-Feedings.aspx' },
  cdc: { label: 'CDC', href: 'https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/how-much-and-how-often.html' },
  nhsWales: { label: 'NHS Wales', href: 'https://111.wales.nhs.uk/livewell/pregnancy/bottleformulacommonquest/' },
  nhsTypes: { label: 'NHS', href: 'https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/types-of-formula/' },
  nhsUse: { label: 'NHS', href: 'https://www.nhs.uk/best-start-in-life/baby/feeding-your-baby/bottle-feeding/how-to-make-up-a-feed/how-to-use-formula/' },
  who: { label: 'WHO', href: 'https://www.who.int/westernpacific/health-topics/infant-nutrition' },
  nhsFirst: { label: 'NHS', href: 'https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/' },
  espghanCf: { label: 'ESPGHAN', href: 'https://www.espghan.org/dam/jcr%3A3d960daa-e2f3-499f-9df9-2da682976cec/2017%20Complementary_Feeding__A_Position_Paper_by_the.21.pdf' },
  efsaCf: { label: 'EFSA', href: 'https://www.efsa.europa.eu/sites/default/files/Complementary_Feeding_PLS_PDF.pdf' },
  nhs6: { label: 'NHS', href: 'https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/from-around-6-months/' },
  nhs7: { label: 'NHS', href: 'https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/7-to-9-months/' },
  nhs10: { label: 'NHS', href: 'https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/10-to-12-months/' },
  nhs12: { label: 'NHS', href: 'https://www.nhs.uk/best-start-in-life/baby/weaning/what-to-feed-your-baby/over-12-months/' },
  nhsDrinks: { label: 'NHS', href: 'https://www.nhs.uk/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/' },
  nhsAvoid: { label: 'NHS', href: 'https://www.nhs.uk/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/' },
  nhsAllergy: { label: 'NHS', href: 'https://www.nhs.uk/baby/weaning-and-feeding/food-allergies-in-babies-and-young-children/' },
  nhsTeeth: { label: 'NHS', href: 'https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/' },
  espghanD: { label: 'ESPGHAN', href: 'https://www.espghan.org/dam/jcr:0a007a85-58da-4c58-b0a5-e950ed494bcc/2013_vitamin_D_in_the_Healthy_European_Paediatric_Population.pdf' },
  nhsVit: { label: 'NHS', href: 'https://www.nhs.uk/baby/weaning-and-feeding/vitamins-for-children/' },
  unicef: { label: 'UNICEF UK', href: 'https://www.unicef.org.uk/babyfriendly/wp-content/uploads/sites/2/2016/08/Baby-Friendly-responsive-bottle-feeding-tips-red-book-p4.pdf' },
  efsaYcf: { label: 'EFSA', href: 'https://www.efsa.europa.eu/en/press/news/131025' },
} satisfies Record<string, Zdroj>;

export const obdobi: Obdobi[] = [
  {
    id: 'novorozenec', stitek: '0–1 měs.', nazev: 'První měsíc', tone: 'cream',
    mleko: { text: 'Mateřské mléko, nebo počáteční kojenecké mléko.', zdroje: [Z.nhsTypes] },
    kolik: { text: 'První dny 30–60 ml na krmení, 8–12× za 24 h. Na konci měsíce obvykle 90–120 ml.', zdroje: [Z.aap, Z.cdc] },
    jidlo: { text: 'Jen mléko. Výhradně kojené miminko nepotřebuje ani vodu.', zdroje: [Z.who, Z.nhsDrinks] },
    dalsi: [
      { text: 'ESPGHAN doporučuje všem kojencům v 1. roce vitamin D (400 IU denně); NHS ho doporučuje od narození kojeným miminkům. Dávku proberte s pediatrem.', zdroje: [Z.espghanD, Z.nhsVit] },
      { text: 'Krmte podle projevů hladu a do dopití lahve miminko nenuťte.', zdroje: [Z.unicef] },
    ],
    odkazy: [
      { label: 'Kolik mléka podle věku', href: '/mleka/kolik-mleka-podle-veku/' },
      { label: 'Jak poznat, že miminko pije dost', href: '/krmeni/pije-miminko-dost/' },
      { label: 'Jak připravit umělé mléko', href: '/mleka/priprava-umeleho-mleka/' },
    ],
  },
  {
    id: 'do-6', stitek: '1–6 měs.', nazev: '1. až 6. měsíc', tone: 'keylime',
    mleko: { text: 'Mateřské, nebo počáteční mléko. Nic dalšího není potřeba.', zdroje: [Z.who, Z.nhsTypes] },
    kolik: { text: 'Orientačně 150–200 ml na kilogram hmotnosti za den, krmení zhruba každé 3–4 hodiny.', zdroje: [Z.nhsWales, Z.cdc] },
    jidlo: { text: 'Příkrmy WHO i NHS doporučují kolem 6. měsíce. ESPGHAN a EFSA: ne dřív než v 17. týdnu.', zdroje: [Z.who, Z.nhsFirst, Z.espghanCf, Z.efsaCf] },
    dalsi: [
      { text: 'Množství se den ode dne liší – víc při růstovém skoku, méně třeba při nemoci.', zdroje: [Z.nhsWales] },
    ],
    odkazy: [
      { label: 'Kalkulačka množství mléka', href: '/mleka/kolik-mleka-podle-veku/' },
      { label: 'Kdy začít s příkrmy', href: '/prikrmy/kdy-zacit-s-prikrmy/' },
      { label: 'Váha miminka podle měsíců', href: '/krmeni/vaha-miminka/' },
      { label: 'Délka miminka podle měsíců', href: '/krmeni/delka-miminka/' },
    ],
  },
  {
    id: '6-9', stitek: '6–9 měs.', nazev: '6. až 9. měsíc', tone: 'mint',
    mleko: { text: 'Hlavním nápojem zůstává mateřské nebo počáteční mléko. Přechod na pokračovací podle NHS nemá prokázaný přínos.', zdroje: [Z.nhsTypes] },
    kolik: { text: 'Kolem 6. měsíce obvykle 180–240 ml na krmení, 4–5× denně. V 7–9 měsících umělého mléka kolem 600 ml denně.', zdroje: [Z.aap, Z.nhs7] },
    jidlo: { text: 'Začíná se jedním jídlem denně, mezi 7. a 9. měsícem přibývají 3 jídla denně.', zdroje: [Z.nhs6, Z.nhs7] },
    dalsi: [
      { text: 'Alergenní potraviny (vejce, arašídy, lepek…) neodkládejte – po jedné a v malém množství.', zdroje: [Z.nhsAllergy] },
      { text: 'Příkrmy by měly obsahovat železo – maso nebo potraviny obohacené železem.', zdroje: [Z.espghanCf] },
      { text: 'K jídlu doušky vody z hrnečku. Sůl ani cukr do jídla nepřidávejte.', zdroje: [Z.nhsDrinks, Z.nhsAvoid] },
      { text: 'Zoubky čistěte, jakmile se prořízne první.', zdroje: [Z.nhsTeeth] },
    ],
    odkazy: [
      { label: 'První příkrmy krok za krokem', href: '/prikrmy/prvni-prikrmy/' },
      { label: 'Zavádění alergenů', href: '/prikrmy/alergeny/' },
      { label: 'Počáteční vs. pokračovací', href: '/mleka/pocatecni-vs-pokracovaci/' },
    ],
  },
  {
    id: '10-12', stitek: '10–12 měs.', nazev: '10. až 12. měsíc', tone: 'sage',
    mleko: { text: 'Stále mateřské nebo počáteční mléko. Kravské mléko zatím jen do jídla.', zdroje: [Z.nhsTypes, Z.nhsDrinks] },
    kolik: { text: 'Obvykle kolem 3 krmení mlékem denně, umělého mléka orientačně kolem 400 ml.', zdroje: [Z.nhs10] },
    jidlo: { text: 'Pestrá strava v kouscích. Svačiny miminko do 1 roku nepotřebuje – při hladu nabídněte mléko.', zdroje: [Z.nhs10] },
    dalsi: [
      { text: 'Med až po 1. roce.', zdroje: [Z.nhsAvoid] },
    ],
    odkazy: [
      { label: 'Jídelníček miminka podle věku', href: '/prikrmy/jidelnicek-podle-veku/' },
      { label: 'Sůl, cukr a med', href: '/prikrmy/sul-cukr-a-med/' },
    ],
  },
  {
    id: 'od-1', stitek: 'Od 1 roku', nazev: 'Od 1 roku', tone: 'slate',
    mleko: { text: 'Hlavním nápojem může být pasterované plnotučné nebo polotučné kravské mléko. Batolecí mléka děti nepotřebují.', zdroje: [Z.nhsDrinks, Z.efsaYcf] },
    kolikLabel: 'Pití',
    kolik: { text: 'Hlavními nápoji jsou mléko a voda. WHO doporučuje kojit do 2 let a déle.', zdroje: [Z.nhs12, Z.who] },
    jidlo: { text: 'Jí s rodinou, jen menší porce a bez soli a cukru.', zdroje: [Z.nhs12] },
    dalsi: [
      { text: 'Od lahve postupně odvykejte, pití z hrnečku.', zdroje: [Z.nhsDrinks] },
    ],
    odkazy: [
      { label: 'Kravské mléko od 1 roku', href: '/mleka/kravske-mleko-od-1-roku/' },
      { label: 'Zoubky a krmení', href: '/krmeni/zoubky-a-krmeni/' },
    ],
  },
];
