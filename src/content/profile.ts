import type { TitledText } from './types'

export const heroIntro =
  'Construyo interfaces con React y TypeScript que se sienten simples, y todo lo que necesitan detrás para funcionar de verdad: APIs, bases de datos y deploy.'

/** Revealed word by word while scrolling through "Sobre mí". */
export const manifesto =
  'Me interesa el punto exacto donde el diseño se vuelve código: la tipografía, el movimiento, los estados vacíos, el foco del teclado. Y también lo que no se ve: tipos, permisos, tests y documentación para quien venga después.'

export interface Principle extends TitledText {
  evidence: { label: string; projectSlug: string }
}

export const principles: Principle[] = [
  {
    title: 'Movimiento con propósito',
    body: 'Animo para orientar, no para decorar. Valores ligados al scroll sin re-renders, y todo respeta prefers-reduced-motion.',
    evidence: { label: 'La mascota de Portal Café', projectSlug: 'portal-cafe' },
  },
  {
    title: 'Accesible por defecto',
    body: 'HTML semántico, foco visible, modales con foco atrapado y auditorías automáticas de accesibilidad.',
    evidence: { label: 'Modales y jest-axe en LifeHub', projectSlug: 'lifehub' },
  },
  {
    title: 'Tipos y datos primero',
    body: 'Modelo los datos antes de dibujar la pantalla. La UI deriva de ahí, no al revés.',
    evidence: { label: 'Motor de atribución', projectSlug: 'marketing-attribution' },
  },
  {
    title: 'Seguridad del lado correcto',
    body: 'Los permisos se verifican en el servidor: RLS, tokens revocables y tests contra accesos indebidos.',
    evidence: { label: 'Panel de Portal Café', projectSlug: 'portal-cafe' },
  },
]

export const nowBuilding = {
  label: 'Ahora',
  body: 'Portal Café ya está en producción. Sigo cursando la Licenciatura en Sistemas.',
}

export const education = [
  { period: 'En curso', title: 'Licenciatura en Sistemas', place: 'Universidad Nacional de General Sarmiento' },
  { period: '2025', title: 'Introducción a la Ciberseguridad', place: 'Educación IT' },
]

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Técnico' },
]
