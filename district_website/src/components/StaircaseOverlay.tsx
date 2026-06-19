// src/components/StaircaseOverlay.tsx
//
// Interlocking double-staircase page-transition overlay.
//
// Eight full-height vertical columns split into TWO interlocking staircases:
//   - even-index columns are brand BLUE (#16429B) and enter from the TOP
//   - odd-index  columns are brand GOLD (#F5A623) and enter from the BOTTOM
// A left-to-right per-column stagger makes the leading edges advance in a
// stepped staircase rhythm; because neighbours arrive from opposite directions
// the two colored staircases mesh and "meet in the middle" to cover the screen.
// Reveal plays the exact inverse (blue retracts up, gold retracts down).
//
// This component is purely presentational. The parent controller (App.tsx)
// owns the `stage` state machine and the route swap. Timing constants live HERE
// and are imported by the controller, so JS and CSS stay in lockstep.

export type Stage = 'idle' | 'cover' | 'reveal'

// ---- Timing constants (single source of truth) ---------------------------
export const COLUMNS = 8
export const SLIDE_MS = 380 // one column's travel time (cover or reveal)
export const STAGGER_MS = 60 // delay added per column, left -> right
export const HOLD_MS = 90 // fully-covered dwell where the route swap happens

// Slowest column (index COLUMNS-1) finishes at (COLUMNS-1)*STAGGER_MS + SLIDE_MS.
const SLOWEST_FINISH_MS = (COLUMNS - 1) * STAGGER_MS + SLIDE_MS // 800ms

// Controller waits this long (cover) before swapping; +20ms absorbs frame jitter
// so the viewport is provably 100% covered at swap time (820 > 800).
export const COVER_MS = SLOWEST_FINISH_MS + 20 // 820ms
export const REVEAL_MS = SLOWEST_FINISH_MS + 20 // 820ms (mirror of cover)

export default function StaircaseOverlay({ stage }: { stage: Stage }) {
  return (
    <div
      aria-hidden="true"
      data-stage={stage}
      className={`pt-overlay${stage === 'idle' ? ' pt-idle' : ' pt-active'}`}
    >
      {Array.from({ length: COLUMNS }).map((_, i) => {
        // even -> blue, from top; odd -> gold, from bottom.
        const fromTop = i % 2 === 0
        return (
          <span
            key={i}
            className={`pt-col ${fromTop ? 'pt-top pt-blue' : 'pt-bottom pt-gold'}`}
            style={{
              left: `${(i * 100) / COLUMNS}%`,
              // tiny overlap kills sub-pixel seams between adjacent columns
              width: `calc(${100 / COLUMNS}% + 1px)`,
              animationDelay: `${i * STAGGER_MS}ms`,
            }}
          />
        )
      })}
    </div>
  )
}
