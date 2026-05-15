import { useEffect, useRef } from 'react'
import type { Slide, Theme } from '../types'
import { SlideCard } from './SlideCard'

interface DeckViewProps {
  slides: Slide[]
  theme: Theme
  /** Visual signal that this deck is the summary variant — tightens the card paddings. */
  variant?: 'default' | 'summary'
}

/**
 * Parallax scroll renderer. Slides are centred in a vertical stack and each card
 * fades up as it scrolls into view. The depth effect comes from the fixed stage
 * backdrop (radial glow / texture) staying put while the foreground column
 * scrolls over it — no per-card scroll-linked drift, which would otherwise make
 * later slides shift faster than earlier ones and collide near the bottom.
 */
export function DeckView({ slides, theme, variant = 'default' }: DeckViewProps) {
  const slotsRef = useRef<Array<HTMLElement | null>>([])

  // Staggered entry: toggle `.in-view` on each slot the first time it crosses
  // ~25% visibility. We only flip the class on (not off) so cards stay settled
  // once revealed — re-animating on every scroll back up would feel busy.
  useEffect(() => {
    const els = slotsRef.current.filter((el): el is HTMLElement => el != null)
    if (els.length === 0) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      els.forEach((el) => el.classList.add('in-view'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slides])

  // Deep-link support: if the URL hash carries a `slide-N` suffix, scroll the
  // corresponding section into view on mount.
  useEffect(() => {
    const m = window.location.hash.match(/slide-(\d+)/)
    if (!m) return
    const idx = Number.parseInt(m[1], 10)
    if (Number.isNaN(idx)) return
    const el = document.getElementById(`slide-${idx}`)
    if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
  }, [slides])

  if (slides.length === 0) {
    return (
      <div className={theme.stageClasses}>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <p className="text-white/60">No slides to render.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${theme.stageClasses} parallax-stage`}>
      <a
        href="#/"
        className="fixed top-4 left-4 z-50 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 px-4 py-1.5 text-white/70 hover:text-ut-teal hover:border-ut-teal/40 text-xs font-mono tracking-wide transition-colors"
        aria-label="Back to landing"
      >
        ← home
      </a>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-24 pb-32 flex flex-col items-center gap-20 md:gap-28">
        {slides.map((slide, i) => (
          <section
            key={slide.id ?? i}
            id={`slide-${i}`}
            ref={(el) => {
              slotsRef.current[i] = el
            }}
            className="parallax-slot w-full"
          >
            <div className="parallax-slot__inner">
              <SlideCard slide={slide} slideIndex={i} theme={theme} variant={variant} />
            </div>
          </section>
        ))}

        <img
          src="./usertesting-logo-white.svg"
          alt="UserTesting"
          className={theme.watermarkClasses}
        />
      </div>
    </div>
  )
}
