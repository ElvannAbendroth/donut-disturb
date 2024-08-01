import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import sitemap from '@astrojs/sitemap'
import { siteConfig } from './src/utils/config'
import autolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [autolinkHeadings],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    ,
    react(),
    sitemap(),
  ],
  experimental: {
    actions: true,
  },
  output: 'server',
  adapter: vercel(),
  site: siteConfig.url,
  server: {
    headers: {
      'access-control-allow-origin': '*',
      'access-control-expose-headers': '*',
      'access-control-request-method': '*',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})
