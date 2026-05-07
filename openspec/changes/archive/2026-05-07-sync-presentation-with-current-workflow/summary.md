## Change Summary: sync-presentation-with-current-workflow

### What Was Built
Restructured the presentation deck (`apps/presentation/src/slides.ts`) and `README.md` to reflect the OpenSpec workflow as it actually ships today — nine skills grouped into three lifecycle phases (Plan / Build / Ship & Close), plus a dedicated slide and README section for the CI automation that closes the loop. Added five new skill slides (`/opsx:suggest`, `/opsx:refine`, `/opsx:review`, `/opsx:pr`, `/opsx:summarize`), three section-divider slides, and a "Closing the loop in CI" slide covering the Code Review Gate and Spec Drift Monitor. Reframed three open-questions items as "Partially answered — Open: …" rather than removing them, so the deck shows the workflow evolving in response to its own surfaced questions.

### Why
The deck claimed to be "built using the workflow it describes" but still described "a CLI + four Claude Code skills" — five skills, the mandatory `code-review` subagent gate in `CLAUDE.md`, and the gh-aw `spec-drift-monitor` workflow had all shipped since the last slide update. Anyone evaluating the workflow from the deck was getting an under-spec'd picture, and the dogfooding claim was being weakened by every ad-hoc patch that bypassed OpenSpec.

### Key Decisions
- **Hybrid restructure (Option C)** over flat-append or full phase-summary: keep one slide per skill but introduce three section-divider slides that frame the lifecycle. Trade-off: deck grows from 12 to 21 slides, but presenter rhythm and narrative arc both improve.
- **Run the update through OpenSpec**, not as a direct fix: makes the third presentation update consistent with the prior two archived changes and concretely supports the "dogfooded" claim.
- **Drop "Slide N —" prefix from `presentation-content` requirement headers**: spec becomes position-independent, so future reorderings don't require renumbering every requirement.
- **Rewrite three partially-answered open questions** rather than removing them: each rewrite ends with a real follow-up ("Open: …") so the slide still invites discussion while honestly reflecting what tooling now covers.
- **Section dividers reuse existing `subheading` + `text` content types**: no new `ContentItem` variants, no styling changes, no `SlideCard.tsx` work. Keeps the change content-only.

### Spec Changes
- **presentation-content**: 12 requirements RENAMED (drop "Slide N —" prefix), 7 MODIFIED (Enter OpenSpec content, four skill-slide scenarios, Open Questions rewrites, Resources footer), 10 ADDED (`Slide ordering` plus 9 new slide requirements: 3 phase dividers, 5 new skill slides, "Closing the loop in CI"). Added `## Purpose` and `## Requirements` section headers to align the existing main spec with the openspec parser's expected structure.

### Tasks Completed
**28/28 tasks complete**
- Slide content updates (slide 4 subheading + code block, three open-questions rewrites, resources footer)
- Nine new slides added to `slides.ts` (3 phase dividers, 5 new skill slides, 1 CI loop slide)
- Slide array reordered to match the 21-slide ordering requirement
- Speaker notes written for all new slides in the existing tone
- README workflow section restructured into Plan / Build / Ship & Close tables with a CI automation section
- Verification: `openspec validate` passing, `vite build` clean (21 modules), `tsc -b` clean, link attributes audited, `/opsx:review` returned APPROVED
