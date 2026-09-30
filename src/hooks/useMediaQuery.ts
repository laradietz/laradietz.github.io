import { useCallback, useSyncExternalStore } from 'react'

/** Server render (and hydration) always assumes `false`, so the markup never depends on the device. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
