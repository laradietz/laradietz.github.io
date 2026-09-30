import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { cx } from '../../lib/cx'
import { easeOutExpo } from '../../components/motion/easing'

const HEAVY = 780
const LIGHT = 200
const RADIUS = 260

interface ProximityNameProps {
  lines: { text: string; className?: string }[]
}

/**
 * Each letter of the name thins out as the pointer approaches (variable font weight axis).
 * Weights are written straight to the DOM inside one rAF per pointer move: no React renders.
 * Letters keep the width they have at full weight, so the line never reflows while it reacts.
 */
export function ProximityName({ lines }: ProximityNameProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || !finePointer || reducedMotion) return
    const letters = Array.from(root.querySelectorAll<HTMLElement>('[data-letter]'))
    let centers: Array<{ x: number; y: number }> = []
    let pointer = { x: -1e4, y: -1e4 }
    let frame = 0

    const measure = () => {
      for (const letter of letters) {
        letter.style.transition = 'none'
        letter.style.width = ''
        letter.style.fontWeight = String(HEAVY)
      }
      // Centers are relative to the name block, which is sticky and transformed while scrolling.
      // Horizontal center from the letter, vertical from its line: letters may still be mid-reveal.
      const origin = root.getBoundingClientRect()
      centers = letters.map((letter) => {
        const rect = letter.getBoundingClientRect()
        const line = letter.parentElement!.getBoundingClientRect()
        letter.style.width = `${rect.width}px`
        return { x: rect.left + rect.width / 2 - origin.left, y: line.top + line.height / 2 - origin.top }
      })
      for (const letter of letters) letter.style.transition = ''
      render()
    }

    const render = () => {
      frame = 0
      const origin = root.getBoundingClientRect()
      letters.forEach((letter, index) => {
        const center = centers[index]!
        const distance = Math.hypot(pointer.x - origin.left - center.x, pointer.y - origin.top - center.y)
        const t = Math.max(0, 1 - distance / RADIUS)
        const eased = t * t * (3 - 2 * t)
        letter.style.fontWeight = String(Math.round(HEAVY - (HEAVY - LIGHT) * eased))
      })
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY }
      if (!frame) frame = requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(root)
    void document.fonts.ready.then(measure)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      for (const letter of letters) {
        letter.style.width = ''
        letter.style.fontWeight = ''
      }
    }
  }, [finePointer, reducedMotion])

  let letterIndex = 0
  return (
    <span ref={ref} aria-hidden="true" className="block">
      {lines.map((line) => (
        <span key={line.text} className={cx('block overflow-hidden', line.className)}>
          {Array.from(line.text).map((char) => {
            const index = letterIndex++
            return (
              <motion.span
                key={index}
                data-letter
                className="inline-block text-center transition-[font-weight] duration-300 ease-out-expo"
                style={{ fontWeight: HEAVY }}
                initial={{ y: '102%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.15 + index * 0.045 }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
