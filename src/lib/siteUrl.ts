type SiteUrl = { ok: true; url: string } | { ok: false; url: string; reason: string }

const FALLBACK = 'https://portfolio.example'

function resolveSiteUrl(raw: string | undefined): SiteUrl {
  if (!raw) return { ok: false, url: FALLBACK, reason: 'PUBLIC_SITE_URL no está definida.' }
  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== 'https:') return { ok: false, url: FALLBACK, reason: 'PUBLIC_SITE_URL debe usar https.' }
    return { ok: true, url: parsed.origin }
  } catch {
    return { ok: false, url: FALLBACK, reason: `PUBLIC_SITE_URL no es una URL válida: "${raw}".` }
  }
}

export const siteUrl = resolveSiteUrl(import.meta.env.PUBLIC_SITE_URL as string | undefined)
