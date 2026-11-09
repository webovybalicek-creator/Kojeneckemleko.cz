/**
 * Slovníček pojmů – /slovnicek/#<id>. Každá definice musí stát na zdrojích níže (čísla = pořadí v `glossarySources`).
 * Ověřeno 7. 11. 2026 (hesla DHA, A2, kolika, dyschezie, laktózová intolerance, BLW, anafylaxe 9. 11. 2026), viz claude/zdroje-registr.md v projektu.
 */

export interface GlossarySource { title: string; publisher: string; url: string; year?: number; kind?: 'studie' | 'doporuceni' | 'legislativa'; doi?: string; authors?: { name: string; url?: string; role?: string }[] }

export const glossarySources: GlossarySource[] = [
  { title: 'Types of formula', publisher: 'NHS', url: 'https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/types-of-formula/', year: 2024, kind: 'doporuceni' },
  { title: 'Types of infant formula', publisher: 'NHS 111 Wales', url: 'https://111.wales.nhs.uk/livewell/pregnancy/bottletypesinfantformula/', year: 2023, kind: 'doporuceni' },
  {
    title: 'Formulas containing hydrolysed protein for prevention of allergic disease in infants',
    publisher: 'Cochrane Database of Systematic Reviews, CD003664',
    url: 'https://www.cochrane.org/evidence/CD003664_formulas-containing-hydrolysed-protein-prevention-allergic-disease-infants',
    year: 2018, kind: 'studie', doi: '10.1002/14651858.CD003664.pub6',
    authors: [{ name: 'David A. Osborn' }, { name: 'John K. H. Sinn' }, { name: 'Lisa J. Jones' }],
  },
  { title: 'Safe preparation, storage and handling of powdered infant formula: guidelines', publisher: 'WHO a FAO', url: 'https://www.who.int/publications/i/item/9789241595414', year: 2007, kind: 'doporuceni' },
  { title: 'Stahovaná kojenecká výživa: doporučený postup pro rodiče', publisher: 'Ministerstvo zdravotnictví ČR', url: 'https://mzd.gov.cz/?p=227996', year: 2026, kind: 'doporuceni' },
  { title: 'Stahovaná kojenecká mléka: jak ověřit balení a kdy kontaktovat lékaře', publisher: 'Ministerstvo zdravotnictví ČR', url: 'https://mzd.gov.cz/?p=227989', year: 2026, kind: 'doporuceni' },
  { title: 'How to use formula', publisher: 'NHS – Start for Life', url: 'https://www.nhs.uk/best-start-in-life/baby/feeding-your-baby/bottle-feeding/how-to-make-up-a-feed/how-to-use-formula/', year: 2025, kind: 'doporuceni' },
  {
    title: "An ESPGHAN Position Paper on the Diagnosis, Management, and Prevention of Cow's Milk Allergy",
    publisher: 'Journal of Pediatric Gastroenterology and Nutrition 78(2): 386–413',
    url: 'https://air.unimi.it/handle/2434/1027468',
    year: 2024, kind: 'studie', doi: '10.1097/MPG.0000000000003897',
    authors: [{ name: 'Yvan Vandenplas' }, { name: 'Ilse Broekaert' }, { name: 'Magnus Domellöf' }, { name: 'a další' }],
  },
  { title: 'Nařízení Komise v přenesené pravomoci (EU) 2016/127', publisher: 'Úřední věstník EU (EUR-Lex)', url: 'https://eur-lex.europa.eu/eli/reg_del/2016/127/2024-10-11/eng/pdf', year: 2016, kind: 'legislativa' },
  {
    title: 'A2 Milk and BCM-7 Peptide as Emerging Parameters of Milk Quality', publisher: 'Frontiers in Nutrition 9: 842375',
    url: 'https://www.frontiersin.org/articles/10.3389/fnut.2022.842375/full', year: 2022, kind: 'studie', doi: '10.3389/fnut.2022.842375',
    authors: [{ name: 'Marzia Giribaldi' }, { name: 'Cristina Lamberti' }, { name: 'a další' }],
  },
  {
    title: 'Milk A1 β-casein and health-related outcomes in humans: a systematic review', publisher: 'Nutrition Reviews',
    url: 'https://doi.org/10.1093/nutrit/nuy063', year: 2019, kind: 'studie', doi: '10.1093/nutrit/nuy063',
    authors: [{ name: 'Daniela Kuellenberg de Gaudry' }, { name: 'Szimonetta Lohner' }, { name: 'Christine Schmucker' }, { name: 'a další' }],
  },
  {
    title: 'The New Rome IV Criteria for Functional Gastrointestinal Disorders in Infants and Toddlers', publisher: 'Pediatric Gastroenterology, Hepatology & Nutrition 20(1): 1–13',
    url: 'https://koreascience.kr/article/JAKO201713647762132.pdf', year: 2017, kind: 'studie', doi: '10.5223/pghn.2017.20.1.1',
    authors: [{ name: 'Judith Zeevenhooven' }, { name: 'Ilan J. N. Koppen' }, { name: 'Marc A. Benninga' }],
  },
  { title: "Your baby's first solid foods", publisher: 'NHS', url: 'https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/', year: 2026, kind: 'doporuceni' },
  { title: 'Food allergies in babies and young children', publisher: 'NHS', url: 'https://www.nhs.uk/baby/weaning-and-feeding/food-allergies-in-babies-and-young-children/', year: 2024, kind: 'doporuceni' },
  { title: 'Lactose intolerance (new parent and baby)', publisher: 'NHS – Healthier Together', url: 'https://www.healthiertogether.nhs.uk/new-parent-and-baby/lactose-intolerance', kind: 'doporuceni' },
  { title: 'Colic – breastfeeding challenges', publisher: 'NHS – Start for Life', url: 'https://www.nhs.uk/best-start-in-life/baby/feeding-your-baby/breastfeeding/breastfeeding-challenges/colic/', year: 2026, kind: 'doporuceni' },
];

