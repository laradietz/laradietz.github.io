import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { site } from '../../config/site'
import { projects } from '../../content/projects'
import type { Project } from '../../content/types'
import { useEscapeToClose, useInert } from '../../hooks/useInert'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { hasNavigatedInApp, navigate, projectPath } from '../../lib/router'
import { IN_APP_STATE, openedInApp, peekTransitionOrigin } from '../../lib/transitionOrigin'
import { easeInOutQuint, easeOutExpo } from '../../components/motion/easing'
import { CaseHeader } from './CaseHeader'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { Chapter, ChapterNav, chapters } from './Chapters'
import { Gallery } from './Gallery'
import { StackByCategory } from './StackByCategory'
import { NextProject } from './NextProject'

const AttributionPlayground = lazy(() => import('./AttributionPlayground'))

const inertWhileOpen = ['site-header', 'main-content', 'site-footer'] as const

export default function CaseStudy({ project }: { project: Project }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [initial] = useState(() => entranceFrom(peekTransitionOrigin()))
  const { scrollYProgress } = useScroll({ container: panelRef })

  const close = useCallback(() => {
    if (openedInApp()) window.history.back()
    else navigate('/', { replace: true })
  }, [])

  useLockBodyScroll(true)
  useInert(true, inertWhileOpen)
  useEscapeToClose(true, close)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${project.name} — Caso de estudio · ${site.name}`
    panelRef.current?.scrollTo({ top: 0 })
    panelRef.current?.focus({ preventScroll: true })
    return () => {
      document.title = previousTitle
    }
  }, [project])

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]!
  const goToNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    navigate(projectPath(next.slug), { replace: true, state: openedInApp() ? IN_APP_STATE : null })
  }

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      tabIndex={-1}
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-ink outline-none"
      initial={initial}
      animate={{ clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 1 }}
      exit={{ clipPath: 'inset(100% 0px 0px 0px round 0px)', transition: { duration: 0.7, ease: easeInOutQuint } }}
      transition={{ duration: 0.9, ease: easeInOutQuint }}
      data-component="CaseStudy"
      data-meta="lazy chunk · dialog · inert"
    >
      <div className="sticky top-0 z-20 border-b border-white/8 bg-ink/80 backdrop-blur-xl">
        <div className="gutter flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={close}
            className="group flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-[13px] font-medium transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Volver
          </button>
          <p className="truncate font-mono text-xs text-mute">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')} · {project.name}
          </p>
          <a
            href={projectPath(next.slug)}
            onClick={goToNext}
            className="group hidden items-center gap-2 text-[13px] font-medium text-fog transition-colors hover:text-paper sm:flex"
          >
            Siguiente
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <motion.div aria-hidden="true" className="h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
      </div>

      <motion.div
        key={project.slug}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo, delay: initial === false ? 0 : 0.25 }}
      >
        <CaseHeader project={project} />

        <div className="gutter mt-[clamp(4rem,8vw,7rem)] grid gap-12 lg:grid-cols-12">
          <ChapterNav />
          <div className="flex flex-col gap-[clamp(5rem,9vw,8rem)] lg:col-span-9">
            <Chapter id={chapters[0].id} title={chapters[0].title} index={1}>
              <p className="text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.15] font-medium tracking-tight">{project.problem}</p>
            </Chapter>

            <Chapter id={chapters[1].id} title={chapters[1].title} index={2}>
              <div className="flex flex-col gap-5 text-lg leading-relaxed text-fog">
                {project.solution.map((paragraph) => (
                  <p key={paragraph} className="max-w-[62ch]">
                    {paragraph}
                  </p>
                ))}
              </div>
              {project.playground === 'attribution' && (
                <div className="mt-12">
                  <Suspense fallback={<div className="h-[34rem] animate-pulse rounded-3xl bg-ink-2" />}>
                    <AttributionPlayground />
                  </Suspense>
                </div>
              )}
              <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/8 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature.title} className="bg-ink p-6">
                    <h4 className="text-lg font-semibold tracking-tight">{feature.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-fog">{feature.body}</p>
                  </li>
                ))}
              </ul>
              {project.media.kind === 'screens' && <Gallery media={project.media} />}
            </Chapter>

            <Chapter id={chapters[2].id} title={chapters[2].title} index={3}>
              <StackByCategory stack={project.stack} />
            </Chapter>

            <Chapter id={chapters[3].id} title={chapters[3].title} index={4}>
              <ArchitectureDiagram architecture={project.architecture} />
              <ul className="mt-12 grid gap-6 md:grid-cols-2">
                {project.decisions.map((decision) => (
                  <li key={decision.title} className="border-t border-accent/60 pt-5">
                    <h4 className="text-lg font-semibold tracking-tight">{decision.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-fog">{decision.body}</p>
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter id={chapters[4].id} title={chapters[4].title} index={5}>
              <ul className="flex flex-col gap-4">
                {project.outcome.map((line) => (
                  <li key={line} className="flex gap-4 text-[clamp(1.2rem,2vw,1.6rem)] leading-snug font-medium tracking-tight">
                    <span className="mt-[0.55em] size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </Chapter>
          </div>
        </div>

        <NextProject project={next} onNavigate={goToNext} />
      </motion.div>
    </motion.div>
  )
}

type Entrance = false | { clipPath: string; opacity: number }

function entranceFrom(origin: DOMRect | null): Entrance {
  if (!hasNavigatedInApp()) return false
  if (!origin) return { clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 0 }
  const right = Math.max(0, window.innerWidth - origin.right)
  const bottom = Math.max(0, window.innerHeight - origin.bottom)
  return {
    clipPath: `inset(${Math.max(0, origin.top)}px ${right}px ${bottom}px ${Math.max(0, origin.left)}px round 16px)`,
    opacity: 1,
  }
}
