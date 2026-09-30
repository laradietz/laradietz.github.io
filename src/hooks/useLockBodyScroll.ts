import { useEffect } from 'react'

/** Locks page scroll while an overlay is open, compensating the scrollbar so nothing shifts. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { documentElement: html, body } = document
    const scrollbar = window.innerWidth - html.clientWidth
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    return () => {
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
    }
  }, [locked])
}
