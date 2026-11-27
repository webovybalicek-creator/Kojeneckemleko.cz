# 🍼 kojeneckemleko.cz – instrukce pro práci na projektu

Komunikace v češtině, stručně a věcně.

## Co to je
Nezávislý průvodce krmením miminka pro rodiče v ČR. Jádro = kojenecká mléka (typy, složení, značky, srovnávací tabulky). Cíl č. 1: první pozice na Googlu. Monetizace až později.

## Stack
Astro 7 (statický výstup), MDX, @astrojs/sitemap. Fonty: Newsreader Variable (serif, váha 300) + Inter Variable, self-hosted přes Fontsource.

- Články: `src/content/clanky/*.mdx` → URL `/<cluster>/<slug>/`. Šablona `_sablona-clanku.mdx`.
- Mléka: `src/content/mleka/*.json` → tabulka `/mleka/srovnani/`. Schéma v `src/content.config.ts`.
- Klastry (`mleka`, `krmeni`, `prikrmy`, `batole`) a jejich hub stránky: `src/data/clusters.ts`. Batole (1–3 roky, od 27. 11. 2026) má kresby jako Krmení, hub používá ilustraci `sprig`.
- Komponenty: `/styleguide/` (noindex).

## Design
Vychází z easehealth.com – „botanický skleník na krémovém papíře“. Tokeny v `src/styles/tokens.css`.
- Forest Ink `#0f3e17` jen pro text, odkazy a CTA – nikdy jako plocha.
- Bez stínů; hloubka vrstvami panelů cream → keylime → mint → sage → slate.
- Serif (Newsreader) jen váha 300, nikdy tučný, a **jen od ~32 px výš** (h1, h2, velké h3 s třídou `serif`, display, velká čísla). Podle brand manuálu je serif jen 40/56/74 px.
- Malé titulky (heading-sm, karty, výpisy článků, patička) a **logo = Inter 600**, třída `.heading-sm` nebo běžné `h3`. Serif 300 v malé velikosti je špatně čitelný.
- Eyebrow: 11 px / 600 / 0.08em / uppercase.
- Radius 14 px karty a tlačítka, 999 px štítky.
- Logo: textový wordmark „kojeneckemleko.cz“ v Inter 600 (19 px, letter-spacing -0.03em), „.cz“ tlumeně ve váze 400, bez ikony.
- Obrázky: vlastní botanické SVG ilustrace (`src/components/Illustration.astro`: sprig, mleka, krmeni, prikrmy, zdroje) – listy v sage/mint/keylime, linky Forest Ink 1.5 px. Bez miminek s lahví a bez idealizace umělé výživy. Rozměr ilustrace určuje rodič selektorem `.rodic :global(.trida)`.
- **Fotky jen v rubrice Příkrmy** (kresby a fotky se nemíchají): `cover.photo` + `cover.alt` ve frontmatteru, soubor `public/images/foto/<slug>.jpg`. Fotky z Pexels – ID do `scripts/foto.json`, push spustí workflow `foto.yml`, které je stáhne (1200×750) a commitne. Nebrat první výsledky hledání; jen jídlo a pomůcky (miminko max. zezadu/detail rukou), bez lahví s mlékem a značek, publikum v ČR. Úvod a související články skládají karty vždy po rubrikách.
- Pohyb podle Emila Kowalského: ease-out, 150–250 ms, jen transform/opacity, hover jen pro `(hover: hover) and (pointer: fine)`, `:active` scale 0.97, respektovat `prefers-reduced-motion`.

