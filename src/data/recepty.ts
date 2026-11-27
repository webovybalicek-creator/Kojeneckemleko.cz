/**
 * Recepty na příkrmy – článek /prikrmy/recepty-na-prikrmy/ (komponenta RecipeCard.astro).
 * Vlastní jednoduché recepty z potravin, které NHS uvádí pro daný věk. Bez soli, cukru a medu.
 * `cite` = čísla zdrojů článku (pořadí podle `sources` v recepty-na-prikrmy.mdx), u kterých se tip opírá o zdroj.
 */
export interface Recept {
  id: string;
  nazev: string;
  vek: '6m' | '7m' | '10m';
  popis: string;
  porce: string;
  minuty: number;
  suroviny: string[];
  postup: string[];
  tip?: { text: string; cite: number[] };
  /** Číslo zdroje s receptem NHS, podle kterého je recept upravený */
  vzor?: number;
}

export const vekLabel = { '6m': 'od 6 měsíců', '7m': 'od 7 měsíců', '10m': 'od 10 měsíců' } as const;

export const recepty: Recept[] = [
  {
    id: 'brokolice-a-kvetak',
    nazev: 'Brokolice a květák na páře',
    vek: '6m',
    popis: 'Jedna z prvních zelenin: rozmačkaná na lžičku nebo jako měkké růžičky do ruky.',
    porce: '2–3 malé porce',
    minuty: 15,
    suroviny: ['3–4 růžičky brokolice', '3–4 růžičky květáku', 'trochu mateřského nebo počátečního mléka (podle potřeby)'],
    postup: [
      'Zeleninu omyjte a rozdělte na růžičky s kouskem stonku, který miminku poslouží jako držátko.',
      'Vařte na páře 8–10 minut, až růžička jde snadno rozmáčknout mezi prsty.',
      'Část rozmačkejte vidličkou, případně zřeďte trochou mléka. Zbytek nechte vcelku jako jídlo do ruky.',
      'Nechte úplně vychladnout a teprve pak nabídněte.',
    ],
    tip: { text: 'NHS doporučuje začínat zeleninou, která není moc sladká – třeba brokolicí, květákem nebo špenátem.', cite: [1] },
  },
  {
    id: 'mrkev-s-bramborem',
    nazev: 'Mrkev s bramborem',
    vek: '6m',
    popis: 'Jemná kaše ze dvou běžných surovin, kterou můžete postupně nechávat hrubší.',
    porce: '4 malé porce',
    minuty: 25,
    suroviny: ['1 menší brambora', '1 mrkev', '2–3 lžíce mateřského nebo počátečního mléka'],
    postup: [
      'Bramboru a mrkev oloupejte a nakrájejte na kostičky.',
      'Vařte ve vodě bez soli asi 15–20 minut doměkka.',
      'Sceďte, přidejte mléko a rozmačkejte nebo rozmixujte. Pro starší miminko nechte drobné měkké kousky.',
      'Před podáním nechte vychladnout.',
    ],
    tip: { text: 'Sůl nepřidávejte do jídla ani do vody na vaření – ledvinám miminka neprospívá.', cite: [4] },
  },
  {
    id: 'ovesna-kase-s-hruskou',
    nazev: 'Ovesná kaše s hruškou',
    vek: '6m',
    popis: 'Snídaně z ovesných vloček a měkké hrušky, bez cukru.',
    porce: '1 porce',
    minuty: 10,
    suroviny: ['2 lžíce jemných ovesných vloček', 'asi 100 ml vody', '1–2 lžíce mateřského nebo počátečního mléka', '¼ zralé hrušky'],
    postup: [
      'Vločky povařte ve vodě 3–5 minut, až zhoustnou.',
      'Hrušku oloupejte a zbavte jádřince. Tvrdší hrušku nakrájejte a krátce podušte, zralou stačí nastrouhat nebo rozmačkat.',
      'Do vychladlé kaše vmíchejte mléko a hrušku.',
    ],
    tip: { text: 'Obilné kaše můžete míchat s mateřským nebo počátečním mlékem. Tvrdší ovoce je potřeba podusit, aby změklo.', cite: [1] },
  },
  {
    id: 'brambory-s-porkem',
    nazev: 'Brambory s pórkem',
    vek: '6m',
    popis: 'Krémová bramborová kaše s pórkem podle vzoru receptu NHS.',
    vzor: 5,
    porce: 'asi 6–8 malých porcí',
    minuty: 25,
    suroviny: ['1 střední brambora', '½ pórku', '2 lžíce plnotučného mléka nebo mléka, které miminko běžně pije'],
    postup: [
      'Bramboru oloupejte, nakrájejte a vařte ve vodě bez soli asi 10 minut.',
      'Přidejte nadrobno nakrájený pórek a vařte dalších 5 minut, až je všechno měkké.',
      'Sceďte, přidejte mléko a rozmačkejte dohladka. Když je kaše hustá, přilijte ještě trochu mléka.',
      'Nechte vychladnout. Zbytek můžete zamrazit po porcích.',
    ],
    tip: { text: 'Kravské mléko můžete od 6 měsíců použít při vaření; jako nápoj se hodí až od 1 roku.', cite: [1] },
  },
  {
    id: 'michana-vajicka',
    nazev: 'Míchaná vajíčka',
    vek: '6m',
    popis: 'Rychlé jídlo s vejcem, které patří mezi alergeny – zavádějte ho samostatně.',
    porce: '1–2 porce',
    minuty: 8,
    suroviny: ['1 menší vejce', '1 lžíce plnotučného mléka', 'kousek másla nebo trochu oleje'],
    postup: [
      'Vejce rozšlehejte s mlékem.',
      'Na nepřilnavé pánvi rozpusťte máslo, vlijte vejce a na mírném ohni míchejte.',
      'Smažte, dokud nejsou bílek i žloutek úplně ztuhlé – nic nesmí zůstat tekuté.',
      'Nechte vychladnout a nabídněte na lžičce nebo po kouscích do ruky.',
    ],
    tip: { text: 'Vejce bez britského označení Lion má NHS vařit tak, aby ztuhl bílek i žloutek. Vejce je alergen: zavádějte ho po jednom a v malém množství.', cite: [4, 1] },
  },
  {
    id: 'cocka-s-dyni',
    nazev: 'Červená čočka s dýní',
    vek: '7m',
    popis: 'Hustá čočková kaše se sladkou dýní – luštěniny jsou dobrý zdroj bílkovin.',
    porce: '4 porce',
    minuty: 25,
    suroviny: ['3 lžíce červené čočky', '150 g dýně (např. hokaido)', '½ malé cibule', '1 lžička oleje', 'asi 300 ml vody'],
    postup: [
      'Čočku propláchněte. Dýni a cibuli nakrájejte nadrobno.',
      'Cibuli krátce orestujte na oleji, přidejte dýni, čočku a vodu.',
      'Vařte bez soli asi 15–20 minut, až se čočka rozpadá. Podle potřeby přilijte vodu.',
      'Rozmačkejte – pro starší miminko nechte měkké kousky. Nechte vychladnout.',
    ],
    tip: { text: 'Luštěniny, maso, ryby a vejce patří podle NHS do jídelníčku od 6 měsíců jako zdroj bílkovin.', cite: [2] },
  },
  {
    id: 'testoviny-se-zeleninovou-omackou',
    nazev: 'Těstoviny se zeleninovou omáčkou',
    vek: '7m',
    popis: 'Rajčatová omáčka s brokolicí a čočkou podle vzoru receptu NHS, i pro zbytek rodiny.',
    vzor: 6,
    porce: '4 porce omáčky',
    minuty: 30,
    suroviny: ['½ malé cibule', '1 menší stroužek česneku', '1 růžička brokolice', '1 lžička oleje', '150 g krájených rajčat z konzervy bez přidané soli', 'špetka sušených bylinek', '200 ml vody', '2 lžíce červené čočky', '15 g drobných těstovin na porci'],
    postup: [
      'Cibuli, česnek a brokolici nakrájejte nadrobno. Cibuli a česnek podušte na oleji 3–4 minuty.',
      'Přidejte brokolici, rajčata, bylinky, vodu a čočku. Vařte bez pokličky 10–12 minut, podle potřeby přilijte vodu.',
      'Těstoviny uvařte bez soli doměkka.',
      'Porci těstovin smíchejte s omáčkou a rozmačkejte nebo krátce rozmixujte tak, aby zůstaly měkké kousky. Zbytek omáčky zamrazte po porcích.',
    ],
    tip: { text: 'Dospělí si mohou svou porci dosolit až na talíři. Miminko sůl ani bujon nepotřebuje.', cite: [4] },
  },
  {
    id: 'kure-s-mrkvi',
    nazev: 'Kuře s mrkví a bramborem',
    vek: '7m',
    popis: 'První maso v jednoduché kombinaci, rozmačkané nebo nadrobno nasekané.',
    porce: '4 porce',
    minuty: 30,
    suroviny: ['100 g kuřecích prsou', '1 mrkev', '1 menší brambora', 'voda'],
    postup: [
      'Maso nakrájejte na kostičky, mrkev a bramboru oloupejte a nakrájejte.',
      'Vše vařte ve vodě bez soli asi 20 minut, až je maso propečené skrz a zelenina měkká.',
      'Rozmačkejte nebo nasekejte nadrobno, případně přidejte trochu vody z vaření.',
      'Nechte vychladnout. Kousky masa nabízejte jen měkké a malé.',
    ],
    tip: { text: 'Bujon ani bujonové kostky nepoužívejte – bývají velmi slané.', cite: [4] },
  },
  {
    id: 'losos-s-hraskem',
    nazev: 'Losos s bramborem a hráškem',
    vek: '7m',
    popis: 'Ryba s bramborovou kaší a hráškem. Ryba je alergen – zavádějte ji samostatně.',
    porce: '3 porce',
    minuty: 25,
    suroviny: ['80 g filetu z lososa bez kůže', '1 brambora', '2 lžíce mraženého hrášku', '1–2 lžíce mateřského, počátečního nebo plnotučného mléka'],
    postup: [
      'Bramboru oloupejte, nakrájejte a vařte ve vodě bez soli asi 12 minut. Pak přidejte hrášek a vařte ještě 3–4 minuty.',
      'Lososa vařte na páře nebo v troubě, až se snadno rozpadá na lupínky.',
      'Rybu pečlivě rozeberte prsty a odstraňte všechny kosti.',
      'Bramboru s hráškem rozmačkejte s mlékem a vmíchejte rybu. Nechte vychladnout.',
    ],
    tip: { text: 'Rybu podávejte vždy bez kostí.', cite: [2] },
  },
  {
    id: 'bananove-livanecky',
    nazev: 'Banánové lívanečky',
    vek: '10m',
    popis: 'Jídlo do ruky ze tří surovin, bez cukru – sladkost dodá zralý banán.',
    porce: 'asi 8 malých lívanečků',
    minuty: 15,
    suroviny: ['1 zralý banán', '1 vejce', '3 lžíce jemných ovesných vloček', 'trochu oleje na pánev'],
    postup: [
      'Banán rozmačkejte vidličkou, přidejte vejce a vločky a promíchejte.',
      'Na pánvi s troškou oleje dělejte malé lívanečky z lžíce těsta.',
      'Smažte z obou stran na mírném ohni, dokud nejsou propečené i uvnitř – vejce nesmí zůstat tekuté.',
      'Nechte vychladnout a nakrájejte na proužky do ruky.',
    ],
    tip: { text: 'Cukr, sirup ani med nepřidávejte. Med se dětem nedává do 1 roku kvůli riziku kojeneckého botulismu.', cite: [4] },
  },
];
