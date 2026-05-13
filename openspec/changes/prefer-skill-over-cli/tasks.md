## 1. Living spec

- [ ] 1.1 The delta spec at `openspec/changes/prefer-skill-over-cli/specs/opsx-workflow/spec.md` is the source of truth; archive will sync it into `openspec/specs/opsx-workflow/spec.md`. No manual edit to the living spec is required at this stage.
- [ ] 1.2 Verify `openspec status --change prefer-skill-over-cli` reports the delta as `done` after authoring (already true at planning time)

## 2. `CLAUDE.md` — discovery surface

- [ ] 2.1 Add a "Workflow-tool invocation" section (3–5 lines) at the end of `CLAUDE.md` stating the rule briefly and pointing at the `opsx-workflow` living spec for the full text
- [ ] 2.2 Name the today-applicable CLI ↔ skill instance explicitly: `openspec archive` ↔ `/opsx:archive` (CLI does not execute `hooks.post-archive`; only the skill does)
- [ ] 2.3 Note the rule's must-ask escalation for environments where the skill is unreachable

## 3. In-skill enforcement note

- [ ] 3.1 Add a one-line note near the top of `.claude/commands/opsx/archive.md` (between the frontmatter and the first instruction step) reading something like: *"⚠ Do NOT bypass this skill by calling `openspec archive` directly — the post-archive hooks in `openspec/config.yaml` only fire from this skill. See `openspec/specs/opsx-workflow/spec.md` (Requirement: Workflow operations with declared side effects)."*
- [ ] 3.2 No edit required to `.claude/skills/openspec-archive-change/SKILL.md` — the skill body is what the command file already references; the rule is consumed via the command surface

## 4. Validation

- [ ] 4.1 Run `openspec status --change prefer-skill-over-cli` — all artifacts `done`
- [ ] 4.2 Run `openspec archive prefer-skill-over-cli --yes` — confirm it succeeds and that the delta syncs to `openspec/specs/opsx-workflow/spec.md` (one ADDED requirement appended)
- [ ] 4.3 After archive, manually run `/opsx:summarize prefer-skill-over-cli` (the very behavior this rule is about) to produce `summary.md`. Confirm `summary.md` aggregates the `## Decisions made without consultation` sections from `proposal.md` and `design.md`

## 5. Decisions made without consultation (this change)

- [ ] 5.1 The five proposal-level decisions (see `proposal.md`) are surfaced in the PR body when this PR opens
- [ ] 5.2 Any additional may-decide calls discovered during implementation are appended to the PR body before opening
