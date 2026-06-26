import { useEffect, useState } from 'react'

// Fetch-with-fallback hook. Calls fetchFn(); if it returns content, uses it —
// otherwise falls back to the static data so the site never goes empty (e.g.
// while a backend endpoint is down). `deps` controls re-fetching — pass
// [selectedYearId] for year-scoped data so it refetches when the year changes.
export function useApiData(fetchFn, deps, fallback) {
  const [state, setState] = useState({ data: fallback, loading: true, live: false })

  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true }))
    Promise.resolve()
      .then(fetchFn)
      .then((res) => {
        if (!alive) return
        const hasContent = Array.isArray(res) ? res.length > 0 : res != null
        setState({ data: hasContent ? res : fallback, loading: false, live: hasContent })
      })
      .catch(() => {
        if (alive) setState({ data: fallback, loading: false, live: false })
      })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
