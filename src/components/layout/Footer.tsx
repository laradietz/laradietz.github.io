import { ArrowUp } from 'lucide-react'
import { site, socials } from '../../config/site'
import { LocalTime } from '../ui/LocalTime'
import { SmartLink } from '../ui/SmartLink'

export function Footer() {
  return (
    <footer id="site-footer" className="gutter relative bg-accent pb-8 text-ink" data-component="Footer">
      <div className="grid gap-8 border-t border-ink/20 pt-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <p className="text-lg font-semibold tracking-tight">{site.name}</p>
          <p className="text-sm text-ink/80">Frontend & Full Stack Developer</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium md:col-span-5">
          <li>
            <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
              Email
            </a>
          </li>
          {Object.values(socials).map((social) => (
            <li key={social.label}>
              <SmartLink href={social.href} className="underline-offset-4 hover:underline">
                {social.label}
              </SmartLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
          <p className="font-mono text-xs text-ink/80">
            © {new Date().getFullYear()} · <LocalTime suffix=" ART" fallback="ART" />
          </p>
          <a
            href="#inicio"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-accent"
            aria-label="Volver arriba"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="mt-8 font-mono text-[11px] text-ink/80">
        Diseñado y desarrollado por {site.name} con React, TypeScript, Tailwind CSS y Motion.
      </p>
    </footer>
  )
}
