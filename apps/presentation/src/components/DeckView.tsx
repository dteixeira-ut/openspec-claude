import { useEffect, useState } from 'react'
import type { Slide, Theme } from '../types'
import { SlideCard } from './SlideCard'
import { NavControls } from './NavControls'
import { ProgressIndicator } from './ProgressIndicator'
import { NotesPanel } from './NotesPanel'

interface DeckViewProps {
  slides: Slide[]
  theme: Theme
  /** Visual signal that this deck is the summary variant — tightens the card paddings. */
  variant?: 'default' | 'summary'
}

/**
 * Shared deck renderer used by both workflow and research routes. Encapsulates the
 * keyboard nav, notes-panel toggle, progress-indicator chrome, and watermark previously
 * inlined in `App.tsx`. Theming is fully driven by the provided `theme` prop, so adding
 * a third deck reduces to authoring a `theme.ts` + a `slides.ts` and pointing this
 * component at them.
 */
export function DeckView({ slides, theme, variant = 'default' }: DeckViewProps) {
  const [current, setCurrent] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)

  // Clamp `current` to a valid index when the slide list shrinks (e.g. density
  // switch). Computed during render rather than via setState-in-effect, per the
  // react-hooks/set-state-in-effect rule — see React docs "You might not need
  // an effect."
  const clampedCurrent = slides.length === 0 ? 0 : Math.min(current, slides.length - 1)
  const canPrev = clampedCurrent > 0
  const canNext = clampedCurrent < slides.length - 1

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'l') {
        setCurrent((c) => (c < slides.length - 1 ? c + 1 : c))
      }
      if (e.key === 'ArrowLeft' || e.key === 'h') {
        setCurrent((c) => (c > 0 ? c - 1 : c))
      }
      if (e.key === 'n') setNotesOpen((o) => !o)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [slides.length])

  const slide = slides[clampedCurrent]
  const progressPct = slides.length ? ((clampedCurrent + 1) / slides.length) * 100 : 0

  function prev() {
    if (canPrev) setCurrent(clampedCurrent - 1)
  }
  function next() {
    if (canNext) setCurrent(clampedCurrent + 1)
  }

  if (!slide) {
    return (
      <div className={theme.stageClasses}>
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-14">
          <p className="text-white/60">No slides to render.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={theme.stageClasses}>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-ut-navy via-ut-blue to-ut-teal transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Home link — small unobtrusive way back to the landing page */}
      <a
        href="#/"
        className="fixed top-3 left-3 z-50 text-white/40 hover:text-ut-teal text-xs font-mono tracking-wide"
        aria-label="Back to landing"
      >
        ← home
      </a>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-14 gap-6">
        <div className="w-full max-w-4xl" key={clampedCurrent}>
          <SlideCard slide={slide} slideIndex={clampedCurrent} theme={theme} variant={variant} />
        </div>

        {notesOpen && (
          <div className="w-full max-w-4xl animate-fade-up">
            <NotesPanel notes={slide.notes} />
          </div>
        )}

        <div className="flex items-center gap-6">
          <NavControls onPrev={prev} onNext={next} canPrev={canPrev} canNext={canNext} />
          <ProgressIndicator current={current + 1} total={slides.length} />
          <button
            onClick={() => setNotesOpen((o) => !o)}
            aria-label="Toggle speaker notes"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/50 hover:border-ut-blue hover:text-ut-blue transition-colors"
          >
            {notesOpen ? 'Hide Notes' : 'Notes'}
          </button>
        </div>

        <img
          src="./usertesting-logo-white.svg"
          alt="UserTesting"
          className={theme.watermarkClasses}
        />
      </div>
    </div>
  )
}
