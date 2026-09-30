import { ArrowUpRight } from 'lucide-react'
import { site } from '../../config/site'
import { education, languages, manifesto, nowBuilding, principles } from '../../content/profile'
import { getProject, projects } from '../../content/projects'
import { techs } from '../../content/stack'
import { projectPath } from '../../lib/router'
import { openProject } from '../../lib/transitionOrigin'
import { CountUp } from '../../components/motion/CountUp'
import { Reveal } from '../../components/motion/Reveal'
import { RevealText } from '../../components/motion/RevealText'
import { ScrollWords } from '../../components/motion/ScrollWords'

const lifehub = getProject('lifehub')!
const lifehubTests = lifehub.facts.filter((fact) => fact.label.startsWith('tests')).reduce((sum, fact) => sum + Number(fact.value), 0)

const stats = [
  { value: projects.length, label: 'productos completos, de la interfaz a la base de datos' },
  { value: techs.length, label: 'tecnologías usadas en proyectos reales' },
  { value: lifehubTests, label: 'tests automatizados solo en LifeHub' },
  { value: 3, label: 'lenguajes de trabajo: TypeScript, Java y Python' },
]

export function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="relative z-10 rounded-t-[clamp(1.75rem,4vw,3.5rem)] bg-paper pt-[clamp(4.5rem,10vw,9rem)] pb-[clamp(5rem,10vw,9rem)] text-ink"
      data-component="About"
      data-meta="ScrollWords · CountUp"
    >
      <div className="gutter">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-mute-paper lg:col-span-3">
            <span className="text-accent">01</span> — Sobre mí
          </p>
          <div className="lg:col-span-9">
            <RevealText
              as="h2"
              id="about-title"
              lines={[
                'Frontend con criterio visual.',
                { text: 'Full stack cuando', className: 'text-mute-paper' },
                { text: 'el producto lo necesita.', className: 'text-mute-paper' },
              ]}
              className="display text-[clamp(2.6rem,6.2vw,6.75rem)]"
            />
            <ScrollWords text={manifesto} className="mt-10 max-w-[34ch] text-[clamp(1.35rem,2.6vw,2.4rem)] leading-[1.15] font-medium tracking-tight" />
          </div>
        </div>

        <dl className="mt-[clamp(4rem,9vw,8rem)] grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="flex flex-col-reverse justify-end gap-3 border-b border-ink/15 py-6 pr-4 odd:border-r lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6"
            >
              <dt className="max-w-[22ch] text-sm leading-snug text-mute-paper">{stat.label}</dt>
              <dd className="display text-[clamp(3rem,6vw,5.5rem)]">
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="eyebrow text-mute-paper">Cómo trabajo</h3>
            <p className="mt-4 max-w-[30ch] text-2xl leading-tight font-semibold tracking-tight">
              Cuatro criterios que se repiten en todo lo que construyo.
              <span className="serif-accent font-normal text-mute-paper"> Con pruebas, no promesas.</span>
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-ink/12 sm:grid-cols-2 lg:col-span-8">
            {principles.map((principle, index) => (
              <li key={principle.title} className="group flex flex-col bg-paper p-6 transition-colors duration-500 hover:bg-paper-2 sm:p-8">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h4 className="mt-6 text-xl font-semibold tracking-tight">{principle.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-mute-paper">{principle.body}</p>
                <a
                  href={projectPath(principle.evidence.projectSlug)}
                  onClick={(event) => openProject(principle.evidence.projectSlug, event)}
                  className="mt-auto flex items-center gap-1.5 pt-6 font-mono text-[11px] tracking-wide uppercase underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  Ver en: {principle.evidence.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-10 border-t border-ink/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <Fact title="Base">{site.location}</Fact>
          <Fact title="Formación">
            <ul className="space-y-2">
              {education.map((item) => (
                <li key={item.title}>
                  {item.title}
                  <span className="block text-sm text-mute-paper">
                    {item.place} · {item.period}
                  </span>
                </li>
              ))}
            </ul>
          </Fact>
          <Fact title="Idiomas">
            <ul>
              {languages.map((language) => (
                <li key={language.name}>
                  {language.name} <span className="text-mute-paper">· {language.level}</span>
                </li>
              ))}
            </ul>
          </Fact>
          <Fact title={nowBuilding.label}>
            <span className="flex gap-2.5">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden="true" />
              {nowBuilding.body}
            </span>
          </Fact>
        </div>
      </div>
    </section>
  )
}

function Fact({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-3 text-mute-paper">{title}</h3>
      <div className="text-[17px] leading-snug font-medium">{children}</div>
    </div>
  )
}
