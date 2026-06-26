// Axios service layer for the public Rotary club-website API.
// Every per-club call is parameterised by `websiteId` (= the API's clubId) and,
// where the data is year-scoped, a `yearId`. Contract mirrors RotaryApi
// ClubWebsitePublicDataController.
import { getOrNull, getOrEmpty } from '../lib/http'

const club = (websiteId) => `/public/club/${websiteId}`
const withYear = (yearId) => (yearId ? { params: { yearId } } : undefined)

// ── Tenant / website resolution ─────────────────────────────────────────────
// host → { clubId (websiteId), clubName, themeKey, status, ... }
export const resolveWebsiteByHost = (host) =>
  getOrNull('/public/club-website/by-host', { params: { host } })

export const fetchYears = (websiteId) => getOrEmpty(`${club(websiteId)}/years`)

// ── Year-scoped feeds ───────────────────────────────────────────────────────
export const fetchAbout = (websiteId, yearId) => getOrNull(`${club(websiteId)}/about`, withYear(yearId))
export const fetchBanners = (websiteId, yearId) => getOrEmpty(`${club(websiteId)}/banners`, withYear(yearId))
export const fetchAdvertisements = (websiteId, yearId) => getOrEmpty(`${club(websiteId)}/advertisements`, withYear(yearId))
export const fetchDirectors = (websiteId, yearId) => getOrEmpty(`${club(websiteId)}/bod`, withYear(yearId))
export const fetchProjects = (websiteId, yearId) => getOrEmpty(`${club(websiteId)}/projects`, withYear(yearId))
export const fetchMeetings = (websiteId, yearId) => getOrEmpty(`${club(websiteId)}/meetings`, withYear(yearId))
export const fetchProjectDetail = (websiteId, projectId, yearId) =>
  getOrNull(`${club(websiteId)}/projects/${projectId}`, withYear(yearId))
export const fetchInternationalPresident = (websiteId, yearId) =>
  getOrNull(`${club(websiteId)}/international-president`, withYear(yearId))
export const fetchDistrictGovernor = (websiteId, yearId) =>
  getOrNull(`${club(websiteId)}/district-governor`, withYear(yearId))
export const fetchNewsletters = (websiteId, yearId, limit = 12) =>
  getOrEmpty(`${club(websiteId)}/newsletters`, { params: { ...(yearId ? { yearId } : {}), limit } })

// ── Year-independent feeds ──────────────────────────────────────────────────
export const fetchDirectory = (websiteId) => getOrEmpty(`${club(websiteId)}/directory`)
export const fetchPastPresidents = (websiteId) => getOrEmpty(`${club(websiteId)}/past-presidents`)
export const fetchMenus = (websiteId) => getOrEmpty(`${club(websiteId)}/menus`)
export const fetchCalendar = (websiteId, date) =>
  getOrNull(`${club(websiteId)}/calendar`, date ? { params: { date } } : undefined)
export const fetchUpcomingEvents = (websiteId, limit = 6) =>
  getOrEmpty(`${club(websiteId)}/upcoming-events`, { params: { limit } })
