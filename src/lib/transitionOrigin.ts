import { navigate, projectPath } from './router'

/**
 * The case study grows out of whatever was clicked. The origin rect is handed over through
 * this module instead of the URL, so deep links still open without a transition.
 */
let origin: { rect: DOMRect; at: number } | null = null

/** Read-only on purpose: StrictMode may render the case study twice in development. */
export function peekTransitionOrigin(): DOMRect | null {
  return origin && performance.now() - origin.at < 1000 ? origin.rect : null
}

/** Marks history entries created inside the site, so closing can go back instead of pushing. */
export const IN_APP_STATE = { inApp: true } as const

export function openedInApp(): boolean {
  return (window.history.state as typeof IN_APP_STATE | null)?.inApp === true
}

export function openProject(slug: string, event?: React.MouseEvent<HTMLElement>) {
  if (event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    origin = { rect: event.currentTarget.getBoundingClientRect(), at: performance.now() }
  }
  navigate(projectPath(slug), { state: IN_APP_STATE })
}
