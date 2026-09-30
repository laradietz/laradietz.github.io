import { useSyncExternalStore } from 'react'

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(timeZone: string) {
  let format = formatters.get(timeZone)
  if (!format) {
    format = new Intl.DateTimeFormat('es-AR', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false })
    formatters.set(timeZone, format)
  }
  return format
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000)
  return () => window.clearInterval(id)
}

/** "14:32" in the given time zone. Empty during server render so hydration never mismatches. */
export function useLocalTime(timeZone: string): string {
  return useSyncExternalStore(
    subscribe,
    () => formatter(timeZone).format(new Date()),
    () => '',
  )
}
