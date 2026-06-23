// Resolve a local asset path against the app's base URL.
//
// In dev the base is "/", but the production build runs with
// `vite build --base=/club_website/`, so the site is served from a sub-path.
// Files in public/ referenced by absolute string paths (e.g. "/images/x.png")
// are NOT rewritten by Vite, so on the deployed site they would 404. Routing
// every local asset path through asset() prepends the correct base in both
// environments. External URLs (http/https/protocol-relative/data/blob) and
// empty values pass through unchanged.
const BASE = import.meta.env.BASE_URL || '/'

export function asset(path) {
  if (!path || typeof path !== 'string') return path
  if (/^(https?:)?\/\//i.test(path) || /^(data|blob|mailto|tel):/i.test(path)) return path
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE
  return base + (path.startsWith('/') ? path : '/' + path)
}
