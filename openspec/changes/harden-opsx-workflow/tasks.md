## 1. Config-level rules in `openspec/config.yaml`

- [x] 1.1 Add `rules.proposal` entries requiring a `## Non-code surfaces` section enumerating config, secrets, container/deploy artifacts, CI workflows, observability — each filled or marked `N/A` with reason
- [x] 1.2 Add `rules.proposal` entries requiring `Starting state` (brownfield/greenfield) and `Cutover` (greenfield/parallel-run/strangler/in-place) fields
- [x] 1.3 Add `rules.design` entries requiring a `## Delivery shape` section (PR shape, base branch, repo merge-method, named `/opsx:*` skill invocations per boundary)
- [x] 1.4 Add `rules.spec` entry establishing legacy-exactness precedence on brownfield changes
- [x] 1.5 Add `rules.tasks` entry requiring a legacy-reference cleanup companion task for any file deletion (Dockerfile, package.json, helm, CI workflows, argocd-apps)
- [x] 1.6 Add a top-level `ambiguity:` block listing the must-ask and may-decide classes from `design.md` Decision 2 (or fold into `rules._global` if the CLI does not support a custom block)
- [x] 1.7 Add the silent-decisions marker rule to `rules.proposal`, `rules.design`, `rules.specs`, and `rules.tasks` — same text in all four: "Any decision made without explicit user consultation MUST be recorded in a `## Decisions made without consultation` section at the bottom of the file; omit the section entirely if no such decisions were made"
- [x] 1.8 Verify by running `openspec instructions proposal --change <test-change> --json` and confirming both the ambiguity rules and the silent-decisions marker rule surface in the returned `rules` field

## 2. Silent-decisions marker — review and archive enforcement

- [x] 2.1 Edit `.claude/commands/opsx/review.md` to add a "marker check" step: scan the diff for evidence of silent decisions (filename choice not ratified in the conversation, default value introduced, library/pattern choice with no corresponding user input), and surface "Marker missing — likely silent decisions detected" when candidates exist but the artifact has no `## Decisions made without consultation` section
- [x] 2.2 Mirror the same check in `.claude/skills/code-review/SKILL.md` so the post-implementation review gate (mandated in repo-root `CLAUDE.md`) also catches missing markers
- [x] 2.3 Edit `.claude/commands/opsx/summarize.md` to collect `## Decisions made without consultation` sections from all of the change's artifacts (`proposal.md`, `design.md`, `specs/`, `tasks.md`, `plan.md`) AND from the PR bodies (via `gh pr view --json body`), deduplicate by decision text, and write the union into `summary.md` grouped by source artifact
- [x] 2.4 If no may-decide calls were logged anywhere, ensure `summary.md` omits the section entirely (no empty placeholder)

## 3. Skill prompt edits — propose

- [ ] 3.1 Edit `.claude/skills/openspec-propose/SKILL.md` to add a "legacy gap-analysis pre-pass" step that runs when `Starting state: brownfield`, enumerating legacy files from the proposal's `Impact` section and prompting "what behavior in each must the new implementation preserve?"
- [ ] 3.2 Replace the existing `If context is critically unclear, ask the user — but prefer making reasonable decisions to keep momentum` guardrail with the two-class ambiguity contract (must-ask / may-decide) and a reference to the silent-decisions marker rule from §1 and §2
- [ ] 3.3 Mirror the changes in `.claude/commands/opsx/propose.md`

## 4. Skill prompt edits — apply / refine / pr

