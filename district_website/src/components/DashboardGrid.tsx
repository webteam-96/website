import type { ReactNode } from 'react'

/**
 * Four equal columns on desktop, 2-up on tablet, 1-up on mobile. Cards share a
 * fixed height on desktop so the row aligns cleanly with the calendar card.
 */
export default function DashboardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1720px] px-5 pb-12 pt-8 sm:px-8">
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:[&>*]:h-[500px]">
        {children}
      </div>
    </div>
  )
}
