import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Zdroj, o který se opírá tvrzení. Preferujeme WHO, ESPGHAN, EFSA, NHS, AAP, Cochrane… */
const author = z.object({
  name: z.string(),
  /** Odkaz na oficiální profil (univerzita, WHO, CDC…) */
  url: z.url().optional(),
  role: z.string().optional(),
});

const source = z.object({
  title: z.string(),
  publisher: z.string(),
  url: z.url(),
  year: z.number().int().optional(),
  /** studie = recenzovaný článek, doporuceni = oficiální doporučení instituce */
  kind: z.enum(['studie', 'doporuceni', 'legislativa']).default('doporuceni'),
  doi: z.string().optional(),
  authors: z.array(author).optional(),
});

/** Tematické klastry webu – pořadí odpovídá obsahové strategii. */
export const coverMotifs = ['lahev', 'kapka', 'hodiny', 'stit', 'klicky', 'oblak', 'kvet', 'hruska', 'lzicka', 'miska', 'mesic', 'vejce', 'brokolice', 'hrnec'] as const;

export const clusters = ['mleka', 'krmeni', 'prikrmy'] as const;

const clanky = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/clanky' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    cluster: z.enum(clusters),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    // TODO: doplnit skutečné jméno autora (E-E-A-T) a stránku autora
    author: z.string().default('Redakce kojeneckemleko.cz'),
    sources: z.array(source).min(1, 'Každý článek musí mít alespoň jeden zdroj.'),
    draft: z.boolean().default(false),
    /** Ilustrační náhled článku (karty na úvodu a v rozcestnících) – vlastní botanické SVG, viz ArticleCover.astro */
    cover: z.object({
      motif: z.enum(coverMotifs),
      tone: z.enum(['sage', 'mint', 'keylime', 'slate']).default('sage'),
    }).optional(),
  }),
});

/**
 * Kojenecká mléka pro srovnávací tabulky.
 * Údaje ze složení vždy z oficiálního obalu / webu výrobce, `verified` = datum ověření.
 */
const mleka = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/mleka' }),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    stage: z.enum(['pocatecni', 'pokracovaci', 'batoleci']),
    base: z.enum(['kravske', 'kozi', 'sojove', 'hydrolyzovane', 'aminokyselinove']),
    types: z.array(z.enum(['standard', 'HA', 'AR', 'comfort', 'bez-laktozy', 'A2', 'bio'])).default(['standard']),
    hmo: z.boolean().optional(),
    palmOil: z.boolean().optional(),
    /** Přidané probiotické kultury podle složení (bakterie mléčného kvašení) */
    probiotics: z.boolean().optional(),
    pricePer100ml: z.number().optional(),
    /** Orientační cena balení – jeden obchod pro všechna mléka, s datem zjištění */
    price: z.object({
      czk: z.number(),
      packG: z.number(),
      source: z.string(),
      date: z.coerce.date(),
    }).optional(),
    officialUrl: z.url(),
    verified: z.coerce.date(),
  }),
});

export const collections = { clanky, mleka };
