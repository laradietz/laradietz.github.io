/**
 * Information that only Lara can provide (a URL, a handle…). Instead of inventing a value,
 * content files use `pending('what is missing')`: the UI renders it as a visibly unfinished
 * item and the build lists every one of them, so nothing fake ever ships silently.
 */
export interface Pending {
  readonly pending: true
  readonly what: string
}

export type MaybePending<T> = T | Pending

export function pending(what: string): Pending {
  return { pending: true, what }
}

export function isPending<T>(value: MaybePending<T>): value is Pending {
  return typeof value === 'object' && value !== null && 'pending' in value
}
