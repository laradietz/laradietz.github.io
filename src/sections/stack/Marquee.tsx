import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { techs } from '../../content/stack'

/** Endless strip of the stack that leans with the scroll speed. */
export function Marquee() {
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 })
  const skewX = useTransform(velocity, [-2500, 2500], [10, -10], { clamp: true })
  const reducedMotion = useReducedMotion()
  const names = techs.map((tech) => tech.name)

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-white/8 py-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div style={reducedMotion ? undefined : { skewX }} className="flex w-max motion-safe:animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {names.map((name, index) => (
              <span key={name} className="display flex items-center text-[clamp(2.25rem,5vw,4.5rem)] whitespace-nowrap">
                <span className={index % 3 === 1 ? 'serif-accent font-normal tracking-normal text-accent' : index % 3 === 2 ? 'text-transparent [-webkit-text-stroke:1px_var(--color-fog)]' : ''}>
                  {name}
                </span>
                <span className="mx-6 size-2 rounded-full bg-white/20 md:mx-10" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
