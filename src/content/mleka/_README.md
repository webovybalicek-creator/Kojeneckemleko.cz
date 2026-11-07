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
  "pricePer100ml": 9.5,
  "officialUrl": "https://vyrobce.cz/produkt",
  "verified": "2026-11-07"
}
```

Každý údaj ze složení ověř na oficiálním obalu nebo webu výrobce a aktualizuj `verified`.
