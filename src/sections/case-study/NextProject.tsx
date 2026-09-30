import { ArrowRight } from 'lucide-react'
import type { Project } from '../../content/types'
import { projectPath } from '../../lib/router'
import { Picture } from '../../components/ui/Picture'
import { ProjectMotif } from '../work/ProjectMotif'

interface NextProjectProps {
  project: Project
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function NextProject({ project, onNavigate }: NextProjectProps) {
  return (
    <a
      href={projectPath(project.slug)}
      onClick={onNavigate}
      data-cursor="Siguiente"
      className="group gutter mt-[clamp(6rem,12vw,10rem)] block border-t border-white/10 pt-10 pb-16"
    >
      <p className="eyebrow text-mute">Siguiente caso</p>
      <div className="mt-4 grid items-end gap-8 lg:grid-cols-12">
        <p className="display flex items-center gap-4 text-[clamp(2.75rem,8vw,7.5rem)] transition-colors duration-500 group-hover:text-accent lg:col-span-7">
          {project.name}
          <ArrowRight className="size-[0.6em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-3" aria-hidden="true" />
        </p>
        <div className="overflow-hidden rounded-2xl opacity-70 transition-[opacity,transform] duration-700 ease-out-expo group-hover:scale-[1.02] group-hover:opacity-100 lg:col-span-5">
          {project.media.kind === 'screens' ? (
            <Picture image={project.media.cover} alt="" sizes="(min-width: 1024px) 38vw, 92vw" />
          ) : (
            <ProjectMotif motif={project.media.motif} />
          )}
        </div>
      </div>
    </a>
  )
}
