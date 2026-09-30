import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** In development there is no prerender step, so the SEO marker gets a plain title. */
const devSeo = (): Plugin => ({
  name: 'dev-seo',
  apply: 'serve',
  transformIndexHtml: (html) => html.replace('<!--seo-->', '<title>Lara Dietz — Frontend & Full Stack Developer (dev)</title>'),
})

export default defineConfig({
  plugins: [react(), tailwindcss(), devSeo()],
  // PUBLIC_SITE_URL (the portfolio's final domain) feeds canonical URLs, Open Graph and the sitemap.
  envPrefix: ['VITE_', 'PUBLIC_'],
  server: { host: true },
  preview: { host: true, port: 4190 },
})
