import type { ProjectMedia } from '../../content/types'
import { BrowserFrame, PhoneFrame } from '../../components/ui/Frames'
import { Picture } from '../../components/ui/Picture'

type Screens = Extract<ProjectMedia, { kind: 'screens' }>

/** Horizontal, snap-scrolling strip: native scrolling keeps it usable with touch, trackpad and keyboard. */
export function Gallery({ media }: { media: Screens }) {
  return (
    <div className="mt-14">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="eyebrow text-mute">Capturas</h4>
        <p className="font-mono text-[11px] text-mute">Deslizá →</p>
      </div>
      <ul
        className="mt-4 -mx-(--gutter) flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--gutter) pb-4 [scrollbar-width:thin]"
        tabIndex={0}
        aria-label="Capturas del proyecto"
      >
        {media.desktop.map((shot) => (
          <li key={shot.image} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[46vw]">
            <figure>
              <BrowserFrame url={shot.image.replace('/', ' · /')}>
                <Picture image={shot.image} alt={shot.caption} sizes="(min-width: 1024px) 46vw, 82vw" />
              </BrowserFrame>
              <figcaption className="mt-3 text-sm text-fog">{shot.caption}</figcaption>
            </figure>
          </li>
        ))}
        {media.mobile.map((shot) => (
          <li key={shot.image} className="w-[46vw] shrink-0 snap-start sm:w-[26vw] lg:w-[16vw]">
            <figure>
              <PhoneFrame>
                <Picture image={shot.image} alt={shot.caption} sizes="(min-width: 1024px) 16vw, 46vw" />
              </PhoneFrame>
              <figcaption className="mt-3 text-sm text-fog">{shot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}
