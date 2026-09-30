import type { ReactNode } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cx } from '../../lib/cx'
import { Reveal } from '../../components/motion/Reveal'

export const chapters = [
  { id: 'cs-problema', title: 'Problema' },
  { id: 'cs-solucion', title: 'Solución' },
  { id: 'cs-tecnologias', title: 'Tecnologías' },
  { id: 'cs-arquitectura', title: 'Arquitectura' },
  { id: 'cs-resultado', title: 'Resultado' },
] as const

const chapterIds = chapters.map((chapter) => chapter.id)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ChapterNav() {
  const active = useActiveSection(chapterIds)
  return (
    <nav aria-label="Capítulos del caso" className="hidden lg:col-span-3 lg:block">
      <ol className="sticky top-28 flex flex-col gap-1">
        {chapters.map((chapter, index) => {
          const isActive = active === chapter.id
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  // Scroll inside the dialog without adding hash entries: "Volver" relies on history.back().
                  event.preventDefault()
                  document.getElementById(chapter.id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
                }}
                className={cx('group flex items-center gap-3 py-1.5 text-sm transition-colors', isActive ? 'text-paper' : 'text-mute hover:text-fog')}
              >
                <span className={cx('h-px transition-all duration-500 ease-out-expo', isActive ? 'w-10 bg-accent' : 'w-4 bg-white/20 group-hover:w-6')} aria-hidden="true" />
                <span className="font-mono text-[11px]">0{index + 1}</span>
                {chapter.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function Chapter({ id, title, index, children }: { id: string; title: string; index: number; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <Reveal>
        <h3 id={`${id}-title`} className="mb-8 flex items-baseline gap-4 border-t border-white/10 pt-6">
          <span className="font-mono text-xs text-accent">0{index}</span>
          <span className="display text-[clamp(2rem,4vw,3.5rem)]">{title}</span>
        </h3>
        {children}
      </Reveal>
    </section>
  )
}