export type GlossaryGroup = 'typy' | 'specialni' | 'slozeni' | 'krmeni' | 'bezpecnost';

export const glossaryGroups: Record<GlossaryGroup, string> = {
  typy: 'Typy mlék podle věku',
  specialni: 'Speciální mléka',
  slozeni: 'Složení mléka',
  krmeni: 'Krmení, příkrmy a obtíže',
  bezpecnost: 'Bezpečnost a označení',
};

export interface GlossaryTerm {
  id: string;
  term: string;
  aka?: string;
  group: GlossaryGroup;
  /** Jedna věta – použije se i v JSON-LD */
  short: string;
  /** Odstavce; [n] = odkaz na zdroj n */
  body: string[];
  /** Upozornění „po poradě s lékařem“ apod. */
  note?: string;
  link?: { label: string; href: string };
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'pocatecni', term: 'Počáteční mléko', aka: 'mléko 1, first infant formula', group: 'typy',
    short: 'První kojenecké mléko, vhodné od narození a jako hlavní nápoj po celý první rok.',
    body: [
      'Mléko vhodné od narození, obvykle na bázi syrovátkové bílkoviny. Pokud lékař nedoporučí jinak, je to jediné mléko, které miminko potřebuje – a může ho pít celý první rok i po zavedení příkrmů [1][2].',
      'Podle NHS nemá přechod na jinou značku prokázaný přínos ani škodu [1].',
    ],
    link: { label: 'Kolik mléka dát miminku', href: '/mleka/kolik-mleka-podle-veku/' },
  },
  {
    id: 'pokracovaci', term: 'Pokračovací mléko', aka: 'mléko 2, follow-on formula', group: 'typy',
    short: 'Mléko určené od 6 měsíců; nikdy se nepodává mladším miminkům.',
    body: [
      'Určené od 6 měsíců – miminkům mladším 6 měsíců se nesmí podávat. Podle NHS přechod na pokračovací mléko v 6 měsících nemá žádný prokázaný přínos; počáteční mléko může dítě pít až do 1 roku [1].',
      'Obaly počátečních a pokračovacích mlék vypadají podobně, proto je dobré je pozorně číst [2].',
    ],
    link: { label: 'Počáteční, pokračovací, nebo batolecí mléko?', href: '/mleka/pocatecni-vs-pokracovaci/' },
  },
  {
    id: 'batoleci', term: 'Batolecí mléko', aka: 'mléko 3 a 4, growing-up milk', group: 'typy',
    short: 'Mléko pro děti od 1 roku; podle NHS ho děti nepotřebují.',
    body: [
      'Prodává se pro děti od 1 roku. Podle NHS ho děti ve věku 1–5 let nepotřebují a neexistují důkazy o jeho výživovém přínosu oproti běžnému mléku [1][2].',
      'Od 1 roku může být hlavním nápojem plnotučné pasterizované kravské mléko [1][7].',
    ],
    link: { label: 'Počáteční, pokračovací, nebo batolecí mléko?', href: '/mleka/pocatecni-vs-pokracovaci/' },
  },
  {
    id: 'ha', term: 'HA mléko', aka: 'hypoalergenní, s hydrolyzovanou bílkovinou', group: 'specialni',
    short: 'Mléko se štěpenou (hydrolyzovanou) bílkovinou kravského mléka; důkazy o prevenci alergie jsou slabé.',
    body: [
      'Označení HA (hypoalergenní) nesou mléka, ve kterých je bílkovina kravského mléka rozštěpená na menší části (hydrolyzovaná) [1].',
      'Cochrane přehled 16 studií nenašel důkaz, že by dlouhodobé krmení hydrolyzovaným mlékem místo běžného snižovalo výskyt alergií, a žádný důkaz, že by bylo lepší než kojení. Kvalita důkazů byla velmi nízká [3].',
      'Mléko s jen částečně štěpenou bílkovinou není vhodné pro děti s diagnostikovanou alergií na bílkovinu kravského mléka – pro ty se předepisuje mléko s plně štěpenou bílkovinou [1][2].',
    ],
    note: 'Před nasazením se poraďte s pediatrem.',
    link: { label: 'HA mléko: pomáhá předcházet alergii?', href: '/mleka/ha-mleko/' },
  },
  {
    id: 'extenzivne-hydrolyzovane', term: 'Extenzivně hydrolyzované mléko', aka: 'plně štěpená bílkovina, na předpis', group: 'specialni',
    short: 'Mléko s plně štěpenou bílkovinou, které lékař předepisuje při alergii na bílkovinu kravského mléka.',
    body: [
      'Pokud má miminko diagnostikovanou alergii na bílkovinu kravského mléka, lékař předepíše mléko s plně štěpenými (extenzivně hydrolyzovanými) bílkovinami. Používá se jen pod lékařským dohledem [1][2].',
    ],
    note: 'Pouze na doporučení lékaře.',
  },
  {
    id: 'ar', term: 'AR mléko', aka: 'antirefluxní, „staydown“', group: 'specialni',
    short: 'Zahuštěné mléko proti refluxu a ublinkávání, jen pod lékařským dohledem.',
    body: [
      'Mléko je zahuštěné, aby se méně vracelo z žaludku – je určené miminkům s refluxem. NHS ho doporučuje jen na radu zdravotníka [1][2].',
      'Příprava se může lišit od běžného mléka. Protože sušené mléko není sterilní a nižší teplota vody nezničí případné bakterie, je třeba postupovat opatrně podle návodu [1].',
    ],
    note: 'Pouze na doporučení lékaře.',
    link: { label: 'AR mléko: kdy pomáhá zahuštěné mléko', href: '/mleka/ar-mleko/' },
  },
  {
    id: 'comfort', term: 'Comfort mléko', aka: 'mléko „pro bříško“', group: 'specialni',
    short: 'Mléko s částečně štěpenou bílkovinou prodávané proti kolikám a zácpě; důkazy chybí.',
    body: [
      'Obsahuje částečně štěpené bílkoviny kravského mléka, které mají usnadnit trávení a pomoci při kolikách nebo zácpě. Podle NHS pro tyto účinky neexistují důkazy [1].',
      'Není vhodné pro děti s alergií na bílkovinu kravského mléka [1].',
    ],
    note: 'Před změnou mléka se poraďte s pediatrem.',
  },
  {
    id: 'sytejsi', term: 'Mléko pro hladovější miminka', aka: 's vyšším podílem kaseinu', group: 'specialni',
    short: 'Mléko s více kaseinem; podle NHS nejsou důkazy, že by miminka déle spala.',
    body: [
      'Obsahuje víc kaseinu než syrovátky. Kasein se hůř tráví a podle NHS neexistují důkazy, že by se po něm miminka lépe uklidnila nebo déle spala [1].',
    ],
  },
  {
    id: 'bez-laktozy', term: 'Mléko bez laktózy', group: 'specialni',
    short: 'Mléko pro miminka s nesnášenlivostí laktózy, která je u kojenců vzácná.',
    body: [
      'Určené pro miminka s nesnášenlivostí laktózy (mléčného cukru), která je u kojenců vzácná. Používá se jen pod lékařským dohledem [1][2].',
    ],
    note: 'Pouze na doporučení lékaře.',
  },
  {
    id: 'kozi', term: 'Kozí mléko', aka: 'kojenecké mléko z kozího mléka', group: 'specialni',
    short: 'Vyrábí se podle stejných norem jako kravské; není méně alergenní.',
    body: [
      'Kojenecké mléko z kozího mléka se vyrábí podle stejných výživových norem jako mléko z kravského [1].',
      'Podle NHS nevyvolává alergii méně často a není vhodné pro děti s alergií na bílkovinu kravského mléka, protože bílkoviny obou mlék jsou si velmi podobné [1].',
    ],
  },
  {
    id: 'sojove', term: 'Sójové mléko', group: 'specialni',
    short: 'Mléko ze sóji, až od 6 měsíců a jen na doporučení lékaře.',
    body: [
      'Vyrábí se ze sóji a občas se používá jako alternativa při alergii na kravské mléko – až od 6 měsíců a jen na doporučení lékaře. NHS upozorňuje na obsah fytoestrogenů a riziko pro zuby [1][2].',
    ],
    note: 'Pouze na doporučení lékaře.',
  },
  {
    id: 'abkm', term: 'ABKM', aka: 'alergie na bílkovinu kravského mléka', group: 'specialni',
    short: 'Alergie na bílkovinu kravského mléka; řeší ji lékař, obvykle mlékem s plně štěpenou bílkovinou.',
    body: [
      'Zkratka pro alergii na bílkovinu kravského mléka. Při potvrzené diagnóze lékař předepisuje mléko s plně štěpenou bílkovinou [1][2]. Mléka comfort, HA s částečně štěpenou bílkovinou ani kozí mléko pro tyto děti vhodná nejsou [1][2].',
    ],
    note: 'Diagnózu a výběr mléka vždy určuje lékař.',
    link: { label: 'ABKM u kojence: příznaky a co dělat', href: '/krmeni/alergie-na-bilkovinu-kravskeho-mleka/' },
  },
  {
    id: 'aminokyselinove', term: 'Aminokyselinové mléko', aka: 'AAF, amino acid formula', group: 'specialni',
    short: 'Mléko, v němž je bílkovina zcela nahrazena aminokyselinami; pro těžké případy ABKM.',
    body: [
      'Neobsahuje bílkovinu kravského mléka – je v něm nahrazena jednotlivými aminokyselinami. Podle ESPGHAN je určené pro těžké případy alergie na bílkovinu kravského mléka, například po anafylaktické reakci, při neprospívání nebo když příznaky trvají i na extenzivně hydrolyzovaném mléce [8].',
    ],
    note: 'Pouze na doporučení lékaře.',
    link: { label: 'ABKM u kojence: příznaky a co dělat', href: '/krmeni/alergie-na-bilkovinu-kravskeho-mleka/' },
  },
  {
    id: 'dha', term: 'DHA', aka: 'kyselina dokosahexaenová, omega-3', group: 'slozeni',
    short: 'Omega-3 mastná kyselina, kterou musí v EU obsahovat každé počáteční i pokračovací mléko.',
    body: [
      'Dokosahexaenová kyselina (DHA) patří mezi omega-3 mastné kyseliny. Evropské nařízení 2016/127 ji stanovuje jako povinnou složku počátečních i pokračovacích mlék, v množství 20–50 mg na 100 kcal [9].',
    ],
    link: { label: 'Jak vybrat kojenecké mléko', href: '/mleka/jak-vybrat-kojenecke-mleko/' },
  },
  {
    id: 'a2', term: 'A2 mléko', aka: 'beta-kasein A2', group: 'slozeni',
    short: 'Kravské mléko, které obsahuje jen variantu A2 bílkoviny beta-kaseinu.',
    body: [
      'Beta-kasein v kravském mléce se vyskytuje ve dvou hlavních variantách, A1 a A2. A2 mléko pochází od krav, jejichž mléko obsahuje jen variantu A2 [10].',
      'Systematický přehled našel středně jisté důkazy jen pro to, že A1 může mít nepříznivější vliv na trávení než A2; pro ostatní zdravotní účinky je jistota nízká [11]. A2 mléko je stále kravské mléko, proto nepomáhá při alergii na bílkovinu kravského mléka [10].',
    ],
    link: { label: 'A2 kojenecké mléko', href: '/mleka/a2-mleko/' },
  },
  {
    id: 'kolika', term: 'Kolika', aka: 'kojenecká kolika, pravidlo 3-3-3', group: 'krmeni',
    short: 'Neutišitelný pláč jinak zdravého miminka 3 a více hodin denně, nejméně 3 dny v týdnu, alespoň 3 týdny.',
    body: [
      'Koliky má asi 1 z 5 miminek. Obvykle začínají v prvních týdnech a zlepší se kolem 3.–4. měsíce. Příčina není známá [16].',
    ],
    link: { label: 'Koliky u miminka', href: '/krmeni/koliky/' },
  },
  {
    id: 'dyschezie', term: 'Kojenecká dyschezie', group: 'krmeni',
    short: 'Miminko do 9 měsíců dlouho tlačí a pláče, než se vykaká měkká stolice – nejde o zácpu.',
    body: [
      'Podle kritérií Rome IV jde o miminko mladší 9 měsíců, které alespoň 10 minut tlačí a pláče před vyprázdněním měkké stolice. Miminko se teprve učí koordinovat svaly. Potíže odezní samy, léky ani dráždění konečníku nejsou potřeba [12].',
    ],
    link: { label: 'Zácpa u kojence', href: '/krmeni/zacpa-u-kojence/' },
  },
  {
    id: 'laktozova-intolerance', term: 'Laktózová intolerance', group: 'krmeni',
    short: 'Tělo nedokáže dobře strávit mléčný cukr laktózu. U miminek je vzácná a obvykle přechodná po střevní infekci.',
    body: [
      'Trvalá forma se obvykle neprojevuje před 2. rokem života. U miminek je častější přechodná forma po poškození střevní sliznice, například po střevní infekci. Kojení se při ní nepřerušuje [15].',
      'Nejde o alergii – mléka bez laktózy obvykle obsahují mléčnou bílkovinu, proto se při alergii na kravské mléko nehodí [15].',
    ],
    link: { label: 'Mléko bez laktózy', href: '/mleka/mleko-bez-laktozy/' },
  },
  {
    id: 'blw', term: 'BLW', aka: 'baby-led weaning, příkrmy vedené miminkem', group: 'krmeni',
    short: 'Způsob zavádění příkrmů, kdy miminko od začátku jí samo kousky jídla místo kaší ze lžičky.',
    body: [
      'Podle NHS je BLW jednou z možností, jak začít s příkrmy. Miminko si samo bere kousky měkkého jídla velikosti prstu. Riziko dušení podle NHS není vyšší než při krmení lžičkou [13].',
    ],
    link: { label: 'BLW: příkrmy bez kaší', href: '/prikrmy/blw/' },
  },
  {
    id: 'anafylaxe', term: 'Anafylaxe', aka: 'anafylaktická reakce', group: 'krmeni',
    short: 'Závažná, život ohrožující alergická reakce – vyžaduje okamžitou pomoc (155).',
    body: [
      'Mezi příznaky patří dechové potíže, otok hrdla nebo jazyka a vystouplá svědivá vyrážka. Jde o urgentní stav [14].',
    ],
    note: 'Při podezření na anafylaxi okamžitě volejte 155.',
    link: { label: 'Zavádění alergenů', href: '/prikrmy/alergeny/' },
  },
  {
    id: 'tekute-mleko', term: 'Tekuté mléko připravené k podání', aka: 'ready-to-feed', group: 'bezpecnost',
    short: 'Hotové tekuté mléko, které je na rozdíl od sušeného sterilní.',
    body: [
      'Na rozdíl od sušeného mléka je sterilní, takže z něj nehrozí infekce. WHO ho doporučuje zejména pro nejohroženější miminka, pokud je dostupné [4].',
    ],
    link: { label: 'Jak připravit umělé mléko', href: '/mleka/priprava-umeleho-mleka/' },
  },
  {
    id: 'cronobacter', term: 'Cronobacter', aka: 'dříve Enterobacter sakazakii', group: 'bezpecnost',
    short: 'Bakterie, která se může vyskytnout v sušeném mléce; proto se připravuje vodou alespoň 70 °C.',
    body: [
      'Bakterie, která se může vyskytnout v sušeném kojeneckém mléce, protože to není sterilní. Nejohroženější jsou novorozenci, miminka do 2 měsíců a nedonošené děti. Riziko výrazně snižuje příprava vodou o teplotě alespoň 70 °C [4].',
    ],
    link: { label: 'Jak připravit umělé mléko', href: '/mleka/priprava-umeleho-mleka/' },
  },
  {
    id: 'cereulid', term: 'Cereulid', group: 'bezpecnost',
    short: 'Toxin bakterie Bacillus cereus, kvůli kterému byla v roce 2026 stažena některá mléka.',
    body: [
      'Toxin, který produkují některé kmeny bakterie Bacillus cereus. Příznaky – hlavně nevolnost a zvracení – se objevují obvykle do 8 hodin; u miminek je hlavním rizikem dehydratace [5].',
    ],
    link: { label: 'Stažená kojenecká mléka 2026', href: '/mleka/stazena-kojenecka-mleka/' },
  },
  {
    id: 'dmt', term: 'DMT', aka: 'datum minimální trvanlivosti', group: 'bezpecnost',
    short: 'Datum na obalu, podle kterého se mimo jiné ověřuje, zda se výrobku týká stažení.',
    body: [
      'Datum minimální trvanlivosti uvedené na obalu. Spolu s názvem, velikostí balení a číslem šarže podle něj ověříte, zda se vašeho mléka týká stažení z trhu [6].',
    ],
    link: { label: 'Stažená kojenecká mléka 2026', href: '/mleka/stazena-kojenecka-mleka/' },
  },
];

/** Mapování štítků (HA, AR, Comfort, Kozí, typy v tabulce) na hesla */
export const tagToTerm: Record<string, string> = {
  HA: 'ha', AR: 'ar', Comfort: 'comfort', comfort: 'comfort', Kozí: 'kozi', kozi: 'kozi',
  'bez-laktozy': 'bez-laktozy', hydrolyzovane: 'extenzivne-hydrolyzovane', sojove: 'sojove',
};
export const termHref = (id: string) => `/slovnicek/#${id}`;
