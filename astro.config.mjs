// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeTerms from './src/lib/rehype-terms.mjs';
import rehypeCite from './src/lib/rehype-cite.mjs';

export default defineConfig({
  site: 'https://kojeneckemleko.cz',
  trailingSlash: 'always',
  markdown: { rehypePlugins: [rehypeCite, rehypeTerms] },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/styleguide/') && !page.includes('/og/'),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
