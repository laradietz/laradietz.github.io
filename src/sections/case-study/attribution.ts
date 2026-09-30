/**
 * TypeScript port of the attribution engine of Marketing Attribution Platform
 * (service/attribution in the Java backend): strategies return raw shares, and one
 * proportional rounder turns them into exact numbers whose sum is always the target.
 */
export const attributionModels = [
  { id: 'first', name: 'First Touch', formula: 'raw = 1 si es el primer touchpoint, si no 0' },
  { id: 'last', name: 'Last Touch', formula: 'raw = 1 si es el último touchpoint, si no 0' },
  { id: 'linear', name: 'Linear', formula: 'raw = 1 para todos' },
  { id: 'decay', name: 'Time Decay', formula: 'raw = 2 ^ (−Δt días / 7)' },
  { id: 'position', name: 'Position Based', formula: 'primero 40 % · último 40 % · medio 20 % / (n − 2)' },
] as const

export type AttributionModel = (typeof attributionModels)[number]['id']

export interface Touchpoint {
  channel: string
  daysBeforeConversion: number
}

const HALF_LIFE_DAYS = 7

function rawShares(model: AttributionModel, touchpoints: Touchpoint[]): number[] {
  const n = touchpoints.length
  switch (model) {
    case 'first':
      return touchpoints.map((_, index) => (index === 0 ? 1 : 0))
    case 'last':
      return touchpoints.map((_, index) => (index === n - 1 ? 1 : 0))
    case 'linear':
      return touchpoints.map(() => 1)
    case 'decay':
      return touchpoints.map((point) => 2 ** (-Math.max(0, point.daysBeforeConversion) / HALF_LIFE_DAYS))
    case 'position':
      if (n <= 2) return touchpoints.map(() => 1)
      return touchpoints.map((_, index) => (index === 0 || index === n - 1 ? 0.4 : 0.2 / (n - 2)))
  }
}

/** Rounds every share but the last; the last absorbs the remainder so the sum is exactly `target`. */
export function distribute(raw: number[], target: number, decimals: number): number[] {
  const factor = 10 ** decimals
  const total = raw.reduce((sum, share) => sum + share, 0)
  const targetUnits = Math.round(target * factor)
  let assigned = 0
  return raw.map((share, index) => {
    if (index === raw.length - 1) return (targetUnits - assigned) / factor
    const units = Math.round((share / total) * targetUnits)
    assigned += units
    return units / factor
  })
}

export function attribute(model: AttributionModel, touchpoints: Touchpoint[], amount: number) {
  const raw = rawShares(model, touchpoints)
  return {
    percentages: distribute(raw, 100, 2),
    amounts: distribute(raw, amount, 2),
  }
}
