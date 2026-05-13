## 1. Routing scaffolding

- [ ] 1.1 Create `src/hooks/useHashRoute.ts` exposing `useHashRoute(): { deck: 'workflow' | 'research' | 'landing'; density: 'full' | 'summary' }`. Listen to `hashchange`; default to `landing` when hash is empty or unrecognized
- [ ] 1.2 Update `src/App.tsx` to call `useHashRoute()` and switch on `deck` between `LandingPage`, the workflow deck renderer, and the research deck renderer. Pass `density` to the research deck renderer
- [ ] 1.3 Verify `dev` server hot-reloads on hash change without full page reload (Vite default behavior; just confirm the keyboard shortcuts and notes panel state survive a hash change)

## 2. Deck folder structure and content move

- [ ] 2.1 Create directories `src/decks/workflow/` and `src/decks/research/`
- [ ] 2.2 Move `src/slides.ts` to `src/decks/workflow/slides.ts` (use `git mv` so history follows; verify byte-for-byte identical content with `git diff --stat`)
- [ ] 2.3 Update the import in `src/App.tsx` from `./slides` to `./decks/workflow/slides`
- [ ] 2.4 Create `src/decks/workflow/theme.ts` exporting a `Theme` object capturing the current visual treatment (stage background classes, slide-card classes, accent bar classes, animation classes). The renderer reads from this rather than hardcoding
- [ ] 2.5 Verify `npm run dev` still renders the workflow deck identically at `/#/workflow`

## 3. Schema extension

- [ ] 3.1 Extend `src/types.ts` `ContentItem` union with five new variants per the spec: `finding`, `timeline`, `diff`, `metric`, `callout`
- [ ] 3.2 Define helper types as needed (e.g. `Severity = 'low' | 'medium' | 'high'`, `CalloutTone = 'info' | 'warn' | 'evidence'`)
- [ ] 3.3 Add a `density` field to a new `ResearchSlide` interface that extends `Slide` with `density: 'full' | 'summary' | 'both'`. Workflow slides continue to use `Slide` without the field
- [ ] 3.4 Confirm `npm run build` (tsc -b) is clean

## 4. Theme system

