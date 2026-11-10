/**
 * Tisknutelné přehledy – /tisk/<slug>/ (stránka s tiskovými styly) + PDF v public/tisk/<slug>.pdf.
 * Obsah jen z ověřených článků webu (pole `clanek`); při změně článku upravit i přehled a vygenerovat PDF znovu.
 */
export interface TiskZdroj { title: string; publisher: string; url: string }
export interface TiskBlok {
  title: string;
  /** číslovaný postup */
  steps?: string[];
  /** odrážky */
  items?: string[];
  /** tabulka: první řádek = hlavička */
  table?: string[][];
  note?: string;
}
export interface TiskPrehled {
  slug: string;
  title: string;
  description: string;
  lead: string;
  /** poznámka WHO ke kojení u přehledů o umělém mléce */
  who?: boolean;
  bloky: TiskBlok[];
  clanek: { label: string; href: string };
  zdroje: TiskZdroj[];
}

const WHO2007: TiskZdroj = { title: 'Safe preparation, storage and handling of powdered infant formula: guidelines (2007)', publisher: 'WHO a FAO', url: 'https://www.who.int/publications/i/item/9789241595414' };
const CDC_FORMULA: TiskZdroj = { title: 'Infant Formula Preparation and Storage', publisher: 'CDC', url: 'https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/preparation-and-storage.html' };

