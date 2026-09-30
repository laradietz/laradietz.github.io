import { ArrowUpRight } from 'lucide-react'
import { archivedProjects, projects } from '../../content/projects'
import { RevealText } from '../../components/motion/RevealText'
import { Reveal } from '../../components/motion/Reveal'
import { FeaturedProject } from './FeaturedProject'
import { ProjectCard } from './ProjectCard'
import { StackChips } from './StackChips'

export function Work() {
  const [featured, ...rest] = projects

  return (
    <section id="proyectos" aria-labelledby="work-title" className="relative z-10 bg-ink pt-[clamp(4rem,8vw,7rem)] pb-[clamp(5rem,10vw,9rem)]" data-component="Work">
      <div className="gutter">
        <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-12">
          <p className="eyebrow text-mute lg:col-span-3">
            <span className="text-accent">03</span> — Proyectos
          </p>
          <div className="flex items-start justify-between gap-6 lg:col-span-9">
            <RevealText
              as="h2"
              id="work-title"
              lines={['Casos, no', { text: 'capturas sueltas.', className: 'text-mute' }]}
              className="display text-[clamp(2.6rem,7vw,7.5rem)]"
            />
            <span className="display text-[clamp(1.5rem,3vw,3rem)] text-mute" aria-hidden="true">
              ({String(projects.length).padStart(2, '0')})
            </span>
          </div>
        </div>

        <div className="mt-[clamp(4rem,8vw,7rem)]">{featured && <FeaturedProject project={featured} />}</div>

        <div className="mt-[clamp(6rem,12vw,11rem)] flex flex-col gap-[clamp(5rem,10vw,9rem)]">
          {rest.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 2} flip={index % 2 === 1} />
          ))}
        </div>

        <Reveal className="mt-[clamp(6rem,12vw,10rem)]">
          <h3 className="eyebrow text-mute">También en GitHub</h3>
          <ul className="mt-4 border-t border-white/10">
            {archivedProjects.map((project) => (
              <li key={project.name} className="border-b border-white/10">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-6 transition-colors hover:bg-ink-2 md:grid-cols-12 md:items-center md:px-4"
                >
                  <span className="text-2xl font-semibold tracking-tight md:col-span-3">{project.name}</span>
                  <span className="font-mono text-xs text-mute md:col-span-2">{project.kind}</span>
                  <span className="text-fog md:col-span-4">{project.summary}</span>
                  <span className="flex items-center justify-between gap-3 md:col-span-3">
                    <StackChips stack={project.stack} limit={3} />
                    <ArrowUpRight size={18} className="shrink-0 text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
                    <span className="sr-only">(abre GitHub en otra pestaña)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
