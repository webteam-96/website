# Rotary District 3170 — Website

React + TypeScript + Vite single-page app for the Rotary District 3170 site.
This package is structured to hold **multiple pages**; the first one shipped is
the **Calendar dashboard** (`/`).

## Stack

- **React 18 + TypeScript**
- **Vite 5** (dev server + build)
- **Tailwind CSS 3** (design tokens in `tailwind.config.js`)
- **TanStack Query 5** (data fetching / caching)
- **date-fns 3** (calendar grid generation, formatting)
- **lucide-react** (icons)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the built dist/
```

## Project structure

```
src/
├─ main.tsx                  # entry; wraps app in QueryClientProvider
├─ App.tsx
├─ types.ts                  # CalendarEntry, DayMarkers
├─ api/calendar.ts           # mock fetcher (swap for real fetch)
├─ data/mockData.ts          # mock dataset keyed by Rotary year-range
├─ hooks/useCalendarData.ts  # useCalendarEntries() TanStack Query hook
├─ lib/
│  ├─ calendar.ts            # month grid, week chunking, day markers
│  └─ format.ts              # DD-MM / DD-MMM-YYYY / MMMM yyyy
└─ components/
   ├─ CalendarPage.tsx       # page orchestrator (state + data wiring)
   ├─ TopNav.tsx             # sticky blue nav + mobile menu
   ├─ ContactStrip.tsx       # email / phone / YearSelect
   ├─ YearSelect.tsx
   ├─ PageTitleRow.tsx       # title + live date pill
   ├─ DashboardGrid.tsx      # 4-col → 2-col → 1-col grid
   ├─ ListCard.tsx           # reusable, variant-driven (birthday/anniversary/event)
   ├─ EventsCard.tsx         # ListCard wrapper for the events variant
   ├─ MonthCalendar.tsx      # interactive month grid (keyboard navigable)
   ├─ CalendarHeader.tsx     # month nav
   ├─ WeekdayRow.tsx
   ├─ DayCell.tsx            # number + marker dots + today state
   ├─ Legend.tsx
   └─ SiteFooter.tsx         # dark gradient footer
```

## Data

The calendar is driven entirely by mock data so it renders without a backend.
To connect a real API, replace the body of `fetchCalendarEntries` in
`src/api/calendar.ts` — everything else already consumes it through TanStack
Query. Birthdays and anniversaries recur annually (matched by day+month);
events are date-specific.

## Adding more pages

Introduce a router (e.g. `react-router-dom`) in `App.tsx` and add page
components alongside `CalendarPage`. Shared chrome (`TopNav`, `ContactStrip`,
`SiteFooter`) is already factored out for reuse.

## Design reference

The original design lives at `./calender.png`. Rendered
previews: `preview-desktop.png`, `preview-tablet.png`, `preview-mobile.png`.