## Obsah – povinná pravidla
1. Zdroje přednostně zahraniční: WHO, UNICEF, ESPGHAN, EFSA, NHS, NICE, AAP/HealthyChildren, CDC, FDA, Cochrane, First Steps Nutrition Trust, BfR. České jen pro lokální fakta (SZPI, SZÚ, ceny, dostupnost).
2. Každé tvrzení musí mít oporu v `sources` článku; schéma vyžaduje alespoň jeden zdroj.
3. Údaje o mlécích jen z oficiálního obalu / webu výrobce, s datem `verified`.
4. Kojení = doporučená volba (WHO). O mlécích nestranně, žádné „nejlepší mléko“ bez dat.
5. Žádné individuální zdravotní rady, u obtíží odkaz na pediatra.
6. YMYL bez garanta: transparentní metodika (`/jak-tvorime-obsah/`), autor, datum revize, disclaimer.
7. Citace v textu jako `[[n]](#zdroj-n)` (pořadí podle `sources`). U studií vyplnit `kind: studie`, `doi`, `authors` – u autorů odkaz na oficiální profil (univerzita, WHO, CDC), jen pokud je ověřený.
8. Každý fakt i odkaz ověřit fetchnutím zdroje; když zdroj tvrzení neříká, tvrzení vypustit nebo přeformulovat. Observační studie = „souvislost“, ne příčina.
9. Na začátku článku o mléce krátká poznámka o doporučení WHO ke kojení (bez moralizování).

## Rozcestníky a úvod
- **Výběr věku na úvodu** (`AgePicker.astro`, bez JS – radio + CSS) a stránka **`/prvni-rok/`** čerpají z `src/data/prvni-rok.ts`. Každá věta má zdroj převzatý z ověřeného článku – při změně článku upravit i tento soubor.
- **`/zacnete-tady/`** + sekce „Co právě řešíte?“ na úvodu: `src/data/situace.ts` (ID článků v pořadí čtení; neexistující ID shodí build).
- Stažená mléka jsou na úvodu sbalená (`<details>`), plný seznam v článku a nástroji. Počet = různé výrobky (jako `RecallBar`).
- Karty článků na úvodu: `ArticleCards feature` (hlavní karta + 2 menší). Lístky v ilustracích „vyrostou“ při zobrazení (`.leaf`, třída `anim` na `<html>`, jen transform/opacity).
- Obsah článku (sbalený `<details class="toc">` s kotvami H2) se v `[cluster]/[slug].astro` zobrazí automaticky u článků nad 700 slov s aspoň 5 sekcemi H2.
- Pod nadpisem článku štítek „Ověřeno · počet zdrojů: instituce“ (zkratky z `publisher`, mapování v `[slug].astro`), odkaz na `#zdroje`.
- `/mleka/srovnani/`: filtry (fáze, HMO, bez palmového oleje, probiotika), řazení podle ceny za 100 g prášku a porovnání 2–3 mlék v dialogu. Cena za 100 ml se neuvádí (není ověřená spotřeba prášku).

## Karty mlék (`/mleka/srovnani/<id>/`)
Šablona `src/pages/mleka/srovnani/[slug].astro`, jedna stránka na každý JSON v `src/content/mleka/`; název v tabulce srovnání vede na kartu, odkaz na web výrobce (nofollow) je až na kartě. Rozhodnutí 26. 11. 2026: karty ano, ale **nesmí to být reklama a nikoho nezvýhodňovat**:
- stejná šablona a pořadí údajů pro všechna mléka, nic se nezvýrazňuje; „další mléka“ = celá skupina abecedně,
- jen údaje z obalu / webu výrobce s datem ověření; žádné hodnocení, doporučení, loga, fotky obalů, odkazy do e-shopů ani Product schéma,
- na každé kartě poznámka WHO o kojení, u speciálních mlék „po poradě s pediatrem“,
- stažení: karta ukáže jen shodu názvu se `stazeni.ts` a odkáže na nástroj; nikdy netvrdí „nebylo staženo“.

