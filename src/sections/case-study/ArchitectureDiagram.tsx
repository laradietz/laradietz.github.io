import { motion } from 'motion/react'
import type { Project } from '../../content/types'
import { easeOutExpo } from '../../components/motion/easing'

/** Layers stacked top to bottom, drawn in order as they scroll into view. */
export function ArchitectureDiagram({ architecture }: { architecture: Project['architecture'] }) {
  return (
    <figure>
      <figcaption className="max-w-[56ch] text-lg text-fog">{architecture.summary}</figcaption>
      <ol className="mt-8 flex flex-col">
        {architecture.layers.map((layer, index) => (
          <motion.li
            key={layer.name}
            className="relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.08 }}
          >
            {index > 0 && (
              <span className="ml-[1.35rem] block h-6 w-px bg-gradient-to-b from-accent/70 to-white/10" aria-hidden="true" />
            )}
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-ink-2 p-5 transition-colors hover:border-accent/50 sm:grid-cols-12 sm:items-center">
              <div className="flex items-center gap-3 sm:col-span-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-accent/60 font-mono text-[11px] text-accent">{index + 1}</span>
                <div>
                  <p className="font-semibold tracking-tight">{layer.name}</p>
                  <p className="font-mono text-[11px] text-mute">{layer.detail}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-1.5 sm:col-span-8 sm:justify-end">
                {layer.items.map((item) => (
                  <li key={item} className="rounded-full bg-white/6 px-3 py-1 text-[13px] text-fog">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </figure>
  )
}
