## Why

Teams adopting AI-assisted development need a clear, shareable way to evaluate workflows like OpenSpec + Claude before committing to them. A structured presentation walkthrough lets us communicate the value proposition, surface trade-offs honestly, and collect open questions — all in one place that can be shared asynchronously or walked through live.

## What Changes

- New standalone React web app (`apps/presentation`) that renders a slide-by-slide walkthrough
- Slides cover: what spec-driven development is, how OpenSpec + Claude works end-to-end, pros, cons, and unresolved questions
- Each slide is self-contained with optional speaker notes and external resource links
- No backend — fully static, deployable to any static host

## Capabilities

### New Capabilities
- `presentation-shell`: React app with slide navigation (keyboard + click), progress indicator, and a consistent slide layout system
- `presentation-content`: The actual slide content — spec-driven development overview, OpenSpec + Claude workflow walkthrough, pros/cons analysis, open questions, and resource links

### Modified Capabilities
<!-- No existing specs are being modified -->

## Impact

- New app in the repository (likely `apps/presentation/` or a standalone directory)
- Dependencies: React, a lightweight slide/routing library (e.g., React Router or simple state), minimal styling (Tailwind or CSS modules)
- No backend, no API changes, no database
- Deployable independently; no impact on existing services
