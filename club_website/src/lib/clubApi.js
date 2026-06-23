// Typed-ish fetch wrappers for the public Rotary club-website API.
// Contract mirrors RotaryApi ClubWebsitePublicDataController (see the
// KaizenInfotech/RotaryIndia_Admin_API_Claude repo, Club_Website/src/lib/api.ts).
//
// The API has no CORS headers, so all JSON calls go through a same-origin proxy:
//   dev  → vite.config.js server.proxy  (/club-api → rizones45678.org/API/api)
//   prod → vercel.json rewrite          (/club_website/club-api → …/API/api)
// Images are NOT proxied — see src/lib/media.js.
//
// On any error / non-2xx, getJson returns null and getList returns [] so callers
// can fall back to static data without try/catch everywhere.

// BASE_URL ends with "/", so this resolves to "/club-api" (dev) or
// "/club_website/club-api" (prod) — same origin, then proxied to the API.
const API_BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/club-api'

// Thane Hills = clubId 1 (resolved via /by-host?host=rcthanehills.rotaryindia.org).
export const CLUB_ID = Number(import.meta.env.VITE_CLUB_ID || 1)

async function getJson(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return null
    const text = await res.text()
    if (!text) return null
    return JSON.parse(text)
  } catch {
    return null
  }
}

async function getList(path) {
  const v = await getJson(path)
  return Array.isArray(v) ? v : []
}

const yq = (yearId) => (yearId ? `?yearId=${yearId}` : '')
const c = (id) => `/public/club/${id ?? CLUB_ID}`

// ── Tenant / years ─────────────────────────────────────────────────────────
export const resolveByHost = (host) =>
  getJson(`/public/club-website/by-host?host=${encodeURIComponent(host)}`)
export const getYears = (clubId) => getList(`${c(clubId)}/years`)

// ── Year-dependent feeds ───────────────────────────────────────────────────
export const getAbout = (yearId, clubId) => getJson(`${c(clubId)}/about${yq(yearId)}`)
export const getBanners = (yearId, clubId) => getList(`${c(clubId)}/banners${yq(yearId)}`)
export const getAdvertisements = (yearId, clubId) => getList(`${c(clubId)}/advertisements${yq(yearId)}`)
export const getBoardOfDirectors = (yearId, clubId) => getList(`${c(clubId)}/bod${yq(yearId)}`)
export const getProjects = (yearId, clubId) => getList(`${c(clubId)}/projects${yq(yearId)}`)
export const getMeetings = (yearId, clubId) => getList(`${c(clubId)}/meetings${yq(yearId)}`)
export const getInternationalPresident = (yearId, clubId) =>
  getJson(`${c(clubId)}/international-president${yq(yearId)}`)
export const getDistrictGovernor = (yearId, clubId) =>
  getJson(`${c(clubId)}/district-governor${yq(yearId)}`)
export const getProjectDetail = (projectId, yearId, clubId) =>
  getJson(`${c(clubId)}/projects/${projectId}${yq(yearId)}`)
export const getNewsletters = (yearId, limit = 12, clubId) =>
  getList(`${c(clubId)}/newsletters${yearId ? `?yearId=${yearId}&limit=${limit}` : `?limit=${limit}`}`)

// ── Year-independent feeds ─────────────────────────────────────────────────
export const getDirectory = (clubId) => getList(`${c(clubId)}/directory`)
export const getPastPresidents = (clubId) => getList(`${c(clubId)}/past-presidents`)
export const getMenus = (clubId) => getList(`${c(clubId)}/menus`)
export const getCalendar = (date, clubId) =>
  getJson(`${c(clubId)}/calendar${date ? `?date=${encodeURIComponent(date)}` : ''}`)
export const getUpcomingEvents = (limit = 6, clubId) =>
  getList(`${c(clubId)}/upcoming-events?limit=${limit}`)
