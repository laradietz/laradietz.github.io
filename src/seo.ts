import { site, socials } from './config/site'
import { projects } from './content/projects'
import type { Project } from './content/types'
import { getTech } from './content/stack'
import { isPending } from './lib/pending'
import { projectPath } from './lib/router'

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

/** `<` is escaped so no string can close the script tag early. */
const jsonLd = (data: object) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`

const sameAs = Object.values(socials).flatMap((social) => (isPending(social.href) ? [] : [social.href]))

function personSchema() {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    url: `${site.url}/`,
    email: `mailto:${site.email}`,
    jobTitle: 'Frontend Developer',
    address: { '@type': 'PostalAddress', addressLocality: 'José C. Paz', addressRegion: 'Buenos Aires', addressCountry: 'AR' },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de General Sarmiento' },
    knowsAbout: ['React', 'TypeScript', 'Frontend development', 'UI/UX', 'Accesibilidad web', 'Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL'],
    sameAs,
  }
}

interface PageMeta {
  title: string
  description: string
  path: string
  structuredData: object
}

export function homeMeta(): PageMeta {
  return {
    title: site.title,
    description: site.description,
    path: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: site.title, inLanguage: 'es-AR', author: { '@id': `${site.url}/#person` } },
        { '@type': 'ProfilePage', url: `${site.url}/`, mainEntity: { '@id': `${site.url}/#person` } },
        personSchema(),
      ],
    },
  }
}

export function projectMeta(project: Project): PageMeta {
  const url = `${site.url}${projectPath(project.slug)}`
  const repo = project.links.repo && !isPending(project.links.repo) ? project.links.repo : undefined
  return {
    title: `${project.name} — Caso de estudio · ${site.name}`,
    description: `${project.tagline} ${project.summary}`.slice(0, 300),
    path: projectPath(project.slug),
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.name,
      url,
      description: project.summary,
      dateCreated: String(project.year),
      inLanguage: 'es-AR',
      keywords: project.stack.map((id) => getTech(id).name).join(', '),
      author: personSchema(),
      ...(repo && { codeRepository: repo }),
    },
  }
}

export const allPages = (): PageMeta[] => [homeMeta(), ...projects.map(projectMeta)]

export function renderSeoTags(meta: PageMeta): string {
  const canonical = `${site.url}${meta.path === '/' ? '/' : meta.path}`
  const image = `${site.url}/og-image.jpg`
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${meta.path === '/' ? 'profile' : 'article'}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="799" />`,
    `<meta property="og:image:height" content="412" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${site.name} — Frontend & Full Stack Developer`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    jsonLd(meta.structuredData),
  ].join('\n    ')
}
