import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Cursor } from './components/cursor/Cursor'
import { InspectorGrid, ScrollProgress, SkipLink } from './components/layout/Chrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { getProject } from './content/projects'
import { matchProjectSlug, RouterProvider, usePathname } from './lib/router'
import { About } from './sections/about/About'
import { Contact } from './sections/contact/Contact'
import { Hero } from './sections/hero/Hero'
import { Stack } from './sections/stack/Stack'
import { Work } from './sections/work/Work'
import { reportPendingContent } from './content/pendingReport'

const loadCaseStudy = () => import('./sections/case-study/CaseStudy')
const CaseStudy = lazy(loadCaseStudy)

export function App({ initialPath }: { initialPath: string }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <MotionConfig reducedMotion="user">
        <Site />
      </MotionConfig>
    </RouterProvider>
  )
}

function Site() {
  const slug = matchProjectSlug(usePathname())
  const project = slug ? getProject(slug) : undefined
  const [inspecting, setInspecting] = useState(false)

  useEffect(() => {
    // The case study is split into its own chunk; fetch it once the page is idle so opening one feels instant.
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500))
    idle(() => void loadCaseStudy())
    if (import.meta.env.DEV) reportPendingContent()
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-inspect', inspecting)
  }, [inspecting])

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Cursor />
      <Navbar inspecting={inspecting} onToggleInspect={() => setInspecting((value) => !value)} />
      {inspecting && <InspectorGrid />}

      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="relative">
          <Hero />
          <About />
        </div>
        <Stack />
        <Work />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {project && (
          <Suspense key="case-study" fallback={null}>
            <CaseStudy project={project} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  )
}
