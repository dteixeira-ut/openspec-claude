---
name: "OPSX: Review"
description: Run a code review of the current implementation against specs and tasks
category: Workflow
tags: [workflow, review, quality]
---

Run a code review of the current implementation.

**Input**: Optionally provide a brief description of what was implemented. If omitted, the review is based entirely on the git diff and any context files found in the repo.

Use the **Skill tool** to invoke `review`, passing any provided description as context. The `review` command contains the full review logic.

Display the full review result inline — including the **Decision** (`APPROVED` or `CHANGES REQUESTED`), summary, and any issues.

**After the review:**
- If `APPROVED` → suggest `/opsx:archive` as the next step
- If `CHANGES REQUESTED` → show the issues clearly and wait for guidance before proceeding