export const prehledy: TiskPrehled[] = [
  {
    slug: 'priprava-umeleho-mleka',
    title: 'Příprava umělého mléka krok za krokem',
    description: 'Tisknutelný přehled: bezpečná příprava sušeného kojeneckého mléka v 9 krocích podle WHO a NHS. Na lednici nebo do kuchyně.',
    lead: 'Sušené kojenecké mléko není sterilní. Proto se připravuje vodou o teplotě alespoň 70 °C.',
    who: true,
    bloky: [
      {
        title: 'Postup',
        steps: [
          'Převařte alespoň 1 litr čerstvé vody ze studeného kohoutku. Nepoužívejte vodu, která už jednou převařená byla.',
          'Nechte vodu stát nejvýš 30 minut, aby měla stále alespoň 70 °C.',
          'Očistěte pracovní plochu a důkladně si umyjte ruce.',
          'Připravte čistou sterilizovanou lahev. Savičku a víčko nepokládejte na linku.',
          'Nejdřív nalijte do lahve přesné množství vody podle návodu na balení.',
          'Pak přidejte prášek. Odměrku naberte volně a zarovnejte. Použijte přesně tolik odměrek, kolik uvádí návod.',
          'Lahev zavřete a protřepejte, dokud se prášek nerozpustí.',
          'Zchlaďte spodní polovinu lahve pod tekoucí studenou vodou.',
          'Teplotu ověřte kápnutím na vnitřní stranu zápěstí. Mléko má být vlažné, ne horké.',
        ],
      },
      {
        title: 'Na co nezapomenout',
        items: [
          'Mléko připravujte vždy na jedno krmení.',
          'Co miminko nedopije, vylijte. Zbytky se nepřidávají k nové dávce.',
          'Připravené mléko spotřebujte do 2 hodin.',
          'Nikdy neohřívejte v mikrovlnce.',
          'Množství vody a prášku se u jednotlivých mlék liší. Vždy se řiďte návodem na balení.',
        ],
      },
    ],
    clanek: { label: 'Jak připravit umělé mléko', href: '/mleka/priprava-umeleho-mleka/' },
    zdroje: [WHO2007, { title: 'How to make up a feed', publisher: 'NHS – Start for Life', url: 'https://www.nhs.uk/best-start-in-life/baby/feeding-your-baby/bottle-feeding/how-to-make-up-a-feed/' }, CDC_FORMULA],
  },
  {
    slug: 'jak-dlouho-vydrzi-mleko',
    title: 'Jak dlouho vydrží mléko: umělé i odstříkané',
    description: 'Tisknutelný přehled lhůt: jak dlouho vydrží připravené umělé mléko a odstříkané mateřské mléko v pokoji, lednici, mrazáku a chladicí tašce.',
    lead: 'Přehled lhůt podle WHO, CDC a NHS. Kde se instituce liší, uvádíme obě lhůty.',
    who: true,
    bloky: [
      {
        title: 'Umělé mléko',
        table: [
          ['Situace', 'Jak dlouho'],
          ['Připravené, při pokojové teplotě', 'do 2 hodin od přípravy'],
          ['Od chvíle, kdy miminko začne pít', 'dokončit do 1 hodiny, zbytek vylít'],
          ['Připravené dopředu, v lednici do 5 °C', 'nejdéle 24 hodin'],
          ['Vychlazené, v chladicí tašce', 'do 2 hodin'],
          ['Ohřívání mléka z lednice', 'nejdéle 15 minut, ne v mikrovlnce'],
          ['Otevřené balení sušeného mléka', 'obvykle do 1 měsíce – podle údaje na obalu'],
        ],
        note: 'Lhůty se u jednotlivých výrobků mohou lišit. Vždy se řiďte návodem na balení.',
      },
      {
        title: 'Odstříkané mateřské mléko',
        table: [
          ['Kde', 'Jak dlouho'],
          ['Pokojová teplota do 25 °C', 'do 4 hodin (CDC)'],
          ['Lednice', 'až 8 dní při 4 °C a méně, při vyšší nebo nejisté teplotě do 3 dnů (NHS); do 4 dnů (CDC)'],
          ['Mrazicí přihrádka lednice', '2 týdny (NHS)'],
          ['Mrazák −18 °C a méně', 'až 6 měsíců (NHS)'],
          ['Chladicí taška s ledovými vložkami', 'do 24 hodin (NHS)'],
          ['Rozmražené v lednici', 'do 24 hodin od úplného rozmrazení, znovu nezmrazovat (CDC)'],
          ['Od chvíle, kdy miminko začne pít', 'do 1 hodiny, zbytek vylít (NHS)'],
        ],
        note: 'Pokud chcete mít jistotu, držte se kratší lhůty. Mléko nikdy neohřívejte v mikrovlnce.',
      },
    ],
    clanek: { label: 'Jak dlouho vydrží umělé mléko', href: '/mleka/jak-dlouho-vydrzi-umele-mleko/' },
    zdroje: [
      WHO2007, CDC_FORMULA,
      { title: 'Expressing and storing breast milk', publisher: 'NHS', url: 'https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/expressing-breast-milk/' },
      { title: 'Breast Milk Storage and Preparation', publisher: 'CDC', url: 'https://www.cdc.gov/breastfeeding/breast-milk-preparation-and-storage/handling-breastmilk.html' },
    ],
  },
  {
    slug: 'co-nedavat-miminku',
    title: 'Co nedávat miminku do 1 roku',
    description: 'Tisknutelný přehled potravin, které do jídelníčku miminka nepatří: sůl, cukr, med, celé ořechy, rýžové nápoje a další. Podle NHS a ESPGHAN.',
    lead: 'Potraviny a nápoje, kterým se u miminek a malých dětí vyhnout. Přehled podle NHS a ESPGHAN.',
    bloky: [
      {
        title: 'Do jídelníčku nepatří',
        table: [
          ['Potravina', 'Proč a do kdy'],
          ['Sůl', 'Nesolte jídlo ani vodu na vaření. Vynechte bujóny a omáčky z pytlíku.'],
          ['Cukr', 'Nepřidávejte cukr, sirupy ani sladké nápoje.'],
          ['Med', 'Do 1 roku ne – může způsobit kojenecký botulismus.'],
          ['Celé ořechy a arašídy', 'Do 5 let ne – hrozí vdechnutí. Mleté ořechy a ořechová másla jsou v pořádku.'],
          ['Rýžové nápoje', 'Do 5 let ne – mohou obsahovat příliš arsenu.'],
          ['Nepasterované a plísňové sýry', 'Riziko listerie. V uvařeném jídle jsou bezpečné.'],
          ['Syrové mořské plody', 'Mušle, ústřice a podobné nedávejte.'],
          ['Žralok, mečoun a marlín', 'Obsahují rtuť.'],
          ['Nedovařená vejce', 'Vejce vařte, dokud bílek i žloutek neztuhnou.'],
          ['Tvrdé kousky', 'Celá syrová mrkev nebo jablko, pecky a kůstky – hrozí dušení.'],
        ],
      },
      {
        title: 'Pití',
        items: [
          'Do lahve patří jen mateřské mléko, umělé mléko nebo voda.',
          'Kravské mléko jako hlavní nápoj až od 1 roku. Do jídla ho lze přidat už kolem 6 měsíců.',
          'Svačiny miminko do 1 roku nepotřebuje. Když má mezi jídly hlad, nabídněte mu mléko.',
        ],
      },
    ],
    clanek: { label: 'První příkrmy krok za krokem', href: '/prikrmy/prvni-prikrmy/' },
    zdroje: [
      { title: 'Foods to avoid giving babies and young children', publisher: 'NHS', url: 'https://www.nhs.uk/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/' },
      { title: "Your baby's first solid foods", publisher: 'NHS', url: 'https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/' },
      { title: 'Complementary Feeding: A Position Paper by the ESPGHAN Committee on Nutrition (2017)', publisher: 'ESPGHAN', url: 'https://www.espghan.org/dam/jcr%3A3d960daa-e2f3-499f-9df9-2da682976cec/2017%20Complementary_Feeding__A_Position_Paper_by_the.21.pdf' },
      { title: 'Drinks and cups for babies and young children', publisher: 'NHS', url: 'https://www.nhs.uk/baby/weaning-and-feeding/drinks-and-cups-for-babies-and-young-children/' },
    ],
  },
];
