# 🍼 kojeneckemleko.cz – instrukce pro práci na projektu

Komunikace v češtině, stručně a věcně.

## Co to je
Nezávislý průvodce krmením miminka pro rodiče v ČR. Jádro = kojenecká mléka (typy, složení, značky, srovnávací tabulky). Cíl č. 1: první pozice na Googlu. Monetizace až později.

## Stack
Astro 7 (statický výstup), MDX, @astrojs/sitemap. Fonty: Newsreader Variable (serif, váha 300) + Inter Variable, self-hosted přes Fontsource.

- Články: `src/content/clanky/*.mdx` → URL `/<cluster>/<slug>/`. Šablona `_sablona-clanku.mdx`.
- Mléka: `src/content/mleka/*.json` → tabulka `/mleka/srovnani/`. Schéma v `src/content.config.ts`.
- Klastry (`mleka`, `krmeni`, `prikrmy`) a jejich hub stránky: `src/data/clusters.ts`.
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

## Slovníček a tooltipy
- Slovníček `/slovnicek/` = data v `src/data/slovnicek.ts` (heslo, krátká definice, odstavce s `[n]` odkazy na `glossarySources`). Každá definice musí mít zdroj. Štítky (HA, AR, Comfort, Kozí; typy v tabulce mlék) vedou na `/slovnicek/#id` přes `tagToTerm`.
- Tooltipy: `src/data/terms.mjs` (zkratky institucí = jen vysvětlivka; pojmy = vysvětlivka + odkaz do slovníčku). V MDX článcích je doplní rehype plugin `src/lib/rehype-terms.mjs` u prvního výskytu; v prostých textech (perexy, FAQ) funkce `annotate()` přes `set:html`. Nový pojem = přidat do `terms.mjs` (a případně do slovníčku).
- Markdown pluginy vyžadují balíček `@astrojs/markdown-remark` (Astro 7).

## Nástroje (`/nastroje/`)
Zdarma, bez registrace, vše běží v prohlížeči. Seznam karet: `src/data/nastroje.ts` (rozcestník i sekce na úvodu).
- **Kontrola staženého mléka** `/nastroje/kontrola-mleka/` – `RecallCheck.astro` (i v článku o stažených mlécích). Čte `src/data/stazeni.ts`; u každé položky vyplnit `dmt` (ISO data) a případně `sarze`, jinak nástroj nabídne jen ruční porovnání podle `identifikace`.
- **Deník krmení** `/nastroje/denik-krmeni/` – `FeedingLog.astro`: časovač kojení (L/P, přepnutí = stále jeden záznam), lahev v ml, přehled dne, úprava/zpětné přidání, CSV. Data jen v localStorage `km-denik-v1` (při změně struktury zvýšit verzi a migrovat). Nic neposílat na server.
- **Růstové grafy WHO** `/nastroje/rustove-grafy/` – `GrowthPercentile.astro`: percentil hmotnosti a délky 0–24 měsíců + graf. Data `public/data/who-rust.json` (L, M, S po dnech z oficiálního balíčku WHO `anthro`, neupravovat ručně). Nic neukládá. Jen poloha v tabulce, žádné hodnocení růstu.
- **Do kdy spotřebovat** `/nastroje/do-kdy-spotrebovat/` – `UseByTimer.astro`: odpočet lhůt pro připravené umělé a odstříkané mateřské mléko. Lhůty musí odpovídat článkům `jak-dlouho-vydrzi-umele-mleko` a `odstrikavani-materskeho-mleka` (WHO, CDC, NHS); kde se instituce liší, ukázat obě. localStorage `km-spotreba-v1`, žádná upozornění.
- Úvodní stránka ukazuje první 3 karty z `nastroje.ts`, rozcestník všechny.
- OG obrázky nástrojů: šablony `/og/nastroj-<slug>/` a `/og/nastroje/` se berou z `nastroje.ts`; nový nástroj = vygenerovat PNG a nastavit `ogImage` na stránce.
- Deník jde přidat na plochu: `public/denik-manifest.json` + ikony `public/images/ikona-*.png`, manifest se linkuje jen na stránce deníku (slot `head` v `Base.astro`).
- Nástroje nic nedoporučují (žádné „kdy krmit“, žádné připomínky krmení) – jen zapisují a porovnávají s oficiálním seznamem.

## Regulace (nic nezákonného kolem kojeneckých mlék)
EU nařízení 2016/127 (čl. 10) omezuje propagaci počáteční kojenecké výživy; v ČR navíc zákon o regulaci reklamy, dozor SZPI. Proto:
- žádné affiliate odkazy, kupony, vzorky ani reklama na mléka bez právní kontroly,
- v obecných článcích nejmenovat značky; značky jen ve faktickém srovnání (složení, cena), bez hodnocení „nejlepší“ a bez propagačního jazyka,
- žádné obrázky idealizující umělou výživu (miminka na obalech apod.),
- vždy „připravujte podle návodu na balení“.

## Hosting, deploy a návštěvnost
- Hosting přes FTP s PHP. Deploy: `.github/workflows/deploy.yml` – automaticky při každém pushi do `main` (push = nasazení na ostrý web!), secrets FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_SERVER_DIR, STATS_PASSWORD. Secrets nečíst ani nevypisovat.
- Počítadlo: `public/api/hit.php` + `_lib.php` (SQLite v `api/data/`, mimo git i deploy), beacon v `src/layouts/Base.astro`, přehled `public/navstevnost/index.php` pod heslem.
- Bez cookies, bez IP v DB, denní rotující sůl, respektuje DNT/GPC.
- Vlastní návštěvy provozovatele se nepočítají: přihlášení na `/navstevnost/` uloží značku `km-nemerit` do localStorage a otisk aktuální IP (HMAC, tabulka `excluded_ip`, max 20) – `hit.php` takové požadavky zahodí. IP se mění, proto se otisk obnovuje při každém otevření přehledu.
- Vynulování statistik: změnit konstantu `KM_RESET` v `_lib.php` (data se smažou při prvním požadavku po deployi). Naposledy 10. 11. 2026. Žádné Google Analytics ani jiné trackery třetích stran bez cookie lišty a právní kontroly.

## Příkazy
`npm run dev` · `npm run build` · `npm run preview`
