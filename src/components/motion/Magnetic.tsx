import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  /** Fraction of the pointer offset the element follows. */
  strength?: number
  className?: string
}

/** Pulls its child toward the pointer while hovered. Inert on touch devices and with reduced motion. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const active = finePointer && !reducedMotion
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.5 })

  const onPointerMove = (event: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!active || !rect) return
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className ?? 'inline-block'}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