## Slovníček a tooltipy
- Slovníček `/slovnicek/` = data v `src/data/slovnicek.ts` (heslo, krátká definice, odstavce s `[n]` odkazy na `glossarySources`). Každá definice musí mít zdroj. Štítky (HA, AR, Comfort, Kozí; typy v tabulce mlék) vedou na `/slovnicek/#id` přes `tagToTerm`.
- Tooltipy: `src/data/terms.mjs` (zkratky institucí = jen vysvětlivka; pojmy = vysvětlivka + odkaz do slovníčku). V MDX článcích je doplní rehype plugin `src/lib/rehype-terms.mjs` u prvního výskytu; v prostých textech (perexy, FAQ) funkce `annotate()` přes `set:html`. Nový pojem = přidat do `terms.mjs` (a případně do slovníčku).
- Markdown pluginy vyžadují balíček `@astrojs/markdown-remark` (Astro 7).

## Nástroje (`/nastroje/`)
Zdarma, bez registrace, vše běží v prohlížeči. Seznam karet: `src/data/nastroje.ts` (rozcestník i sekce na úvodu).
- **Kontrola staženého mléka** `/nastroje/kontrola-mleka/` – `RecallCheck.astro` (i v článku o stažených mlécích). Čte `src/data/stazeni.ts`; u každé položky vyplnit `dmt` (ISO data) a případně `sarze`, jinak nástroj nabídne jen ruční porovnání podle `identifikace`.
- **Deník krmení** `/nastroje/denik-krmeni/` – `FeedingLog.astro`: časovač kojení (L/P, přepnutí = stále jeden záznam), lahev v ml, přehled dne, úprava/zpětné přidání, CSV. Data jen v localStorage `km-denik-v1` (při změně struktury zvýšit verzi a migrovat). Nic neposílat na server.
- **Růstové grafy WHO** `/nastroje/rustove-grafy/` – `GrowthPercentile.astro`: percentil hmotnosti a délky 0–24 měsíců + graf. Data `public/data/who-rust.json` (L, M, S po dnech z oficiálního balíčku WHO `anthro`, neupravovat ručně). Nic neukládá. Jen poloha v tabulce, žádné hodnocení růstu.
- **Do kdy spotřebovat** `/nastroje/do-kdy-spotrebovat/` – `UseByTimer.astro`: odpočet lhůt pro připravené umělé a odstříkané mateřské mléko. Lhůty musí odpovídat článkům `jak-dlouho-vydrzi-umele-mleko` a `skladovani-materskeho-mleka` (WHO, CDC, NHS); kde se instituce liší, ukázat obě. localStorage `km-spotreba-v1`, žádná upozornění.
- **Zápisník alergenů** `/nastroje/zapisnik-alergenu/` – `AllergenLog.astro`: 12 alergenů podle NHS (shodně s článkem `alergeny`), u každého záznamy s datem, poznámkou a podezřením na reakci, CSV. localStorage `km-alergeny-v1`. Jen eviduje – žádný plán zavádění, žádný kalendář ani připomínky.
- **Zápisník příkrmů** `/nastroje/zapisnik-prikrmu/` – `FoodLog.astro`: skupiny a příklady potravin podle NHS (od 6 a 7–9 měsíců), vlastní potraviny, „chutnalo / napůl / nechutnalo“, poznámka, podezření na reakci, CSV. localStorage `km-prikrmy-v1` ({custom, items}). Jen eviduje – žádný plán, pořadí zavádění ani připomínky. Alergeny zůstávají v zápisníku alergenů.
- Úvodní stránka ukazuje první 3 karty z `nastroje.ts`, rozcestník všechny.
- OG obrázky nástrojů: šablony `/og/nastroj-<slug>/` a `/og/nastroje/` se berou z `nastroje.ts`; nový nástroj = vygenerovat PNG a nastavit `ogImage` na stránce.
- Deník jde přidat na plochu: `public/denik-manifest.json` + ikony `public/images/ikona-*.png`, manifest se linkuje jen na stránce deníku (slot `head` v `Base.astro`).
- Nástroje nic nedoporučují (žádné „kdy krmit“, žádné připomínky krmení) – jen zapisují a porovnávají s oficiálním seznamem.

