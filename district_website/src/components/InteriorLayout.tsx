import { Outlet } from 'react-router-dom'
import ContactStrip from './ContactStrip'
import { useYearRange } from '../context/YearRangeContext'

/**
 * Chrome shared by every interior page (i.e. everything except Home): the
 * contact / year-range strip, rendered once above each page's own PageBanner.
 * Home is intentionally excluded — it carries contact info inside its hero.
 */
export default function InteriorLayout() {
  const { yearRange, setYearRange } = useYearRange()
  return (
    <>
      <ContactStrip yearRange={yearRange} onYearChange={setYearRange} />
      <Outlet />
    </>
  )
}
