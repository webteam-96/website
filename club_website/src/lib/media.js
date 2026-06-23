// Builds a fully-qualified URL for a server-relative media path returned by the
// API (e.g. "/Documents/directory/abc.jpg" → "https://rizones45678.org/API/Documents/directory/abc.jpg").
//
// Images are loaded as <img src> / CSS, which are NOT subject to CORS, so they
// can point straight at the API host (no proxy needed — unlike the JSON fetches).
const MEDIA_BASE = (import.meta.env.VITE_MEDIA_URL || 'https://rizones45678.org/API').replace(/\/+$/, '')

export function mediaUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path // already absolute
  return MEDIA_BASE + (path.startsWith('/') ? path : '/' + path)
}
