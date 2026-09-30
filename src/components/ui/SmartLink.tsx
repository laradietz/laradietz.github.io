import type { ReactNode } from 'react'
import { isPending, type MaybePending } from '../../lib/pending'
import { cx } from '../../lib/cx'

interface SmartLinkProps {
  href: MaybePending<string>
  children: ReactNode
  className?: string
  pendingClassName?: string
  cursor?: string
  ariaLabel?: string
}

/**
 * External link that degrades to a clearly marked, non-interactive placeholder while the
 * destination is still unknown (see lib/pending.ts). Production builds hide it instead:
 * recruiters should never see an unfinished link.
 */
export function SmartLink({ href, children, className, pendingClassName, cursor, ariaLabel }: SmartLinkProps) {
  if (isPending(href)) {
    if (import.meta.env.PROD) return null
    return (
      <span
        className={cx(className, 'cursor-help border-dashed opacity-60', pendingClassName)}
        title={`Pendiente: ${href.what}`}
        data-pending={href.what}
      >
        {children}
        <span className="ml-2 rounded-sm border border-dashed border-current px-1 font-mono text-[9px] tracking-wider uppercase">pendiente</span>
      </span>
    )
  }
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      className={className}
      data-cursor={cursor}
      aria-label={ariaLabel}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}
