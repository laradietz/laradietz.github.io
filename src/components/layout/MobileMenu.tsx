import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sections, site, socials } from '../../config/site'
import { useInert, useEscapeToClose } from '../../hooks/useInert'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { cx } from '../../lib/cx'
import { SmartLink } from '../ui/SmartLink'
import { easeOutExpo, easeInOutQuint } from '../motion/easing'

const inertWhileOpen = ['main-content', 'site-footer'] as const

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  active: string | null
}

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const firstLink = useRef<HTMLAnchorElement>(null)
  useLockBodyScroll(open)
  useInert(open, inertWhileOpen)
  useEscapeToClose(open, onClose)

  useEffect(() => {
    if (open) firstLink.current?.focus({ preventScroll: true })
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink px-(--gutter) pt-28 pb-10 md:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 2.4rem) 2.25rem)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 2.4rem) 2.25rem)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 2.4rem) 2.25rem)' }}
          transition={{ duration: 0.75, ease: easeInOutQuint }}
          data-component="MobileMenu"
        >
          <nav aria-label="Menú">
            <ul className="flex flex-col gap-1">
              {sections.map((section, index) => (
                <li key={section.id} className="overflow-hidden">
                  <motion.a
                    ref={index === 0 ? firstLink : undefined}
                    href={`#${section.id}`}
                    onClick={(event) => {
                      // The target is inert and the page locked while the menu is open: close first, then scroll.
                      event.preventDefault()
                      onClose()
                      window.setTimeout(() => {
                        document.getElementById(section.id)?.scrollIntoView()
                        window.history.replaceState(window.history.state, '', `#${section.id}`)
                      })
                    }}
                    aria-current={active === section.id ? 'location' : undefined}
                    className={cx(
                      'display flex items-baseline gap-3 py-1 text-[clamp(2.75rem,14vw,4.5rem)]',
                      active === section.id ? 'text-accent' : 'text-paper',
                    )}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.18 + index * 0.06 }}
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-mute">0{index + 1}</span>
                    {section.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
            exit={{ opacity: 0 }}
          >
            <a href={`mailto:${site.email}`} className="text-lg break-all text-paper underline decoration-white/25 underline-offset-4">
              {site.email}
            </a>
            <div className="flex gap-3 font-mono text-xs tracking-wide uppercase">
              {Object.values(socials).map((social) => (
                <SmartLink key={social.label} href={social.href} className="rounded-full border border-white/15 px-4 py-2 text-fog">
                  {social.label}
                </SmartLink>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
