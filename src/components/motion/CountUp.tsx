import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/** Counts up to `value` the first time it scrolls into view. Server-rendered with the final number. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView || reducedMotion) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        element.textContent = Math.round(latest).toLocaleString('es-AR')
      },
    })
    return () => controls.stop()
  }, [inView, reducedMotion, value])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('es-AR')}
    </span>
  )
}