- [ ] 4.1 Edit `.claude/skills/openspec-apply-change/SKILL.md` to include the ambiguity contract verbatim (same text as propose, applied to implementation-time choices) and require silent-decision markers in any agent-authored artifact touched during apply
- [ ] 4.2 Edit `.claude/commands/opsx/apply.md` to mirror
- [ ] 4.3 Edit `.claude/commands/opsx/refine.md` to include the ambiguity contract (spec edits during refine are themselves often must-ask) and the marker requirement for any artifact the refine pass authors or modifies
- [ ] 4.4 Edit `.claude/commands/opsx/pr.md` to (a) add stacked-mid-implementation mode that opts out of `feat/RAD-xxx-*` enforcement when the branch matches a capability name, (b) include the ambiguity contract, (c) require the `## Decisions made without consultation` section in the PR body template when may-decide calls occurred during the implementation pass

## 5. New `/opsx:plan` command and skill

- [ ] 5.1 Create `.claude/skills/openspec-plan/SKILL.md` following the layout of the existing `openspec-*` skills (frontmatter, input contract, steps, output contract, guardrails)
- [ ] 5.2 The skill MUST: select an active change, read `proposal.md`/`design.md`/`specs/`/`tasks.md`, run the merge-method preflight (via `gh api repos/{owner}/{repo}` with prompt fallback), and write `openspec/changes/<name>/plan.md`
- [ ] 5.3 The skill MUST include the rebase recipe verbatim when strategy is `per-capability stack` and merge-method is `squash`
- [ ] 5.4 The skill MUST apply the ambiguity contract — repo merge-method, sub-PR strategy, intermediate-PR build gate, and stop conditions are must-ask classes if not derivable
- [ ] 5.5 The skill MUST honour the silent-decisions marker rule: any decision made while authoring `plan.md` without user consultation goes into a `## Decisions made without consultation` section at the bottom of the plan
- [ ] 5.6 Create `.claude/commands/opsx/plan.md` mirroring the skill body (per the existing command/skill duplication pattern in this repo)
- [ ] 5.7 Verify the plan artifact is NOT added to `applyRequires` — `/opsx:apply` must continue to run without a plan when none is present

## 6. Living spec for the workflow

- [ ] 6.1 After archive, confirm that `openspec/specs/opsx-workflow/spec.md` and `openspec/specs/opsx-plan-command/spec.md` have been synced from this change's delta specs (the standard archive flow handles this)
- [ ] 6.2 Verify the spec-drift monitor's gh-aw workflow picks up the new capabilities on the next `main` push by reading `.github/workflows/spec-drift-monitor.md` and confirming it globs `openspec/specs/**/spec.md`

## 7. Dogfooding validation

- [ ] 7.1 Create a throwaway test change (`openspec new change test-rule-surface`) and verify the new `rules:` block from §1 (including the silent-decisions marker rule from 1.7) surfaces in `openspec instructions proposal --change test-rule-surface --json`
- [ ] 7.2 Generate the proposal artifact for the throwaway change and confirm the rendered template includes the new sections (Non-code surfaces, Starting state, Cutover); delete the throwaway change after verification
- [ ] 7.3 Verify the silent-decisions marker rule fires: author a throwaway artifact with a clearly silent decision (e.g. a kebab-case naming choice), run `/opsx:review` against the diff, confirm the "Marker missing" finding when the section is absent and that the finding disappears when the section is added
- [ ] 7.4 Run `/opsx:plan harden-opsx-workflow` against this change itself (after §5 lands) and verify a sensible `plan.md` is produced
- [ ] 7.5 Open the PR using the new stacked-mid-implementation mode if applicable, or standard mode otherwise; verify the PR body template includes the `## Decisions made without consultation` section when may-decide calls were logged during this change

## 8. Decisions made without consultation (this change)

- [ ] 8.1 Confirm the proposal-level decisions recorded in `proposal.md`'s `## Decisions made without consultation` section are also present in the PR body when `/opsx:pr` runs
- [ ] 8.2 Confirm `/opsx:summarize` aggregates the marker sections from `proposal.md`, `design.md`, the two spec files, `tasks.md`, and the PR body into `summary.md` at archive time
- [ ] 8.3 Add any additional may-decide calls discovered during implementation to the PR body before opening
