import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getYears } from '../lib/clubApi'
import { projectYears, currentYear } from '../data/projects'

// ── Year context ────────────────────────────────────────────────────────────
// Holds the club's Rotary years + the selected year, and exposes selectYear().
// Year-dependent data hooks depend on `selectedYearId`, so changing the year in
// the header refetches the whole site's year-scoped data. Until the backend
// /years endpoint is fixed, we fall back to the static year list (no ids → API
// calls send no yearId and return the current year once those endpoints work).

const Ctx = createContext(null)

const FALLBACK_YEARS = projectYears.map((label) => ({
  id: null,
  yearLabel: label,
  isCurrent: label === currentYear,
}))

export function ClubDataProvider({ children }) {
  const [years, setYears] = useState(FALLBACK_YEARS)
  const [selectedYearId, setSelectedYearId] = useState(null)
  const [selectedYearLabel, setSelectedYearLabel] = useState(currentYear)

  useEffect(() => {
    let alive = true
    getYears().then((ys) => {
      if (!alive || !ys || !ys.length) return
      setYears(ys)
      const cur = ys.find((y) => y.isCurrent) || ys[0]
      setSelectedYearId(cur.id)
      setSelectedYearLabel(cur.yearLabel)
    })
    return () => {
      alive = false
    }
  }, [])

  // accepts a year id or a year label (the header <select> passes the label)
  const selectYear = useCallback(
    (value) => {
      const y = years.find((yy) => String(yy.id) === String(value) || yy.yearLabel === value)
      if (y) {
        setSelectedYearId(y.id)
        setSelectedYearLabel(y.yearLabel)
      } else {
        setSelectedYearLabel(String(value))
        setSelectedYearId(null)
      }
    },
    [years],
  )

  return (
    <Ctx.Provider value={{ years, selectedYearId, selectedYearLabel, selectYear }}>
      {children}
    </Ctx.Provider>
  )
}

export function useClub() {
  return (
    useContext(Ctx) || {
      years: FALLBACK_YEARS,
      selectedYearId: null,
      selectedYearLabel: currentYear,
      selectYear: () => {},
    }
  )
}

// useApiData lives in ../hooks/useApiData so this module's exports stay
// Fast-Refresh-friendly. Re-exported here for convenience.
export { useApiData } from '../hooks/useApiData'
