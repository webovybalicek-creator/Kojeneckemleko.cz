# Data kojeneckých mlék

Jeden JSON soubor = jedno mléko, např. `znacka-produkt-1.json`. Schéma je v `src/content.config.ts`.

```json
{
  "name": "Název produktu 1",
  "brand": "Značka",
  "stage": "pocatecni",
  "base": "kravske",
  "types": ["standard"],
  "hmo": true,
  "palmOil": false,
  "probiotics": false,
  "pricePer100ml": 9.5,
  "officialUrl": "https://vyrobce.cz/produkt",
  "verified": "2026-11-07"
}
```

Každý údaj ze složení ověř na oficiálním obalu nebo webu výrobce a aktualizuj `verified`.

Ověřeno 9. 11. 2026: 8 počátečních mlék (BEBA, HiPP, Kendamil ×2, Nutrilon ×2, Sunar ×2). Chybí Hami 1 (složení na klubmaminek.cz se načítá dynamicky) a Bebivita 1 (složení jen v PDF). Ceny zatím neuvádíme – sloupec se zobrazí, až bude mít aspoň jedno mléko `pricePer100ml`.