## Recepty na příkrmy
Článek `/prikrmy/recepty-na-prikrmy/`, data v `src/data/recepty.ts`, komponenta `RecipeCard.astro` (recept + JSON-LD Recipe; `<RecipeCard index />` = rozcestník podle věku). Vlastní recepty z potravin, které NHS uvádí pro daný věk; vždy bez soli, bujonu, cukru a medu, vejce propečená, ryby bez kostí. Tip u receptu musí mít `cite` (čísla zdrojů článku), recept podle vzoru NHS má `vzor`.

## Slovenská verze (`/sk/`)
Rozhodnutí 27. 11. 2026: slovenština na podadresáři `/sk/` (doménu .sk nekupujeme), EN ne.
- Články: kolekce `skClanky` v `src/content/sk-clanky/*.mdx` – překlad ověřeného českého článku se **stejnými zdroji**, pole `cs` = ID českého originálu (hreflang + přepínač jazyka), vlastní slovenský slug. Lokální fakta upravit (155/112, bez SZPI, bez cen a značek z ČR).
- URL: `/sk/<rubrika>/<slug>/`, rubriky `mlieka`, `krmenie`, `prikrmy`, `batolata` (mapování a slovenské texty rubrik v `src/i18n/ui.ts`). Šablona článku je společná: `src/layouts/Article.astro` (CZ route `[cluster]/[slug].astro`, SK route `sk/[cluster]/[slug].astro`).
- UI řetězce: `src/i18n/ui.ts` (`langFromPath`, `t(lang)`); Header, Footer, SourceList, ArticleCards a MilkCalculator berou jazyk z URL.
- `Base.astro` prop `alternates={{ cs, sk }}` → hreflang cs-CZ / sk-SK / x-default (= cs) a odkaz „Slovensky / Česky“ v patičce. Párové stránky: úvod, rubriky, články s překladem, metodika (`/sk/ako-tvorime-obsah/`), ochrana soukromí (`/sk/ochrana-sukromia/`).
- V SK článcích: žádné české tooltipy (rehype-terms je přeskočí), interní odkazy na české články se přepíší na slovenské verze, pokud existují (`src/lib/rehype-sk-links.mjs`), jinak zůstanou české s `hreflang="cs"`. Bez komentářů a bez pruhu stažených mlék (data jsou pro ČR).
- Reklama: SK rubrika Mlieka a její články také `ads={false}` (stejná šablona).
- OG obrázky: `/og/sk-<slug>/` → `public/images/og/sk-<slug>.png`, výchozí `sk-default.png`.
- Nástroje a srovnávací tabulka zatím jen česky. Doporučeno nechat prvních 5 SK článků zkontrolovat rodilým mluvčím.

## Přehledy k vytištění (`/tisk/`)
Data v `src/data/tisk.ts`, šablona `src/pages/tisk/[slug].astro` (tiskové styly A4), PDF v `public/tisk/<slug>.pdf`. Obsah jen z ověřených článků; po změně článku upravit přehled a PDF vygenerovat znovu (Playwright `page.pdf()` z náhledu, `emulateMedia('print')`).

## Komentáře pod články
- `src/components/Comments.astro` (pod každým článkem, sbalený formulář; seznam se ukáže, až existuje schválený komentář) → `public/api/komentare.php` (GET schválené, POST nový) → schvalování v `/navstevnost/komentare.php` (stejné přihlášení jako návštěvnost, CSRF token).
- Tabulky `comments` a `comment_rate` ve stejné SQLite jako počítadlo; vynulování statistik je nemaže.
- **Vždy schvalování předem.** Ochrana: skryté pole, min. 4 s vyplňování, 3 odeslání/hod z jednoho zdroje, zákaz odkazů a e-mailů, 10–1500 znaků. Bez cookies, bez e-mailu, bez IP.
- Neschvalovat: zdravotní rady pro konkrétní dítě, reklamu, doporučování značek mléka, osobní údaje. Odpověď redakce jen z ověřených zdrojů článku. **Nikdy nepsat vymyšlené komentáře.**
- Upozornění e-mailem jen při nastaveném secretu `KOMENTARE_EMAIL` (volitelné).

