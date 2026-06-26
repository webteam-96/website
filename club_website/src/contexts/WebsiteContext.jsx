import { createContext, useContext, useEffect, useState } from 'react'
import { resolveWebsiteByHost } from '../services/clubService'

// One codebase serves 688 club websites. Which one we are is resolved from the
// request host via the API's by-host endpoint → { clubId (websiteId), clubName,
// themeKey, status, ... }. That config is provided app-wide so every service
// call can be scoped to the right websiteId.
//
// Host resolution priority (mirrors the platform's Next.js middleware):
//   1) ?host=<domain>      query param — one-off impersonation / testing
//   2) VITE_DEV_HOST       env (dev only) — default impersonation host
//   3) window.location.hostname — real production behaviour

const WebsiteContext = createContext(null)

function resolveHost() {
  const qp = new URLSearchParams(window.location.search).get('host')
  if (qp) return qp.toLowerCase()
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_HOST) {
    return String(import.meta.env.VITE_DEV_HOST).toLowerCase()
  }
  return (window.location.hostname || '').toLowerCase()
}

// Used until the resolver returns (and if it fails). VITE_WEBSITE_ID lets a
// single-site deploy hard-pin its id without a host lookup.
const FALLBACK = {
  websiteId: Number(import.meta.env.VITE_WEBSITE_ID || 1),
  clubName: 'Rotary Club of Thane Hills',
  themeKey: 'classic-blue',
  status: 'active',
}

export function WebsiteProvider({ children }) {
  const [config, setConfig] = useState(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    resolveWebsiteByHost(resolveHost())
      .then((t) => {
        if (!alive) return
        if (t && t.clubId) {
          setConfig({
            websiteId: t.clubId,
            clubName: t.clubName,
            themeKey: t.themeKey || 'classic-blue',
            status: t.status,
            subdomain: t.subdomain,
            clientDomain: t.clientDomain,
            daysRemaining: t.daysRemaining,
          })
        }
        setLoading(false)
      })
      .catch(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  // expose the active theme on <html data-theme> for CSS-variable theming
  useEffect(() => {
    if (config.themeKey) document.documentElement.dataset.theme = config.themeKey
  }, [config.themeKey])

  return <WebsiteContext.Provider value={{ ...config, loading }}>{children}</WebsiteContext.Provider>
}

export function useWebsite() {
  return useContext(WebsiteContext) || { ...FALLBACK, loading: false }
}

export const useWebsiteId = () => useWebsite().websiteId
