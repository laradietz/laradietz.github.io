import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

type CursorState = { kind: 'idle' } | { kind: 'link' } | { kind: 'label'; label: string }

const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], summary, label[for]'

/**
 * Elements opt into a labelled cursor with `data-cursor="Ver caso"`. Everything else that is
 * interactive gets the "link" state automatically. One delegated listener per event type,
 * position written to MotionValues, React state only changes when the hovered target does.
 */
export function Cursor() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const enabled = finePointer && !reducedMotion

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 })
  const [state, setState] = useState<CursorState>({ kind: 'idle' })
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('has-custom-cursor')

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      if (labelled?.dataset.cursor) setState({ kind: 'label', label: labelled.dataset.cursor })
      else if (target.closest(INTERACTIVE)) setState({ kind: 'link' })
      else setState({ kind: 'idle' })
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      html.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const ringSize = state.kind === 'label' ? 104 : state.kind === 'link' ? 56 : 34

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.85 : 1,
          backgroundColor: state.kind === 'label' ? 'rgb(255 91 46 / 1)' : state.kind === 'link' ? 'rgb(255 91 46 / 0.14)' : 'rgb(255 91 46 / 0)',
          borderColor: state.kind === 'idle' ? 'rgb(238 234 226 / 0.45)' : 'rgb(255 91 46 / 0.9)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        initial={false}
      >
        <AnimatePresence>
          {state.kind === 'label' && (
            <motion.span
              key={state.label}
              className="font-mono text-[11px] font-semibold tracking-wide text-ink uppercase"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-paper mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: state.kind === 'label' ? 0 : 1 }}
      />
    </div>
  )
}