## Regulace (nic nezákonného kolem kojeneckých mlék)
EU nařízení 2016/127 (čl. 10) omezuje propagaci počáteční kojenecké výživy; v ČR navíc zákon o regulaci reklamy, dozor SZPI. Proto:
- žádné affiliate odkazy, kupony, vzorky ani reklama na mléka bez právní kontroly,
- v obecných článcích nejmenovat značky; značky jen ve faktickém srovnání (složení, cena), bez hodnocení „nejlepší“ a bez propagačního jazyka,
- žádné obrázky idealizující umělou výživu (miminka na obalech apod.),
- vždy „připravujte podle návodu na balení“.

## Reklama (AdSense zatím není nasazený)
Rozhodnutí 26. 11. 2026: pokud se někdy nasadí AdSense nebo jiná reklamní síť, **na stránkách počátečních mlék nesmí být žádná reklama** (nařízení EU 2016/127 omezuje reklamu na počáteční kojenecká mléka a nad tím, co síť zobrazí, nemáme kontrolu).
- `Base.astro` má vlastnost `ads` (výchozí `true`). `ads={false}` vypíše `<meta name="km-reklama" content="ne">` a reklamní skript se smí vykreslit **jen pod podmínkou `ads`** – tedy ani automatické reklamy, ani ručně vložené bloky.
- Bez reklamy je **celá rubrika Mléka**: rozcestník `/mleka/`, všechny články s `cluster: mleka`, stránka `/mleka/srovnani/` a všechny karty mlék (i pokračovací). Nová stránka o mlécích mimo tyto šablony musí dostat `ads={false}` ručně.
- Při nasazení reklam navíc v síti zablokovat kategorii kojenecké výživy pro celý web. Před spuštěním cookie lišta a právní kontrola.

## Hosting, deploy a návštěvnost
- Hosting přes FTP s PHP. Deploy: `.github/workflows/deploy.yml` – automaticky při každém pushi do `main` (push = nasazení na ostrý web!), secrets FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_SERVER_DIR, STATS_PASSWORD. Secrets nečíst ani nevypisovat.
- Počítadlo: `public/api/hit.php` + `_lib.php` (SQLite v `api/data/`, mimo git i deploy), beacon v `src/layouts/Base.astro`, přehled `public/navstevnost/index.php` pod heslem.
- Bez cookies, bez IP v DB, denní rotující sůl, respektuje DNT/GPC.
- Vlastní návštěvy provozovatele se nepočítají: přihlášení na `/navstevnost/` uloží značku `km-nemerit` do localStorage a otisk aktuální IP (HMAC, tabulka `excluded_ip`, max 20) – `hit.php` takové požadavky zahodí. IP se mění, proto se otisk obnovuje při každém otevření přehledu.
- Vynulování statistik: změnit konstantu `KM_RESET` v `_lib.php` (data se smažou při prvním požadavku po deployi). Naposledy 10. 11. 2026.
- **Cíle (akce na stránce):** `window.kmEvent('nazev')` v `Base.astro` → `public/api/event.php` → tabulka `events` (den, název, stránka, počet), přehled v sekci „Cíle“ na `/navstevnost/`. Povolené názvy a popisy: `km_events()` v `_lib.php` (cteni, nastroj, srovnani, faq, zdroj, tisk, pdf, komentar, dalsi). Každá akce nejvýš jednou na zobrazení stránky, bez cookies a identifikátorů; nikdy neposílat obsah zadaný do nástrojů. Měří se od 25. 11. 2026.
- Žádné Google Analytics ani jiné trackery třetích stran bez cookie lišty a právní kontroly (rozhodnutí 25. 11. 2026: místo GA vlastní měření cílů).

## Příkazy
`npm run dev` · `npm run build` · `npm run preview`
