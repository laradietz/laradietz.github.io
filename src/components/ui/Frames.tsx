import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

export function BrowserFrame({ children, url, className }: { children: ReactNode; url: string; className?: string }) {
  return (
    <div className={cx('overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]', className)}>
      <div className="flex items-center gap-3 border-b border-white/8 px-3 py-2" aria-hidden="true">
        <span className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-white/15" />
          <i className="size-2.5 rounded-full bg-white/15" />
          <i className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto truncate rounded-md bg-white/6 px-3 py-0.5 font-mono text-[10px] text-fog">{url}</span>
        <span className="w-10" />
      </div>
      {children}
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('overflow-hidden rounded-[1.6rem] border-[5px] border-ink-3 bg-ink-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]', className)}>
      <div className="overflow-hidden rounded-[1.25rem]">{children}</div>
    </div>
  )
}
