## Change Summary: single-source-opsx-templates

### What Was Built
A single canonical source for the 11 opsx workflows (`apply`, `archive`, `code-review`, `explore`, `plan`, `pr`, `propose`, `refine`, `review`, `suggest`, `summarize`) at `templates/opsx/<id>.md`, plus a Node-only TypeScript generator `bin/opsx-sync` that fans templates out to `.claude/commands/opsx/`, `.cursor/commands/`, and `$CODEX_HOME/prompts/`. A CI drift-check gate (`.github/workflows/opsx-template-drift.yml`) fails any PR where committed outputs diverge from their templates. The legacy parallel skill trees under `.claude/skills/openspec-*`, `.codex/skills/`, and `.cursor/skills/` were deleted.

### Why
The repo had drifted across three AI tool trees and within Claude itself (commands vs skills), with up to 115 lines of difference for a single workflow. Hand-maintaining three copies plus a Claude-only `code-review` helper that codex/cursor couldn't reach made the apply auto-review step half-broken. A single source + generator + CI gate stops drift before it starts.

### Key Decisions
- **Templates at repo root (`templates/opsx/`), not under `openspec/`** — avoids future collisions with the upstream CLI's own directory expectations.
- **Shallow copy + per-tool frontmatter rewrite, no template language** — every canonical template is itself a fully-valid Claude command file; the generator's only per-tool transformations are frontmatter shape, filename casing, and the generated-from banner.
- **Claude version is the canonical body source** for shared workflows; the union of claude/codex/cursor behavior is merged in once during authoring (auto-review-on-completion + ambiguity contract + RAD ticket extraction + post-archive hooks all preserved).
- **Codex commands match upstream placement at `$CODEX_HOME/prompts/`** rather than a project-local `.codex/commands/`. Trade-off accepted: Codex outputs live outside the repo and cannot be CI-verified; local `bin/opsx-sync` still covers them.
- **Auto-invocation preserved without `.claude/skills/`** — rich "Use when…" descriptions are carried verbatim from legacy SKILL.md files into the generated command's `description:` field, so Claude continues to route by intent.

### Spec Changes
- **opsx-template-sync** (new capability): seven requirements covering canonical-source rule, rich auto-invocation descriptions, generator fan-out paths, CI drift-check gate, legacy-tree absence, code-review parity, and `openspec update` safety.

### Tasks Completed
**41/41 tasks complete**
- §1 Canonical templates (14): authored 11 templates + README, with auto-invocation descriptions.
- §2 Generator (9): TypeScript adapters for Claude, Cursor, Codex; `--check` and `--scope=ci` flags; idempotent writes with banner.
- §3 CI drift gate (4): workflow + diff output + remediation hint + manual drift-injection verification.
- §4 Legacy deletion (6): removed `.claude/skills/openspec-*`, `.claude/skills/code-review`, all `.codex/skills/` and `.cursor/skills/` plus reference sweep.
- §5 Docs (4): README, `templates/opsx/README.md`, `skills/README.md`, research-deck slide note.
- §6 Verification (4): clean re-run idempotent, `--check` exits 0, strict validate passes, manual spot-check confirms merges took.

### Decisions made without consultation
**From `design.md`**
- **Generator language: TypeScript** — Alternative: plain JS. Rationale: rest of the repo (`apps/presentation`) is TS; consistent toolchain.
- **CI workflow path: `.github/workflows/opsx-template-drift.yml`** — Alternative: extend the existing `spec-drift-monitor.md` gh-aw workflow. Rationale: keeps the mechanical drift check separate from the LLM-driven spec-drift monitor; faster CI feedback.
- **Templates filename style: `<id>.md` matching Claude's nested layout** (e.g., `apply.md` not `opsx-apply.md`) — Alternative: `opsx-<id>.md` flat matching Cursor/Codex. Rationale: Claude is the canonical body source per Decision 4; matching its filename keeps the diff between template and Claude output near-zero.

**From implementation (subagent log)**
- **`code-review` description tuned to satisfy the auto-invocation soft-warn** — Alternative: keep legacy SKILL.md description verbatim. Rationale: legacy said "Use after completing any implementation work"; the spec's terse-description warn fires below 50 chars or without a "Use when…" trigger. Rewrote to "Use when the user wants the post-implementation review gate run, or after any implementation work is complete." Preserves intent, satisfies the warn.
- **TS entrypoint via Node-shebang shim** instead of adding `tsx`/`ts-node`/`typescript` deps. Rationale: Node 22.6+ strips types natively (default 23.6+). Keeps the generator stdlib-only; broader install story is a follow-up.
- **Living spec edits to `opsx-plan-command` and `domain-skills-home`** — task 4.5 explicitly required updating references to deleted skill paths; these were the only in-repo non-archive hits. Edits behavior-preserving.
