import type { PointerEvent } from 'react'
import type { Tech } from '../../content/stack'
import { cx } from '../../lib/cx'

const categoryTint: Record<Tech['category'], string> = {
  frontend: 'bg-accent',
  backend: 'bg-[#8fb3ff]',
  data: 'bg-[#6fdc8c]',
  tooling: 'bg-[#e6c86e]',
  desktop: 'bg-[#c9a0ff]',
}

interface TechTileProps {
  tech: Tech
  number: number
  usage: number
  lit: boolean
  selected: boolean
  onSelect: () => void
  onHover: () => void
}

/** A periodic-table cell. Tilts toward the pointer through CSS variables, without React state. */
export function TechTile({ tech, number, usage, lit, selected, onSelect, onHover }: TechTileProps) {
  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    target.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`)
    target.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
  }
  const untilt = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty('--rx', '0deg')
    event.currentTarget.style.setProperty('--ry', '0deg')
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${tech.name}, usado en ${usage} ${usage === 1 ? 'proyecto' : 'proyectos'}`}
      onClick={onSelect}
      onPointerEnter={onHover}
      onFocus={onHover}
      onPointerMove={tilt}
      onPointerLeave={untilt}
      className={cx(
        'group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-lg border p-2 text-left transition-[opacity,border-color,background-color,transform] duration-300 [transform:perspective(500px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] sm:p-2.5',
        selected ? 'border-accent bg-accent/10' : 'border-white/8 bg-ink-2 hover:border-white/30 hover:bg-ink-3',
        lit ? 'opacity-100' : 'opacity-25',
      )}
    >
      <span className="flex items-start justify-between font-mono text-[9px] text-mute sm:text-[10px]">
        {String(number).padStart(2, '0')}
        <span className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: usage }, (_, index) => (
            <i key={index} className={cx('block size-1 rounded-full', categoryTint[tech.category])} />
          ))}
        </span>
      </span>
      <span className="display text-[clamp(1.35rem,3vw,2.1rem)] leading-none transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" aria-hidden="true">
        {tech.symbol}
      </span>
      <span className="truncate text-[9px] leading-tight text-fog sm:text-[11px]" aria-hidden="true">
        {tech.name}
      </span>
      <span className={cx('absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100', categoryTint[tech.category])} aria-hidden="true" />
    </button>
  )
}
