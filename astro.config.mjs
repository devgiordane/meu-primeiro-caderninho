import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = process.env.PAGES_BASE ?? '/meu-primeiro-caderninho';
const site = process.env.PAGES_SITE ?? 'https://devgiordane.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  output: 'static',
});
