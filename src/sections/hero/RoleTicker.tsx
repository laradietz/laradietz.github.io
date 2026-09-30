import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { easeOutExpo } from '../../components/motion/easing'

/** Cycles through the roles. Decorative: the full text is available to assistive tech elsewhere. */
export function RoleTicker({ roles, interval = 2800 }: { roles: readonly string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % roles.length), interval)
    return () => window.clearInterval(id)
  }, [interval, reducedMotion, roles.length])

  if (reducedMotion) return <span aria-hidden="true">{roles.join(' / ')}</span>

  return (
    <span aria-hidden="true" className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
