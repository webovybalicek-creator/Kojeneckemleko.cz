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
- Serif jen váha 300, nikdy tučný. Eyebrow: 11 px / 600 / 0.08em / uppercase.
- Radius 14 px karty a tlačítka, 999 px štítky.
- Pohyb podle Emila Kowalského: ease-out, 150–250 ms, jen transform/opacity, hover jen pro `(hover: hover) and (pointer: fine)`, `:active` scale 0.97, respektovat `prefers-reduced-motion`.

## Obsah – povinná pravidla
1. Zdroje přednostně zahraniční: WHO, UNICEF, ESPGHAN, EFSA, NHS, NICE, AAP/HealthyChildren, CDC, FDA, Cochrane, First Steps Nutrition Trust, BfR. České jen pro lokální fakta (SZPI, SZÚ, ceny, dostupnost).
2. Každé tvrzení musí mít oporu v `sources` článku; schéma vyžaduje alespoň jeden zdroj.
3. Údaje o mlécích jen z oficiálního obalu / webu výrobce, s datem `verified`.
4. Kojení = doporučená volba (WHO). O mlécích nestranně, žádné „nejlepší mléko“ bez dat.
5. Žádné individuální zdravotní rady, u obtíží odkaz na pediatra.
6. YMYL bez garanta: transparentní metodika (`/jak-tvorime-obsah/`), autor, datum revize, disclaimer.

## Regulace
EU nařízení 2016/127 omezuje propagaci počáteční kojenecké výživy. Žádné affiliate odkazy, kupony ani reklama na mléka bez právní kontroly.

## Příkazy
`npm run dev` · `npm run build` · `npm run preview`
