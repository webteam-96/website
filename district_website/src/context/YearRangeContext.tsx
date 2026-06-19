import { createContext, useContext, useState, type ReactNode } from 'react'

interface YearRangeValue {
  yearRange: string
  setYearRange: (value: string) => void
}

const YearRangeContext = createContext<YearRangeValue | undefined>(undefined)

/**
 * Holds the selected Rotary year-range so the ContactStrip selector shows on
 * every interior page and the choice persists across navigation (previously it
 * reset because each page kept its own local state).
 */
export function YearRangeProvider({ children }: { children: ReactNode }) {
  const [yearRange, setYearRange] = useState('2025-2026')
  return (
    <YearRangeContext.Provider value={{ yearRange, setYearRange }}>
      {children}
    </YearRangeContext.Provider>
  )
}

export function useYearRange(): YearRangeValue {
  const ctx = useContext(YearRangeContext)
  if (!ctx) throw new Error('useYearRange must be used within a YearRangeProvider')
  return ctx
}
