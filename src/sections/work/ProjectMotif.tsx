import type { Motif } from '../../content/types'
import { cx } from '../../lib/cx'

/**
 * Coded illustrations for projects without screenshots. They describe the product (modules,
 * algorithm, layers) instead of faking an interface. Sized with container query units, so the
 * same markup works as a thumbnail and as a full-width case study header.
 */
export function ProjectMotif({ motif, className }: { motif: Motif; className?: string }) {
  const Illustration = illustrations[motif]
  return (
    <div className={cx('@container relative aspect-[16/10] w-full overflow-hidden', className)} role="img" aria-label={labels[motif]}>
      <Illustration />
      <span className="absolute top-[2.4cqw] left-[3cqw] font-mono text-[max(9px,1.3cqw)] tracking-widest text-white/35 uppercase" aria-hidden="true">
        Diagrama · {labels[motif]}
      </span>
    </div>
  )
}

const labels: Record<Motif, string> = {
  modules: 'módulos de LifeHub',
  attribution: 'modelo Time Decay',
  layers: 'capas de la API',
  ledger: 'módulos del sistema',
}

function Modules() {
  const modules = ['Tareas', 'Finanzas', 'Compras', 'Vencimientos', 'Hoy', 'Documentos', 'Vehículos', 'Calendario', 'Hogar']
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#0f1a17]">
      <div className="grid w-[74cqw] grid-cols-3 gap-[1.4cqw]">
        {modules.map((name, index) => {
          const center = name === 'Hoy'
          return (
            <div
              key={name}
              className={cx(
                'flex aspect-[5/3] flex-col justify-between rounded-[1.4cqw] border p-[1.6cqw] transition-transform duration-700 ease-out-expo',
                center ? 'border-[#6fdc8c] bg-[#6fdc8c] text-[#0f1a17]' : 'border-white/10 bg-white/[0.04] text-white/80',
                'group-hover:-translate-y-[0.6cqw]',
              )}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <span className="font-mono text-[max(8px,1.5cqw)] tracking-wider uppercase opacity-70">0{index + 1}</span>
              <span className="text-[max(10px,2.4cqw)] leading-none font-semibold tracking-tight">{name}</span>
              <span className="flex gap-[0.5cqw]" aria-hidden="true">
                <i className={cx('h-[0.5cqw] rounded-full', center ? 'w-[40%] bg-[#0f1a17]/60' : 'w-[55%] bg-white/15')} />
                <i className={cx('h-[0.5cqw] rounded-full', center ? 'w-[20%] bg-[#0f1a17]/30' : 'w-[18%] bg-white/10')} />
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Attribution() {
  // Real Time Decay result for the README's worked example (half-life 7 days, $120.000).
  const touchpoints = [
    { channel: 'Instagram', day: '1 sep', share: 27 },
    { channel: 'Google', day: '3 sep', share: 33 },
    { channel: 'Email', day: '5 sep', share: 40 },
  ]
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[4cqw] bg-[#14121c] px-[7cqw]">
      <div className="flex items-center gap-[1.5cqw] font-mono text-[max(9px,1.6cqw)] text-white/60">
        {touchpoints.map((point) => (
          <span key={point.channel} className="flex items-center gap-[1.5cqw]">
            <span className="rounded-full border border-white/20 px-[1.6cqw] py-[0.6cqw] text-white/85">{point.channel}</span>
            <span aria-hidden="true">→</span>
          </span>
        ))}
        <span className="rounded-full bg-[#b69cff] px-[1.6cqw] py-[0.6cqw] font-semibold text-[#14121c]">$120.000</span>
      </div>
      <div className="flex h-[26cqw] items-end gap-[3cqw]">
        {touchpoints.map((point) => (
          <div key={point.channel} className="flex flex-1 flex-col items-start gap-[1cqw]">
            <span className="display text-[max(18px,6cqw)] text-white">{point.share}%</span>
            <div
              className="w-full origin-bottom rounded-t-[1cqw] bg-gradient-to-t from-[#b69cff]/30 to-[#b69cff] transition-transform duration-700 ease-out-expo group-hover:scale-y-105"
              style={{ height: `${point.share * 0.45}cqw` }}
            />
            <span className="font-mono text-[max(8px,1.4cqw)] text-white/50">
              {point.channel} · {point.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Layers() {
  const layers = ['Controller', 'Service', 'Repository', 'Entity']
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#10161f] [perspective:120cqw]">
      <div className="relative h-[40cqw] w-[46cqw] [transform:rotateX(58deg)_rotateZ(-38deg)] [transform-style:preserve-3d]">
        {layers.map((layer, index) => (
          <div
            key={layer}
            className={cx(
              'absolute inset-0 flex items-end rounded-[2cqw] border p-[2.2cqw] transition-transform duration-700 ease-out-expo',
              index === 0 ? 'border-[#8fb3ff] bg-[#8fb3ff]/25' : 'border-white/20 bg-white/[0.04]',
            )}
            style={{ transform: `translateZ(${(layers.length - 1 - index) * 5}cqw)` }}
          >
            <span className="font-mono text-[max(9px,2cqw)] tracking-wider text-white/85 uppercase">{layer}</span>
          </div>
        ))}
      </div>
      <span className="absolute top-[4cqw] right-[4cqw] font-mono text-[max(9px,1.5cqw)] text-[#8fb3ff]">+ DTO · JWT · JPA</span>
    </div>
  )
}

function Ledger() {
  const rows: Array<[string, string, boolean?]> = [
    ['Ventas', 'OK'],
    ['Caja diaria', 'OK'],
    ['Stock', 'BAJO', true],
    ['Cuenta corriente', 'OK'],
    ['Devoluciones', 'OK'],
    ['Proveedores', 'OK'],
    ['Reportes PDF / Excel', 'OK'],
  ]
  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden bg-[#1b1712] pt-[6cqw]">
      <div className="w-[46cqw] rounded-t-[1cqw] bg-[#f2ede3] px-[3.5cqw] pt-[3.5cqw] pb-[10cqw] font-mono text-[#1b1712] shadow-2xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-[2cqw]">
        <p className="text-center text-[max(10px,2.4cqw)] font-bold tracking-[0.2em]">FERRETERÍA GIAN</p>
        <p className="mt-[0.6cqw] text-center text-[max(8px,1.3cqw)] opacity-60">control de stock · boleta</p>
        <div className="my-[2cqw] border-t border-dashed border-[#1b1712]/40" />
        <ul className="flex flex-col gap-[1.1cqw] text-[max(8px,1.55cqw)]">
          {rows.map(([label, status, alert]) => (
            <li key={label} className="flex items-baseline gap-[1cqw]">
              <span>{label}</span>
              <span className="flex-1 border-b border-dotted border-[#1b1712]/40" />
              <span className={alert ? 'font-bold text-[#d6452a]' : ''}>{status}</span>
            </li>
          ))}
        </ul>
        <div className="my-[2cqw] border-t border-dashed border-[#1b1712]/40" />
        <p className="flex justify-between text-[max(9px,1.8cqw)] font-bold">
          <span>SQLite</span>
          <span>Tkinter</span>
        </p>
      </div>
    </div>
  )
}

const illustrations: Record<Motif, () => React.JSX.Element> = {
  modules: Modules,
  attribution: Attribution,
  layers: Layers,
  ledger: Ledger,
}
