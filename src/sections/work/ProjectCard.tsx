import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../content/types'
import { cx } from '../../lib/cx'
import { projectPath } from '../../lib/router'
import { openProject } from '../../lib/transitionOrigin'
import { easeOutExpo } from '../../components/motion/easing'
import { Picture } from '../../components/ui/Picture'
import { ProjectMotif } from './ProjectMotif'
import { StackChips } from './StackChips'

interface ProjectCardProps {
  project: Project
  index: number
  flip: boolean
}

export function ProjectCard({ project, index, flip }: ProjectCardProps) {
  const open = (event: React.MouseEvent<HTMLAnchorElement>) => openProject(project.slug, event)

  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby={`${project.slug}-title`} data-component="ProjectCard">
      <motion.a
        href={projectPath(project.slug)}
        onClick={open}
        data-cursor="Ver caso"
        aria-label={`Abrir el caso de ${project.name}`}
        className={cx('block overflow-hidden rounded-2xl lg:col-span-7', flip && 'lg:order-2')}
        initial={{ clipPath: 'inset(14% 10% 14% 10% round 24px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.3, ease: easeOutExpo }}
      >
        <div className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]">
          {project.media.kind === 'screens' ? (
            <Picture image={project.media.cover} alt="" sizes="(min-width: 1024px) 55vw, 92vw" />
          ) : (
            <ProjectMotif motif={project.media.motif} />
          )}
        </div>
      </motion.a>

      <div className={cx('flex flex-col gap-5 lg:col-span-5', flip && 'lg:order-1')}>
        <p className="flex items-center gap-3 font-mono text-xs text-mute">
          <span className="text-accent">{String(index).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-white/20" aria-hidden="true" />
          {project.kind} · {project.year}
        </p>
        <h3 id={`${project.slug}-title`} className="display text-[clamp(2.5rem,5vw,4.75rem)]">
          <a href={projectPath(project.slug)} onClick={open} className="transition-colors hover:text-accent">
            {project.name}
          </a>
        </h3>
        {project.alias && <p className="-mt-3 font-mono text-xs text-mute">también: {project.alias}</p>}
        <p className="serif-accent text-2xl leading-tight">{project.tagline}</p>
        <p className="max-w-[46ch] text-fog">{project.summary}</p>
        <StackChips stack={project.stack} limit={6} />
        <a
          href={projectPath(project.slug)}
          onClick={open}
          className="mt-2 flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          tabIndex={-1}
          aria-hidden="true"
        >
          Problema, solución y arquitectura
          <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
        </a>
      </div>
    </article>
  )
}
