import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { fetchYears } from '../services/clubService'
import { useWebsiteId } from './WebsiteContext'
import { projectYears, currentYear } from '../data/projects'

// The header year filter lives here. Years are loaded for the active websiteId;
// changing the year updates `selectedYearId`, which every year-scoped data hook
// depends on — so the whole page refetches on year change. Falls back to the
// static year list until the backend /years endpoint is available.

const YearContext = createContext(null)

const FALLBACK_YEARS = projectYears.map((label) => ({
  id: null,
  yearLabel: label,
  isCurrent: label === currentYear,
}))

export function YearProvider({ children }) {
  const websiteId = useWebsiteId()
  const [years, setYears] = useState(FALLBACK_YEARS)
  const [selectedYearId, setSelectedYearId] = useState(null)
  const [selectedYearLabel, setSelectedYearLabel] = useState(currentYear)

  // (re)load the year list whenever the active website changes
  useEffect(() => {
    let alive = true
    fetchYears(websiteId).then((ys) => {
      if (!alive || !ys || !ys.length) return
      setYears(ys)
      const cur = ys.find((y) => y.isCurrent) || ys[0]
      setSelectedYearId(cur.id)
      setSelectedYearLabel(cur.yearLabel)
    })
    return () => {
      alive = false
    }
  }, [websiteId])

  // accepts a year id or label (the header <select> passes the label)
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
    <YearContext.Provider value={{ years, selectedYearId, selectedYearLabel, selectYear }}>
      {children}
    </YearContext.Provider>
  )
}

export function useYear() {
  return (
    useContext(YearContext) || {
      years: FALLBACK_YEARS,
      selectedYearId: null,
      selectedYearLabel: currentYear,
      selectYear: () => {},
    }
  )
}
