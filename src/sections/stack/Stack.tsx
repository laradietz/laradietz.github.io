import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../content/projects'
import { getTech, techCategories, techs, type TechCategory, type TechId } from '../../content/stack'
import { cx } from '../../lib/cx'
import { projectPath } from '../../lib/router'
import { openProject } from '../../lib/transitionOrigin'
import { RevealText } from '../../components/motion/RevealText'
import { Reveal } from '../../components/motion/Reveal'
import { Marquee } from './Marquee'
import { projectsByTech } from './stackIndex'
import { TechTile } from './TechTile'

type Filter = TechCategory | 'all'
type Hover = { kind: 'tech'; id: TechId } | { kind: 'project'; slug: string } | null

export function Stack() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<TechId>('react')
  const [hover, setHover] = useState<Hover>(null)

  const focusTech = hover?.kind === 'tech' ? hover.id : hover ? null : selected
  const focusProject = hover?.kind === 'project' ? projects.find((project) => project.slug === hover.slug) : undefined
  const usedIn = focusTech ? (projectsByTech.get(focusTech) ?? []) : []

  const isLit = (id: TechId) => {
    if (focusProject) return focusProject.stack.includes(id)
    return filter === 'all' || getTech(id).category === filter
  }

  const selectedTech = getTech(selected)
  const selectedProjects = projectsByTech.get(selected) ?? []

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative z-10 bg-ink py-[clamp(5rem,10vw,9rem)]"
      data-component="Stack"
      data-meta="derived state · useVelocity"
    >
      <div className="gutter grid gap-10 lg:grid-cols-12">
        <p className="eyebrow text-mute lg:col-span-3">
          <span className="text-accent">02</span> — Stack
        </p>
        <div className="lg:col-span-9">
          <RevealText
            as="h2"
            id="stack-title"
            lines={['Un stack probado', { text: 'en proyectos reales.', className: 'text-mute' }]}
            className="display text-[clamp(2.6rem,7vw,7.5rem)]"
          />
          <p className="mt-6 max-w-[52ch] text-lg text-fog">
            Cada elemento de la tabla sale de un proyecto que construí. Pasá por una tecnología para ver dónde la usé, o por un proyecto para ver su stack.
          </p>
        </div>
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)]">
        <Marquee />
      </div>

      <div className="gutter mt-12 grid gap-10 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
            {[{ id: 'all', label: 'Todo' } as const, ...techCategories].map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={filter === category.id}
                onClick={() => setFilter(category.id)}
                className={cx(
                  'rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors',
                  filter === category.id ? 'border-paper bg-paper text-ink' : 'border-white/12 text-fog hover:border-white/40 hover:text-paper',
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          <ul className="mt-6 grid grid-cols-5 gap-1.5 sm:grid-cols-6 lg:grid-cols-8" onPointerLeave={() => setHover(null)}>
            {techs.map((tech, index) => (
              <li key={tech.id}>
                <TechTile
                  tech={tech}
                  number={index + 1}
                  usage={projectsByTech.get(tech.id)?.length ?? 0}
                  lit={isLit(tech.id)}
                  selected={selected === tech.id}
                  onSelect={() => setSelected(tech.id)}
                  onHover={() => setHover({ kind: 'tech', id: tech.id })}
                />
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-8 xl:col-span-4" aria-label="Detalle del stack">
          <Reveal className="rounded-2xl border border-white/10 bg-ink-2 p-6" aria-live="polite">
            <p className="eyebrow text-mute">Seleccionado</p>
            <p className="display mt-3 text-5xl text-accent">{selectedTech.symbol}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{selectedTech.name}</p>
            <p className="mt-1 text-sm text-mute">{techCategories.find((category) => category.id === selectedTech.category)?.label}</p>
            <p className="mt-6 text-sm text-fog">
              Usado en {selectedProjects.length} {selectedProjects.length === 1 ? 'proyecto' : 'proyectos'}:
            </p>
            <ul className="mt-3 flex flex-col">
              {selectedProjects.map((project) => (
                <li key={project.slug} className="border-t border-white/8">
                  <a
                    href={projectPath(project.slug)}
                    onClick={(event) => openProject(project.slug, event)}
                    className="group flex items-center justify-between py-2.5 text-[15px] transition-colors hover:text-accent"
                  >
                    {project.name}
                    <ArrowUpRight size={15} className="text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div>
            <p className="eyebrow text-mute">Stack por proyecto</p>
            <ul className="mt-3 flex flex-wrap gap-2" onPointerLeave={() => setHover(null)}>
              {projects.map((project) => {
                const related = focusTech !== null && usedIn.includes(project)
                const active = focusProject?.slug === project.slug
                return (
                  <li key={project.slug}>
                    <a
                      href={projectPath(project.slug)}
                      onClick={(event) => openProject(project.slug, event)}
                      onPointerEnter={() => setHover({ kind: 'project', slug: project.slug })}
                      onFocus={() => setHover({ kind: 'project', slug: project.slug })}
                      onBlur={() => setHover(null)}
                      className={cx(
                        'relative block rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-300',
                        active ? 'border-accent bg-accent text-ink' : related ? 'border-accent/60 text-paper' : 'border-white/10 text-mute',
                      )}
                    >
                      {related && !active && (
                        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-accent" aria-hidden="true" />
                      )}
                      {project.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
