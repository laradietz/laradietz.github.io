import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy } from 'lucide-react'

type Status = 'idle' | 'copied' | 'failed'

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const id = window.setTimeout(() => setStatus('idle'), 2200)
    return () => window.clearTimeout(id)
  }, [status])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink/20 bg-ink/[0.04] py-3 pr-3 pl-5">
      <a href={`mailto:${email}`} className="min-w-0 truncate text-[clamp(1rem,2.3vw,1.6rem)] font-semibold tracking-tight underline-offset-4 hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="relative flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-ink px-4 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            className="flex items-center gap-2"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {status === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {status === 'copied' ? 'Copiado' : status === 'failed' ? 'No se pudo copiar' : 'Copiar'}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === 'copied' ? 'Email copiado al portapapeles' : status === 'failed' ? 'No se pudo copiar el email' : ''}
      </span>
    </div>
  )
}
