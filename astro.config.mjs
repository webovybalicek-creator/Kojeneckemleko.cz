// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kojeneckemleko.cz',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/styleguide/'),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
