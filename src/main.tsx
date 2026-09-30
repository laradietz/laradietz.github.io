import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { normalizePath } from './lib/router'
import './styles/index.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App initialPath={normalizePath(window.location.pathname)} />
  </StrictMode>
)

// Production HTML is prerendered per route (scripts/prerender.mjs); the dev server serves an empty root.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
