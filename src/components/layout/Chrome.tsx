import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" style={{ scaleX }} />
}

/** 12-column grid overlay shown in inspector mode. */
export function InspectorGrid() {
  return (
    <div aria-hidden="true" className="gutter pointer-events-none fixed inset-0 z-[65]">
      <div className="grid h-full grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="h-full bg-inspect/[0.06] outline outline-inspect/20 max-md:[&:nth-child(n+5)]:hidden" />
        ))}
      </div>
    </div>
  )
}

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only-focusable fixed top-3 left-3 z-[110] rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink"
    >
      Saltar al contenido
    </a>
  )
}
