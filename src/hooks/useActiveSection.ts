import { useEffect, useState } from 'react'

/**
 * The active section is the last one (in document order) crossing the middle of the viewport.
 * "Last" matters because the hero stays pinned underneath "Sobre mí" while it slides over it.
 */
export function useActiveSection<T extends string>(ids: readonly T[]): T | null {
  const [active, setActive] = useState<T | null>(null)

  useEffect(() => {
    const intersecting = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id)
          else intersecting.delete(entry.target.id)
        }
        const current = ids.findLast((id) => intersecting.has(id))
        if (current) setActive(current)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
