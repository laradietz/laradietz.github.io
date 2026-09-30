// Renders every route to static HTML after `vite build` (see package.json "build"):
// `/` and one page per case study, plus robots.txt and sitemap.xml.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = (...parts) => resolve(root, 'dist', ...parts)
const serverEntry = pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href

const { render, allPages, renderSeoTags, site, siteUrl, collectPendingContent } = await import(serverEntry)

if (!siteUrl.ok) {
  const message = `[prerender] ${siteUrl.reason}`
  if (process.env.VERCEL_ENV === 'production') throw new Error(message)
  console.warn(`WARNING ${message} Usando ${site.url} en canonical, Open Graph y sitemap.`)
}

const pendingItems = collectPendingContent()
if (pendingItems.length > 0) console.warn(`[prerender] Contenido pendiente:\n  - ${pendingItems.join('\n  - ')}`)

const template = readFileSync(dist('index.html'), 'utf8')
for (const marker of ['<!--app-html-->', '<!--seo-->']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html is missing the ${marker} marker`)
}

// Preload the display face used by the hero, so the name renders in its real font on first paint.
const displayFont = readdirSync(dist('assets')).find((file) => /^bricolage-grotesque-latin-wght-normal.*\.woff2$/.test(file))
const preload = displayFont ? `<link rel="preload" href="/assets/${displayFont}" as="font" type="font/woff2" crossorigin />\n    ` : ''

for (const page of allPages()) {
  const appHtml = await render(page.path)
  // Replacer functions on purpose: content such as "$120.000" must not be read as `$` patterns.
  const html = template.replace('<!--seo-->', () => preload + renderSeoTags(page)).replace('<!--app-html-->', () => appHtml)
  // /proyectos/x → proyectos/x.html: served at the clean URL by Vercel (cleanUrls) and by vite preview.
  const file = page.path === '/' ? dist('index.html') : dist(`${page.path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  console.log(`Prerendered ${page.path} (${(html.length / 1024).toFixed(0)} kB)`)
}

const today = new Date().toISOString().slice(0, 10)
const urls = allPages()
  .map((page) => `<url><loc>${site.url}${page.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('')
writeFileSync(dist('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`)
writeFileSync(dist('robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
