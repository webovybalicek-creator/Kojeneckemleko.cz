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


Ověřeno 9. 11. 2026 navíc: 6 pokračovacích (BEBA Optipro 2, HiPP 2 BIO, Kendamil Premium 2, Nutrilon 2 Advanced, Sunar Complex 2, Sunar Premium HMO 2) a 6 speciálních (BEBA EXPERTpro HA 1 a AR, Nutrilon 1 Prosyneo HA, 1 AR a Lactose Free, Sunar Expert AR+Comfort 1). `medical: true` = výrobce uvádí potravinu pro zvláštní lékařské účely. Stránka srovnání dělí mléka na počáteční / pokračovací / speciální (typ HA, AR, bez-laktozy). Bez ceny (Dr.Max nevrátil): HiPP 2, Nutrilon 1 AR, Nutrilon Lactose Free. HiPP 2: palmový olej na webu neuveden (jen PDF etiketa).
