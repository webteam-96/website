import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import SiteFooter from './SiteFooter'

/**
 * Shared page chrome: sticky nav at the top, footer at the bottom, and the
 * active route's content rendered in between via <Outlet />. Each page supplies
 * its own ContactStrip + <main> so page-specific state (e.g. the calendar's
 * year range) stays local.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col page-texture">
      <TopNav />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
