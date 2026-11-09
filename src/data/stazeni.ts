/**
 * Stažená kojenecká mléka v ČR – jediný zdroj dat pro pruh nad hlavičkou, sekci na úvodu
 * a tabulku v článku /mleka/stazena-kojenecka-mleka/.
 *
 * Aktualizace: každý týden automatická kontrola (SZPI, MZd, výrobci). Při změně:
 *  1. přidat/upravit položku (nové nahoru), vyplnit zdroj z oficiálního webu,
 *  2. posunout `posledniKontrola`,
 *  3. v článku přidat zdroj a posunout `updated`.
 * Značky se tu uvádějí, protože jde o veřejné varování (ne propagaci).
 */

export interface Stazeni {
  /** Datum oznámení (ISO) */
  datum: string;
  vyrobek: string;
  baleni: string;
  /** Podle čeho balení poznat – DMT, šarže */
  identifikace: string;
  duvod: string;
  /** Kdo varování vydal */
  vydal: string;
  zdroj: string;
  poznamka?: string;
}

/** Kdy jsme naposledy ověřili weby SZPI, MZd a výrobců (ISO) */
export const posledniKontrola = '2026-11-09';

export const stazeni: Stazeni[] = [
  {
    datum: '2026-10-20',
    vyrobek: 'Nutrilon Profutura Duobiotik 1',
    baleni: '800 g',
    identifikace: 'DMT 10. 3. 2027 · 13. 5. 2027 · 5. 11. 2027',
    duvod: 'cereulid',
    vydal: 'Ministerstvo zdravotnictví',
    zdroj: 'https://mzd.gov.cz/?p=227996',
    poznamka: 'Staženo v únoru 2026, v říjnu se znovu objevilo v prodeji.',
  },
  {
    datum: '2026-10-20',
    vyrobek: 'Nutrilon Advanced 2',
    baleni: '800 g',
    identifikace: 'DMT 16. 9. 2026 · 21. 11. 2026 · 20. 12. 2026',
    duvod: 'cereulid',
    vydal: 'Ministerstvo zdravotnictví',
    zdroj: 'https://mzd.gov.cz/?p=227996',
  },
  {
    datum: '2026-10-20',
    vyrobek: 'Nutrilon Advanced 2',
    baleni: '1 kg',
    identifikace: 'DMT 27. 8. 2026 · 4. 11. 2026 · 24. 12. 2026 · 18. 2. 2027',
    duvod: 'cereulid',
    vydal: 'Ministerstvo zdravotnictví',
    zdroj: 'https://mzd.gov.cz/?p=227996',
  },
  {
    datum: '2026-02-23',
    vyrobek: 'Happy Mimi 1 počáteční mléko',
    baleni: '400 g',
    identifikace: 'šarže 3418, DMT 28. 7. 2027',
    duvod: 'cereulid',
    vydal: 'SZPI',
    zdroj: 'https://www.szpi.gov.cz/clanek/varovani-spotrebitelum-zjisteni-pocatecniho-mleka-s-cereulidem-na-tuzemskem-trhu.aspx',
  },
  {
    datum: '2026-02-05',
    vyrobek: 'HAMI 1 počáteční kojenecké mléko',
    baleni: '600 g',
    identifikace: 'DMT 30. 9. 2026 · 16. 1. 2027',
    duvod: 'preventivní stažení výrobcem',
    vydal: 'Nutricia (výrobce)',
    zdroj: 'https://www.klubmaminek.cz/cs/clanek/1641/dulezite-upozorneni-pro-spotrebitele-hami-mlek-k-5-2-2026',
  },
];

export const clanekUrl = '/mleka/stazena-kojenecka-mleka/';

export const formatDatum = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}. ${m}. ${y}`;
};
