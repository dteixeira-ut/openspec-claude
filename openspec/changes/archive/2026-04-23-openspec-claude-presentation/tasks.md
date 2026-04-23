## 1. Project Setup

- [x] 1.1 Scaffold a new Vite + React + TypeScript project at `apps/presentation/`
- [x] 1.2 Install and configure Tailwind CSS with the UserTesting color palette and Inter font tokens
- [x] 1.3 Configure `vite.config.ts` for static output (`base: './'`) suitable for GitHub Pages / Vercel
- [x] 1.4 Set up ESLint + Prettier with project defaults

## 2. Slide Shell

- [x] 2.1 Create `src/types.ts` defining the `Slide` interface (`id`, `title`, `body`, `notes?`, `links?`)
- [x] 2.2 Implement `SlideCard` component — renders a slide's title and body inside a card with UserTesting styling (white card, purple heading accent, subtle shadow)
- [x] 2.3 Implement `NavControls` component — Previous / Next buttons using purple primary color, disabled state at deck bounds
- [x] 2.4 Implement `ProgressIndicator` component — shows `<current> / <total>` in muted text
- [x] 2.5 Implement `NotesPanel` component — shows speaker notes below the slide card, hidden by default
- [x] 2.6 Wire up `App.tsx` with `useState` for current slide index and keyboard event listeners (`ArrowLeft`/`ArrowRight`, `h`/`l`, `n` for notes toggle)
- [x] 2.7 Add `role="region"` and `aria-label` to the slide container; add `aria-label` to nav buttons

## 3. Slide Content

- [x] 3.1 Create `src/slides.ts` and author the Title slide (title, subtitle, presenter info)
- [x] 3.2 Author Spec-Driven Development overview slide(s) with definition, problem statement, and at least one external resource link
- [x] 3.3 Author OpenSpec + Claude workflow walkthrough slides — one slide per phase (propose → design → specs → tasks → apply → archive) showing CLI command and Claude's role
- [x] 3.4 Author Pros slide with at least three concrete benefits
- [x] 3.5 Author Cons slide with at least three honest limitations
- [x] 3.6 Author Open Questions slide with at least four questions for audience discussion
- [x] 3.7 Author Resources slide with links to OpenSpec repo, spec-driven dev references, and Anthropic/Claude docs (all `target="_blank" rel="noopener noreferrer"`)
- [x] 3.8 Add speaker notes to each slide in `src/slides.ts`

## 4. Visual Polish

- [x] 4.1 Verify desktop layout (1280px+): slide card is centered, max-width is comfortable, nav controls are visually balanced
- [x] 4.2 Verify tablet layout (768px): no horizontal overflow, text is legible, buttons are tappable size
- [x] 4.3 Verify code blocks in workflow slides are styled with a dark background and monospace font (matching UserTesting's code aesthetic)
- [x] 4.4 Add a slide transition (simple CSS `opacity` fade) between slides

## 5. Verification

- [x] 5.1 Manually walk through the entire deck confirming all navigation (click and keyboard) works correctly and bounds are enforced
- [x] 5.2 Toggle speaker notes on/off for several slides and confirm `n` key and button both work
- [x] 5.3 Check all resource links open in a new tab
- [x] 5.4 Run `npm run build` and verify the static output loads correctly when served from the `dist/` folder
