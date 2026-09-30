import type { MaybePending } from '../lib/pending'
import type { ImageKey } from './images.generated'
import type { TechId } from './stack'

export interface Shot {
  image: ImageKey
  caption: string
}

/** Coded illustrations for projects that don't have captures yet (see ProjectMotif). */
export type Motif = 'modules' | 'attribution' | 'layers' | 'ledger'

export type ProjectMedia =
  | { kind: 'screens'; cover: ImageKey; desktop: Shot[]; mobile: Shot[] }
  | { kind: 'motif'; motif: Motif }

export interface Fact {
  value: string
  label: string
}

export interface TitledText {
  title: string
  body: string
}

export interface ArchitectureLayer {
  name: string
  detail: string
  items: string[]
}

export interface Project {
  slug: string
  name: string
  alias?: string
  year: number
  kind: string
  tagline: string
  summary: string
  status: string
  stack: TechId[]
  problem: string
  solution: string[]
  features: TitledText[]
  architecture: { summary: string; layers: ArchitectureLayer[] }
  decisions: TitledText[]
  outcome: string[]
  facts: Fact[]
  links: { demo: MaybePending<string> | null; repo: MaybePending<string> | null }
  media: ProjectMedia
  /** Interactive piece embedded in the case study, loaded on demand. */
  playground?: 'attribution'
}

export interface ArchivedProject {
  name: string
  kind: string
  summary: string
  stack: TechId[]
  repo: string
}
