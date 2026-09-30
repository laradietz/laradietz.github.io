import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

interface ScrollWordsProps {
  text: string
  className?: string
}

/** Words light up one after another as the paragraph crosses the viewport. */
export function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
