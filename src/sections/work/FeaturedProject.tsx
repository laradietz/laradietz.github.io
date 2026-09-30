import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../content/types'
import { projectPath } from '../../lib/router'
import { openProject } from '../../lib/transitionOrigin'
import { Magnetic } from '../../components/motion/Magnetic'
import { BrowserFrame, PhoneFrame } from '../../components/ui/Frames'
import { Picture } from '../../components/ui/Picture'
import { SmartLink } from '../../components/ui/SmartLink'
import { StackChips } from './StackChips'

/** The lead project: sticky copy on one side, screens drifting at different speeds on the other. */
export function FeaturedProject({ project }: { project: Project }) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] })
  const slow = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const fast = useTransform(scrollYProgress, [0, 1], ['22%', '-22%'])
  const faster = useTransform(scrollYProgress, [0, 1], ['38%', '-30%'])
  const reducedMotion = useReducedMotion()
  const drift = (y: typeof slow) => (reducedMotion ? undefined : { y })

  if (project.media.kind !== 'screens') return null
  const { desktop, mobile } = project.media
  const open = (event: React.MouseEvent<HTMLAnchorElement>) => openProject(project.slug, event)

  return (
    <article className="relative grid gap-12 lg:grid-cols-12" aria-labelledby={`${project.slug}-title`} data-component="FeaturedProject" data-meta="parallax · sticky">
      <div className="lg:col-span-5">
        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <p className="flex items-center gap-3 font-mono text-xs text-mute">
            <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-ink">Proyecto principal</span>
            01 · {project.year}
          </p>
          <h3 id={`${project.slug}-title`} className="display text-[clamp(3.5rem,8vw,8rem)]">
            {project.name}
          </h3>
          <p className="serif-accent text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight text-paper">{project.tagline}</p>
          <p className="max-w-[48ch] text-fog">{project.summary}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/10 py-5 text-sm">
            <div>
              <dt className="eyebrow text-mute">Tipo</dt>
              <dd className="mt-1">{project.kind}</dd>
            </div>
            <div>
              <dt className="eyebrow text-mute">Estado</dt>
              <dd className="mt-1">{project.status}</dd>
            </div>
          </dl>
          <StackChips stack={project.stack} limit={8} />
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Magnetic>
              <a
                href={projectPath(project.slug)}
                onClick={open}
                className="group flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent"
              >
                Ver caso completo
                <ArrowUpRight size={16} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
              </a>
            </Magnetic>
            {project.links.demo && (
              <SmartLink href={project.links.demo} className="flex items-center rounded-full border border-white/15 px-5 py-3 text-sm">
                Ver sitio
              </SmartLink>
            )}
            {project.links.repo && (
              <SmartLink href={project.links.repo} className="flex items-center rounded-full border border-white/15 px-5 py-3 text-sm">
                Código
              </SmartLink>
            )}
          </div>
        </div>
      </div>

      <div ref={mediaRef} className="relative lg:col-span-7">
        <a href={projectPath(project.slug)} onClick={open} data-cursor="Ver caso" className="block" aria-label={`Abrir el caso de ${project.name}`}>
          <motion.div style={drift(slow)}>
            <BrowserFrame url="portal-cafe.vercel.app">
              <Picture image={desktop[0]!.image} alt={desktop[0]!.caption} sizes="(min-width: 1024px) 55vw, 92vw" />
            </BrowserFrame>
          </motion.div>

          <div className="relative mt-10 grid grid-cols-12 items-start gap-4 sm:mt-16">
            <motion.div style={drift(fast)} className="col-span-7 sm:col-span-8">
              <BrowserFrame url="portal-cafe.vercel.app/#carta">
                <Picture image={desktop[1]!.image} alt={desktop[1]!.caption} sizes="(min-width: 1024px) 38vw, 60vw" />
              </BrowserFrame>
            </motion.div>
            <motion.div style={drift(faster)} className="col-span-5 -ml-6 sm:col-span-4 sm:-ml-10">
              <PhoneFrame className="rotate-3">
                <Picture image={mobile[0]!.image} alt={`${mobile[0]!.caption}: la misma composición adaptada al celular`} sizes="(min-width: 1024px) 18vw, 38vw" />
              </PhoneFrame>
            </motion.div>
          </div>

          <div className="mt-10 grid grid-cols-12 gap-4 sm:mt-16">
            <motion.div style={drift(faster)} className="col-span-4 sm:col-span-3">
              <PhoneFrame className="-rotate-2">
                <Picture image={mobile[1]!.image} alt={mobile[1]!.caption} sizes="(min-width: 1024px) 14vw, 30vw" />
              </PhoneFrame>
            </motion.div>
            <motion.div style={drift(slow)} className="col-span-8 sm:col-span-9">
              <BrowserFrame url="portal-cafe.vercel.app/admin">
                <Picture image="portal-cafe/panel-qr" alt="Panel de administración: generador del código QR oficial" sizes="(min-width: 1024px) 42vw, 64vw" />
              </BrowserFrame>
            </motion.div>
          </div>
        </a>
      </div>
    </article>
  )
}
