import { getTech, type TechId } from '../../content/stack'
import { cx } from '../../lib/cx'

export function StackChips({ stack, limit, tone = 'dark' }: { stack: TechId[]; limit?: number; tone?: 'dark' | 'light' }) {
  const visible = limit ? stack.slice(0, limit) : stack
  const hidden = stack.length - visible.length
  const chip = cx('rounded-full border px-2.5 py-1 font-mono text-[11px]', tone === 'dark' ? 'border-white/12 text-fog' : 'border-ink/15 text-mute-paper')
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
      {visible.map((id) => (
        <li key={id} className={chip}>
          {getTech(id).name}
        </li>
      ))}
      {hidden > 0 && (
        <li className={chip} aria-label={`y ${hidden} más`}>
          +{hidden}
        </li>
      )}
    </ul>
  )
}
