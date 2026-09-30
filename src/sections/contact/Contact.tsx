import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { site, socials } from '../../config/site'
import { easeOutExpo } from '../../components/motion/easing'
import { Magnetic } from '../../components/motion/Magnetic'
import { Reveal } from '../../components/motion/Reveal'
import { GitHubIcon, LinkedInIcon } from '../../components/ui/BrandIcons'
import { SmartLink } from '../../components/ui/SmartLink'
import { CopyEmail } from './CopyEmail'

const word = 'Hablemos.'

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="relative z-10 -mt-[clamp(1.75rem,4vw,3.5rem)] overflow-hidden rounded-t-[clamp(1.75rem,4vw,3.5rem)] bg-accent pt-[clamp(4.5rem,10vw,9rem)] pb-[clamp(3rem,6vw,5rem)] text-ink"
      data-component="Contact"
    >
      <div className="gutter">
        <p className="eyebrow">04 — Contacto</p>

        <h2 id="contact-title" className="display mt-6 text-[clamp(3.25rem,17vw,19rem)] leading-[0.8]">
          <span className="sr-only">{word}</span>
          <motion.span
            aria-hidden="true"
            className="flex overflow-hidden pb-[0.04em] whitespace-nowrap"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          >
            {Array.from(word).map((char, index) => (
              <motion.span
                key={index}
                className="inline-block transition-colors duration-300 hover:text-paper"
                whileHover={{ y: '-7%', transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                variants={{
                  hidden: { y: '100%', rotate: 8 },
                  shown: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: easeOutExpo, delay: index * 0.05 } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h2>

        <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-[34ch] text-[clamp(1.35rem,2.2vw,2rem)] leading-tight font-medium tracking-tight">
              Busco mi próximo rol como Frontend o Full Stack Developer.
              <span className="serif-accent font-normal"> Si tu equipo construye productos donde el detalle importa, conversemos.</span>
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-4 lg:col-span-6" delay={0.1}>
            <CopyEmail email={site.email} />
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent('Hola Lara')}`}
                  className="flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
                >
                  Escribir un email <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
              <SmartLink href={socials.github.href} className="flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-accent">
                <GitHubIcon size={16} /> GitHub
              </SmartLink>
              <SmartLink href={socials.linkedin.href} className="flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-accent">
                <LinkedInIcon size={16} /> LinkedIn
              </SmartLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
