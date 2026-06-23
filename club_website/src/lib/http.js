import axios from 'axios'

// Single axios instance for the Rotary public API. Base URL is overridable per
// environment with VITE_API_URL. The API CORS-whitelists specific origins
// (e.g. http://localhost:3000) — run dev on port 3000, and add each deployed
// website domain to the API's CORS allow-list for production.
const baseURL = (import.meta.env.VITE_API_URL || 'https://rizones45678.org/API/api').replace(/\/+$/, '')

export const http = axios.create({
  baseURL,
  headers: { Accept: 'application/json' },
  timeout: 15000,
})

// GET → data, or null on 204 / any error (so callers can fall back to a static
// snapshot without try/catch everywhere).
export async function getOrNull(url, config) {
  try {
    const res = await http.get(url, config)
    return res.status === 204 ? null : (res.data ?? null)
  } catch {
    return null
  }
}

// GET → array (never null), for list endpoints.
export async function getOrEmpty(url, config) {
  const data = await getOrNull(url, config)
  return Array.isArray(data) ? data : []
}
