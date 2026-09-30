import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react'

/**
 * Two routes are enough for this site (`/` and `/proyectos/:slug`), so instead of a router
 * dependency this is a thin layer over the History API with `useSyncExternalStore`.
 */
const NAVIGATE_EVENT = 'app:navigate'

const InitialPathContext = createContext('/')

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  return <InitialPathContext value={initialPath}>{children}</InitialPathContext>
}

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export function usePathname(): string {
  const initialPath = useContext(InitialPathContext)
  return useSyncExternalStore(
    subscribe,
    () => normalizePath(window.location.pathname),
    () => initialPath,
  )
}

interface NavigateOptions {
  replace?: boolean
  state?: unknown
}

let navigatedInApp = false

/**
 * False until the first client-side navigation. A route rendered on first load is already in the
 * prerendered HTML, so it must not start hidden to play an entrance (that would break hydration).
 */
export const hasNavigatedInApp = () => navigatedInApp

export function navigate(path: string, { replace = false, state = null }: NavigateOptions = {}) {
  if (normalizePath(window.location.pathname) === normalizePath(path)) return
  navigatedInApp = true
  window.history[replace ? 'replaceState' : 'pushState'](state, '', path)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export const projectPath = (slug: string) => `/proyectos/${slug}`

export function matchProjectSlug(pathname: string): string | null {
  const match = /^\/proyectos\/([a-z0-9-]+)$/.exec(pathname)
  return match?.[1] ?? null
}
