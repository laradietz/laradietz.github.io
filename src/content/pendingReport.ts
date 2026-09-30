import { socials } from '../config/site'
import { isPending, type MaybePending } from '../lib/pending'
import { projects } from './projects'

/** Every value still marked with `pending()`, so missing information is never forgotten. */
export function collectPendingContent(): string[] {
  const values: Array<[string, MaybePending<string> | null]> = [
    ...Object.values(socials).flatMap((social): Array<[string, MaybePending<string>]> => [
      [`${social.label} (usuario)`, social.handle],
      [`${social.label} (URL)`, social.href],
    ]),
    ...projects.flatMap((project): Array<[string, MaybePending<string> | null]> => [
      [`${project.name} (demo)`, project.links.demo],
      [`${project.name} (repositorio)`, project.links.repo],
    ]),
  ]
  return values.flatMap(([where, value]) => (value && isPending(value) ? [`${where}: ${value.what}`] : []))
}

export function reportPendingContent() {
  const pendingItems = collectPendingContent()
  if (pendingItems.length > 0) console.info(`[portfolio] Contenido pendiente:\n- ${pendingItems.join('\n- ')}`)
}
