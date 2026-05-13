import type { Theme } from '../../types'

/**
 * Research deck theme — "research journal / lab notebook" aesthetic per
 * `migration-research-deck` design.md Decision 4.
 *
 * Constraints honoured:
 *  - Same UserTesting logo asset, same opacity, same placement as workflow deck.
 *  - Same `ut-navy` / `ut-blue` / `ut-teal` palette (no new brand colors).
 *  - Slide card is off-white (`#fafaf8`), `rounded-lg` (vs workflow's `rounded-2xl`),
 *    softer shadow, leans on a deckled top accent stroke instead of the gradient bar.
 *  - Slightly higher body leading + smaller heading scale signals "evidence" tone.
 *  - Animation slowed via `animate-fade-up-slow` (defined in tailwind.config.ts).
 *
 * Stage background carries a CSS-only paper-grain texture + faint grid overlay
 * applied via the `.research-stage` class in `index.css`.
 */
export const researchTheme: Theme = {
  name: 'research',
  stageClasses:
    'research-stage relative min-h-screen bg-ut-navy-dark flex flex-col font-sans',
  cardClasses:
    'w-full max-w-4xl rounded-lg shadow-lg overflow-hidden border border-ut-navy/10',
  accentClasses: 'research-accent-stroke h-2 w-full',
  titleClasses: 'font-semibold leading-snug text-ut-navy tracking-tight',
  bodyTextClasses: 'text-ut-navy/75 text-base md:text-lg leading-loose',
  bulletItemClasses: 'flex items-start gap-3 text-ut-navy/80 text-base md:text-lg leading-loose',
  cardPaddingClasses: 'p-9 md:p-12 space-y-5',
  headingScaleClasses: 'text-2xl md:text-3xl',
  cardAnimationClass: 'animate-fade-up-slow',
  watermarkClasses: 'opacity-25 w-28 mt-2',
  summaryVariantClasses: 'p-7 md:p-9 space-y-4',
}

// Background color is set via inline style on the card wrapper so it doesn't
// need a new tailwind token. The off-white hex is `#fafaf8`.
export const researchCardBackground = '#fafaf8'
