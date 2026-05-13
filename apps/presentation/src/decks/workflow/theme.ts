import type { Theme } from '../../types'

/**
 * Workflow deck theme — captures the visual treatment that has shipped on the deck
 * since its first release. Values mirror what was previously hardcoded in
 * `src/components/SlideCard.tsx` and `src/App.tsx`, so the workflow deck renders
 * byte-identically after the theme refactor.
 */
export const workflowTheme: Theme = {
  name: 'workflow',
  stageClasses: 'stage-glow relative min-h-screen bg-ut-navy-dark flex flex-col font-sans',
  cardClasses: 'w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden',
  accentClasses: 'h-1.5 w-full bg-gradient-to-r from-ut-navy via-ut-blue to-ut-teal',
  titleClasses: 'font-bold leading-tight text-ut-navy',
  bodyTextClasses: 'text-gray-600 text-lg leading-relaxed',
  bulletItemClasses: 'flex items-start gap-3 text-gray-700 text-lg',
  cardPaddingClasses: 'p-10 md:p-14 space-y-6',
  headingScaleClasses: 'text-3xl md:text-4xl',
  cardAnimationClass: 'animate-fade-up',
  watermarkClasses: 'opacity-25 w-28 mt-2',
}
