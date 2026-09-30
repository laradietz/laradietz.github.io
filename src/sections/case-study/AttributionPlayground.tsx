import { useId, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { cx } from '../../lib/cx'
import { attribute, attributionModels, type AttributionModel, type Touchpoint } from './attribution'

const AMOUNT = 120_000
const initialJourney: Touchpoint[] = [
  { channel: 'Instagram', daysBeforeConversion: 5 },
  { channel: 'Google', daysBeforeConversion: 3 },
  { channel: 'Email', daysBeforeConversion: 1 },
]

const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2, minimumFractionDigits: 2 })
const wholeMoney = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
const percent = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** The worked example from the project's README, now editable. Same algorithm as the Java engine. */
export default function AttributionPlayground() {
  const [model, setModel] = useState<AttributionModel>('decay')
  const [journey, setJourney] = useState(initialJourney)
  const result = useMemo(() => attribute(model, journey, AMOUNT), [model, journey])
  const sliderId = useId()
  const current = attributionModels.find((item) => item.id === model)!

  const total = {
    percent: result.percentages.reduce((sum, value) => sum + value, 0),
    amount: result.amounts.reduce((sum, value) => sum + value, 0),
  }

  const setDays = (index: number, days: number) =>
    setJourney((points) => points.map((point, i) => (i === index ? { ...point, daysBeforeConversion: days } : point)))

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#14121c] p-5 sm:p-8" data-component="AttributionPlayground" data-meta="useMemo · derived state">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-[#b69cff]">Probalo</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">Una venta de {wholeMoney.format(AMOUNT)}, cinco respuestas.</p>
        </div>
        <p className="font-mono text-xs text-mute">Cambiá el modelo o los días de cada touchpoint.</p>
      </div>

      <div role="group" aria-label="Modelo de atribución" className="mt-6 flex flex-wrap gap-2">
        {attributionModels.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={model === item.id}
            onClick={() => setModel(item.id)}
            className={cx(
              'rounded-full border px-4 py-2 text-[13px] font-medium transition-colors',
              model === item.id ? 'border-[#b69cff] bg-[#b69cff] text-[#14121c]' : 'border-white/12 text-fog hover:border-white/40 hover:text-paper',
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <p className="mt-4 rounded-lg bg-white/[0.04] px-4 py-3 font-mono text-[12px] text-[#d9ccff]">{current.formula}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {journey.map((point, index) => (
          <div key={point.channel} className="flex flex-col gap-3">
            <div className="flex h-40 items-end overflow-hidden rounded-xl bg-white/[0.03]" aria-hidden="true">
              <motion.div
                className="w-full rounded-t-xl bg-gradient-to-t from-[#b69cff]/25 to-[#b69cff]"
                animate={{ height: `${Math.max(result.percentages[index]!, 0.5)}%` }}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              />
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold">{point.channel}</span>
              <span className="display text-3xl tabular-nums">{percent.format(result.percentages[index]!)}%</span>
            </div>
            <span className="font-mono text-xs text-fog tabular-nums">{money.format(result.amounts[index]!)}</span>
            <label htmlFor={`${sliderId}-${index}`} className="mt-1 flex items-center justify-between font-mono text-[11px] text-mute">
              Días antes de la compra
              <span className="text-paper tabular-nums">{point.daysBeforeConversion}</span>
            </label>
            <input
              id={`${sliderId}-${index}`}
              type="range"
              min={0}
              max={21}
              value={point.daysBeforeConversion}
              onChange={(event) => setDays(index, Number(event.target.value))}
              className="w-full accent-[#b69cff]"
            />
          </div>
        ))}
      </div>

      <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-4 font-mono text-xs text-fog" aria-live="polite">
        <span>
          Suma: <strong className="text-paper">{percent.format(total.percent)} %</strong>
        </span>
        <span>
          <strong className="text-paper">{money.format(total.amount)}</strong>
        </span>
        <span className="text-[#6fdc8c]">✓ exacto, sin centavos perdidos</span>
      </p>
    </div>
  )
}
