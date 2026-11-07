// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeTerms from './src/lib/rehype-terms.mjs';

export default defineConfig({
  site: 'https://kojeneckemleko.cz',
  trailingSlash: 'always',
  markdown: { rehypePlugins: [rehypeTerms] },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/styleguide/'),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
