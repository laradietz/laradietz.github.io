import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { App } from './App'

/** Waits for lazy chunks (the case study), so every route is prerendered with its full content. */
export async function render(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}

export { allPages, renderSeoTags } from './seo'
export { site } from './config/site'
export { siteUrl } from './lib/siteUrl'
export { collectPendingContent } from './content/pendingReport'
