import { motion } from 'motion/react'
import type { ElementType } from 'react'
import { cx } from '../../lib/cx'
import { easeOutExpo } from './easing'

type Line = string | { text: string; className: string }

interface RevealTextProps {
  /** Each entry is rendered as its own masked line. */
  lines: Line[]
  as?: ElementType
  id?: string
  className?: string
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

const textOf = (line: Line) => (typeof line === 'string' ? line : line.text)

/** Lines slide up from behind a mask. Assistive tech reads the plain text once. */
export function RevealText({ lines, as: Tag = 'p', id, className, delay = 0, stagger = 0.08, immediate = false }: RevealTextProps) {
  const trigger = immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.map(textOf).join(' ')}</span>
      <motion.span className="block" initial="hidden" {...trigger} aria-hidden="true">
        {lines.map((line, index) => (
          <span key={index} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            <motion.span
              className={cx('block', typeof line !== 'string' && line.className)}
              variants={{
                hidden: { y: '105%' },
                shown: { y: '0%', transition: { duration: 1.1, ease: easeOutExpo, delay: delay + index * stagger } },
              }}
            >
              {textOf(line)}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
