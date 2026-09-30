import { motion, type HTMLMotionProps } from 'motion/react'
import { easeOutExpo } from './easing'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Fade + rise + unblur when the element enters the viewport. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
