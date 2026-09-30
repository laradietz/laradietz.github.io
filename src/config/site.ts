import type { MaybePending } from '../lib/pending'
import { siteUrl } from '../lib/siteUrl'

export const site = {
  name: 'Lara Dietz',
  roles: ['Frontend Developer', 'Full Stack Developer'],
  timeZone: 'America/Argentina/Buenos_Aires',
  email: 'lara.dietz9296@gmail.com',
  url: siteUrl.url,
  locale: 'es_AR',
  title: 'Lara Dietz — Frontend & Full Stack Developer',
  description:
    'Portafolio de Lara Dietz, Frontend y Full Stack Developer. Interfaces con React y TypeScript, animación, accesibilidad y productos completos de punta a punta.',
} as const

export interface SocialLink {
  label: string
  handle: MaybePending<string>
  href: MaybePending<string>
}

export const socials = {
  github: { label: 'GitHub', handle: '@laradietz', href: 'https://github.com/laradietz' },
  linkedin: { label: 'LinkedIn', handle: 'laradietz', href: 'https://www.linkedin.com/in/laradietz' },
} satisfies Record<string, SocialLink>

export const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'stack', label: 'Stack' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
] as const

export type SectionId = (typeof sections)[number]['id']
