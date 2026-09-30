import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../content/types'
import { RevealText } from '../../components/motion/RevealText'
import { BrowserFrame } from '../../components/ui/Frames'
import { Picture } from '../../components/ui/Picture'
import { SmartLink } from '../../components/ui/SmartLink'
import { ProjectMotif } from '../work/ProjectMotif'

export function CaseHeader({ project }: { project: Project }) {
  return (
    <header className="gutter pt-[clamp(3rem,7vw,6rem)]">
      <p className="eyebrow text-mute">
        Caso de estudio · {project.kind} · {project.year}
      </p>
      <RevealText as="h2" id="case-title" lines={[project.name]} immediate className="display mt-5 text-[clamp(3.25rem,10vw,10rem)]" />
      {project.alias && <p className="mt-3 font-mono text-sm text-mute">También: {project.alias}</p>}

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <p className="serif-accent text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.1] lg:col-span-7">{project.tagline}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm lg:col-span-5">
          <div>
            <dt className="eyebrow text-mute">Estado</dt>
            <dd className="mt-1.5">{project.status}</dd>
          </div>
          <div>
            <dt className="eyebrow text-mute">Año</dt>
            <dd className="mt-1.5">{project.year}</dd>
          </div>
          <div className="col-span-2 flex flex-wrap gap-2">
            {project.links.demo && (
              <SmartLink href={project.links.demo} className="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 font-semibold text-ink">
                Ver sitio <ArrowUpRight size={14} aria-hidden="true" />
              </SmartLink>
            )}
            {project.links.repo && (
              <SmartLink href={project.links.repo} className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-semibold transition-colors hover:bg-paper hover:text-ink">
                Código en GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </SmartLink>
            )}
          </div>
        </dl>
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)] overflow-hidden rounded-2xl">
        {project.media.kind === 'screens' ? (
          <BrowserFrame url={`${project.slug} · /`}>
            <Picture image={project.media.cover} alt={project.media.desktop[0]?.caption ?? project.name} sizes="92vw" priority />
          </BrowserFrame>
        ) : (
          <ProjectMotif motif={project.media.motif} />
        )}
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/8 md:grid-cols-4">
        {project.facts.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse justify-end gap-2 bg-ink p-5 md:p-6">
            <dt className="text-sm leading-snug text-fog">{fact.label}</dt>
            <dd className="display text-[clamp(2.25rem,4vw,3.75rem)] text-paper">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
