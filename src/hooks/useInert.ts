import { useEffect } from 'react'

/**
 * Makes the given landmarks inert while an overlay is open: no focus, no clicks and hidden
 * from assistive tech. Replaces a hand-rolled focus trap with the platform feature.
 */
export function useInert(active: boolean, ids: readonly string[]) {
  useEffect(() => {
    if (!active) return
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    for (const element of elements) element.inert = true
    return () => {
      for (const element of elements) element.inert = false
    }
  }, [active, ids])
}

/** Closes an overlay on Escape and returns focus to whatever opened it. */
export function useEscapeToClose(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const opener = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      opener?.focus({ preventScroll: true })
    }
  }, [active, onClose])
}
