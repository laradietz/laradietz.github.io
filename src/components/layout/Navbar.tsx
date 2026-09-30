import { useCallback, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ScanLine } from 'lucide-react'
import { sections, site } from '../../config/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cx } from '../../lib/cx'
import { Magnetic } from '../motion/Magnetic'
import { easeOutExpo } from '../motion/easing'
import { MobileMenu } from './MobileMenu'

const sectionIds = sections.map((section) => section.id)
const navLinks = sections.filter((section) => section.id !== 'inicio')

interface NavbarProps {
  inspecting: boolean
  onToggleInspect: () => void
}

export function Navbar({ inspecting, onToggleInspect }: NavbarProps) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > previous && y > 240)
  })

  return (
    <header id="site-header" className="fixed inset-x-0 top-0 z-50" data-component="Navbar" data-meta="useScroll · IntersectionObserver">
      <motion.div
        className={cx(
          'gutter flex h-(--nav-h) items-center justify-between gap-6 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled && !menuOpen ? 'border-white/8 bg-ink/70 backdrop-blur-xl' : 'border-transparent',
        )}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <a href="#inicio" className="group relative z-50 flex items-center gap-2.5" aria-label={`${site.name}, volver al inicio`}>
          <span className="grid size-7 place-items-center rounded-full bg-accent font-mono text-[11px] font-bold text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[-18deg]">
            ld
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/8 bg-ink-2/60 p-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cx(
                      'relative block rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-300',
                      isActive ? 'text-ink' : 'text-fog hover:text-paper',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleInspect}
            aria-pressed={inspecting}
            title="Muestra los componentes de React que forman la página"
            className={cx(
              'hidden items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors lg:flex',
              inspecting ? 'border-inspect bg-inspect text-white' : 'border-white/12 text-fog hover:border-inspect hover:text-paper',
            )}
          >
            <ScanLine size={14} aria-hidden="true" />
            Inspector
          </button>
          <Magnetic className="hidden sm:block">
            <a
              href="#contacto"
              className="block rounded-full bg-accent px-5 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-paper"
            >
              Hablemos
            </a>
          </Magnetic>
          <button
            type="button"
            className="relative z-50 grid size-11 place-items-center rounded-full border border-white/12 bg-ink-2/70 backdrop-blur-md md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <motion.span
                className="absolute left-0 block h-[1.5px] w-5 bg-paper"
                animate={menuOpen ? { top: '50%', rotate: 45 } : { top: '0%', rotate: 0 }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-5 bg-paper"
                animate={menuOpen ? { top: '50%', rotate: -45 } : { top: '100%', rotate: 0 }}
              />
            </span>
          </button>
        </div>
      </motion.div>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </header>
  )
}
