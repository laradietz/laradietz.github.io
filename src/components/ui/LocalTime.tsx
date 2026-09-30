import { site } from '../../config/site'
import { useLocalTime } from '../../hooks/useLocalTime'

/** Ticking leaf component, so only this text re-renders every few seconds. */
export function LocalTime({ suffix, fallback }: { suffix: string; fallback: string }) {
  const time = useLocalTime(site.timeZone)
  return <span>{time ? `${time}${suffix}` : fallback}</span>
}
