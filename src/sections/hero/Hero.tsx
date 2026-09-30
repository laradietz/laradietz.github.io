import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { site, socials } from '../../config/site'
import { heroIntro } from '../../content/profile'
import { projects } from '../../content/projects'
import { projectPath } from '../../lib/router'
import { openProject } from '../../lib/transitionOrigin'
import { Magnetic } from '../../components/motion/Magnetic'
import { Reveal } from '../../components/motion/Reveal'
import { easeOutExpo } from '../../components/motion/easing'
import { GitHubIcon, LinkedInIcon } from '../../components/ui/BrandIcons'
import { LocalTime } from '../../components/ui/LocalTime'
import { SmartLink } from '../../components/ui/SmartLink'
import { ProximityName } from './ProximityName'
import { RoleTicker } from './RoleTicker'

const featured = projects[0]!

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.65])
  const reducedMotion = useReducedMotion()
  useStickyBottom(ref)

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="sticky top-0 min-h-svh overflow-hidden"
      data-component="Hero"
      data-meta="sticky · useScroll · rAF"
    >
      <motion.div style={reducedMotion ? undefined : { scale, y }} className="gutter relative flex min-h-svh origin-top flex-col pt-[calc(var(--nav-h)+1.25rem)] pb-6">
        <motion.div
          className="eyebrow flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span>Portfolio · {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">{site.location}</span>
          <LocalTime suffix=" ART" fallback="ART" />
        </motion.div>

        <h1 id="hero-title" className="display relative mt-[clamp(1.5rem,5vh,3.5rem)] text-[clamp(4.25rem,min(23vw,31svh),21rem)]">
          <ProximityName lines={[{ text: 'Lara' }, { text: 'Dietz', className: 'pl-[0.6em] sm:pl-[1.6em] lg:pl-[2.1em]' }]} />
          <span className="sr-only">{site.name}, Frontend y Full Stack Developer</span>
          <motion.span
            aria-hidden="true"
            className="serif-accent absolute top-[0.12em] right-0 hidden text-[clamp(1.5rem,3.2vw,3.25rem)] leading-none text-accent md:block"
            initial={{ opacity: 0, rotate: -8, y: 20 }}
            animate={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.9 }}
          >
            (interfaces con criterio)
          </motion.span>
        </h1>

        <div className="mt-auto grid gap-8 pt-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6 xl:col-span-5" delay={0.7}>
            <p className="font-mono text-xs tracking-wide text-accent uppercase">
              <RoleTicker roles={site.roles} />
            </p>
            <p className="mt-3 max-w-[40ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-snug text-fog">{heroIntro}</p>
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end xl:col-span-7" delay={0.85}>
            <Magnetic strength={0.45}>
              <a
                href="#proyectos"
                className="group relative grid size-32 place-items-center rounded-full bg-accent text-ink transition-colors duration-500 hover:bg-paper sm:size-36"
                aria-label="Ver proyectos"
              >
                <RotatingLabel text="Ver proyectos · Ver proyectos · " />
                <ArrowDown className="transition-transform duration-500 ease-out-expo group-hover:translate-y-1" size={26} aria-hidden="true" />
              </a>
            </Magnetic>
            <div className="flex flex-col gap-3">
              <Magnetic>
                <a
                  href="#contacto"
                  className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  Hablemos <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
              <div className="flex gap-2">
                <SmartLink
                  href={socials.github.href}
                  ariaLabel="GitHub de Lara Dietz"
                  className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <GitHubIcon />
                </SmartLink>
                <SmartLink
                  href={socials.linkedin.href}
                  ariaLabel="LinkedIn de Lara Dietz"
                  className="flex h-11 items-center rounded-full border border-white/15 px-3.5 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <LinkedInIcon />
                </SmartLink>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[13px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="flex items-center gap-2.5 text-fog">
            <span className="size-2 rounded-full bg-[#6fdc8c] motion-safe:animate-[pulse-dot_2.4s_ease-in-out_infinite]" aria-hidden="true" />
            Buscando mi próximo rol como Frontend / Full Stack Developer
          </p>
          <a
            href={projectPath(featured.slug)}
            onClick={(event) => openProject(featured.slug, event)}
            className="group flex items-center gap-2 text-fog transition-colors hover:text-paper"
          >
            <span className="eyebrow text-accent">Ahora</span>
            {featured.name}: {featured.kind.toLowerCase()}
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
    </section>
  )
}

function RotatingLabel({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full motion-safe:animate-[spin_14s_linear_infinite]" aria-hidden="true">
      <defs>
        <path id="hero-cta-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-current font-mono text-[8.4px] font-medium tracking-[0.18em] uppercase">
        <textPath href="#hero-cta-circle">{text}</textPath>
      </text>
    </svg>
  )
}

/**
 * The hero stays pinned while "Sobre mí" slides over it. When it is taller than the viewport
 * (short phones), a negative top lets it scroll to its bottom edge before pinning.
 */
function useStickyBottom(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const update = () => {
      element.style.top = `${Math.min(0, window.innerHeight - element.offsetHeight)}px`
    }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [ref])
}