- [ ] 4.1 Extract a `Theme` type in `src/types.ts` (or a sibling `theme.ts`) with slots for: stage classes, slide-card classes, accent (function returning JSX or a class string), title classes, body-text classes, watermark placement
- [ ] 4.2 Update `SlideCard.tsx` to accept `theme: Theme` as a prop and read from it. Existing hardcoded classes become the default `workflow` theme
- [ ] 4.3 Author `src/decks/research/theme.ts` per design.md Decision 4: off-white card (`#fafaf8`), softer shadow, `rounded-lg` corners, hand-drawn-look accent stroke, slightly higher leading on body text, slower fade-up animation
- [ ] 4.4 Implement a "research journal" stage background using a CSS-only paper-grain texture + faint grid overlay (pure CSS, no asset)
- [ ] 4.5 Verify side-by-side visual distinction by running `npm run dev` and comparing `/#/workflow` and `/#/research` (with a placeholder slide if research content isn't authored yet)

## 5. New content-item renderers

- [ ] 5.1 Implement `finding` renderer: severity-styled card with title + body + optional mitigation link (color-coded border by severity using existing `ut-blue` / `ut-teal` palette; no new colors)
- [ ] 5.2 Implement `timeline` renderer: vertical timeline with date markers and event text
- [ ] 5.3 Implement `diff` renderer: two-column before/after with appropriate background tinting (use existing palette; pale red/green-leaning tints derived from `ut-navy` and `ut-teal`)
- [ ] 5.4 Implement `metric` renderer: large value, label below, optional subtext
- [ ] 5.5 Implement `callout` renderer: variant by tone (`info`, `warn`, `evidence`); `evidence` tone signals a citation block
- [ ] 5.6 Each renderer reads any color/spacing choices from `theme`, not from hardcoded brand tokens

## 6. Landing page

- [ ] 6.1 Author `src/components/LandingPage.tsx` rendering two cards (Workflow, Research) with one-sentence descriptions plus a framing paragraph
- [ ] 6.2 The Research card includes a secondary "View summary" link to `/#/research/summary`
- [ ] 6.3 Use the workflow theme for the landing page (per design.md Decision 6) so the brand entry feels continuous
- [ ] 6.4 Verify `npm run dev` shows the landing page at `/`

## 7. Research deck content

- [ ] 7.1 Author `src/decks/research/slides.ts` with the seven-section narrative arc from design.md Decision 7 (~28 slides full)
- [ ] 7.2 Section 1 — Frame: 3 slides covering experiment goal, consuming repo, what was measured
- [ ] 7.3 Section 2 — Process: 4 slides on `/opsx:*` driving the migration, stacked-PR delivery, per-capability slicing
- [ ] 7.4 Section 3 — Findings by class: 10 slides (2 per class: overview + concrete example) for implicit deployment context, silent agent decisions, delivery shape gaps, configuration drift, library-vs-spec mismatch
- [ ] 7.5 Section 4 — Mitigations shipped: 4 slides covering `harden-opsx-workflow` (rules, marker, plan command) and `add-domain-skills` (the two skills), with embedded artifact snippets via `diff` and `callout` items
- [ ] 7.6 Section 5 — Learnings: 3 slides on what SDD does well in practice, what it doesn't catch by construction, the must-ask/may-decide framing as transferable lesson
- [ ] 7.7 Section 6 — What's next: 3 slides naming concrete follow-ups (service-starter repo, fmt-in-CI rollout, skill graduation, sibling-drift audit at org scale)
- [ ] 7.8 Section 7 — Close: 1 slide closing the dogfooding loop (this deck was itself built using the workflow), with a link to the `migration-research-deck` change
- [ ] 7.9 Mark each slide with the appropriate `density` value — target ~12 slides at `'summary' | 'both'` for the summary route
- [ ] 7.10 Every slide includes `notes` (2–4 sentences, conversational tone)
- [ ] 7.11 Every count, time, or behavior claim cites the research notes file or a commit SHA (via `callout { tone: 'evidence' }` or inline link)

## 8. Density filtering

- [ ] 8.1 In the research deck renderer, filter `slides` by `density` based on the route variant (full route: keep `'full' | 'both'`; summary route: keep `'summary' | 'both'`)
- [ ] 8.2 Verify both routes produce a coherent narrative (no orphaned references to slides that were filtered out)
- [ ] 8.3 Apply a subtly tighter card variant (slightly smaller paddings, smaller heading scale) on the summary route so the visual signals "summary" without saying so

## 9. README + cross-references

- [ ] 9.1 Update `apps/presentation/README.md` to describe both decks and the routing
- [ ] 9.2 Update root `README.md` `Apps` section to mention the new research deck
- [ ] 9.3 No changes to `.github/workflows/*` (CI continues to lint + build the presentation app as before)

## 10. Validation

- [ ] 10.1 `npm run build` (in `apps/presentation/`) is clean
- [ ] 10.2 `npm run lint` is clean
- [ ] 10.3 Manual smoke: open `npm run dev`, click through all four routes (`/`, `/#/workflow`, `/#/research`, `/#/research/summary`), confirm keyboard navigation and notes panel work in both decks
- [ ] 10.4 Visual check: research deck visibly differs from workflow deck (slide-card shape, stage background, accent treatment) while preserving the UserTesting logo and brand color palette
- [ ] 10.5 Source-citation audit: pick three random claims from the research deck, follow the citations, confirm they resolve to a real line in the research notes or a real commit SHA

## 11. Decisions made without consultation (this change)

- [ ] 11.1 Add a `## Decisions made without consultation` section to the PR body listing the six decisions from `proposal.md` plus any further may-decide calls discovered during implementation
- [ ] 11.2 Author the research deck's "Close" slide with a self-aware note that the deck applied the silent-decisions marker rule throughout — closing the loop visibly for the audience
