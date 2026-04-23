## Context

The team is evaluating OpenSpec + Claude as a development workflow. Currently there is no shareable artifact that explains the workflow, its trade-offs, and the open questions we need to resolve before adopting it. A lightweight React presentation app fills that gap — it can be walked through live in a meeting or shared asynchronously as a URL.

The app is a new standalone project with no backend and no dependency on existing services.

## Goals / Non-Goals

**Goals:**
- Static React app deployable to any static host (Vercel, GitHub Pages, S3)
- Slide-by-slide walkthrough with keyboard and click navigation
- Covers: spec-driven development background, OpenSpec + Claude workflow, pros/cons, open questions, resource links
- Maintainable by anyone comfortable with React — content lives in simple TypeScript data files

**Non-Goals:**
- Presenter mode, real-time audience sync, or laser-pointer features
- Custom animation engine — simple CSS transitions only
- Authentication, analytics, or any backend
- Support for arbitrary content authoring (not a general slide tool)

## Decisions

### React + Vite (no framework)
Next.js or Remix would add server-side complexity with no benefit for a fully static presentation. Vite gives fast HMR and a minimal build output. The app can be deployed as a folder of static files.

*Alternatives considered:* Reveal.js / Slidev — these are purpose-built slide tools but require learning a new DSL, constrain layout, and make it harder to embed interactive React components later. Plain React gives full control.

### Content as TypeScript data, not JSX per slide
Each slide is defined as a TypeScript object `{ id, title, body, notes?, links? }` in a `slides.ts` data file. A single `Slide` component renders any slide. This makes adding/editing slides trivial and keeps presentation logic out of content.

*Alternatives considered:* One React component per slide — harder to reorder, search, or export.

### Visual design: UserTesting.com style
The app SHALL match the UserTesting.com aesthetic: deep purple primary (`#6B3FA0` or equivalent), white/light-gray surfaces, bold Inter or similar sans-serif typography, generous whitespace, and subtle card shadows. The overall tone is professional enterprise SaaS — clean, readable, and confident.

### Tailwind CSS for styling
Utility-first CSS keeps the component count low and makes responsive layout straightforward. `tailwind.config.ts` encodes the UserTesting color palette and font tokens so they are used consistently across all slides.

*Alternatives considered:* CSS Modules — fine, but more files. Styled-components — runtime overhead with no benefit here.

### Simple React state for navigation (no router)
With no deep-linking requirement, `useState` for the current slide index is sufficient. Keyboard event listeners (`ArrowLeft`/`ArrowRight`, `j`/`k`) are attached at the app root.

*Alternatives considered:* React Router with URL-based slide index — useful if sharing links to specific slides becomes a requirement. Can be added later without restructuring.

## Risks / Trade-offs

- **Content becomes stale** → Keep slides concise and link to living docs (GitHub, Notion, etc.) rather than embedding details inline. Slides should prompt discussion, not replace documentation.
- **Accessibility of keyboard navigation** → Use `role="region"` and `aria-label` on the slide container; ensure focus management is correct when advancing slides.
- **"Not a real slide tool" perception** → The plain React approach trades slide-tool polish for maintainability. Accept this trade-off consciously; if richer features are needed later, migrating to Slidev is straightforward since content is already in structured data.
