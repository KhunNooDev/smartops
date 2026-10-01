# SmartOps Codex instructions

## Start every Issue on a new branch

Before changing files for an Issue:

1. Check the working tree with `git status --short`. Preserve unrelated work.
2. Switch to `main`: `git switch main`.
3. Update local `main`: `git pull --ff-only origin main`.
4. Create the Issue branch from updated `main`:
   `git switch -c <type>/OPS-<id>-<short-description>`.
5. Confirm branch before implementation:
   `git branch --show-current`.

The reported branch must exactly match the branch created for the current Issue.
Do not start implementation if checkout, update, branch creation, or branch
verification fails. Ask for direction rather than overwriting or discarding
existing work.

Examples:

```text
chore/OPS-002-github-workflow
feature/OPS-010-device-management
fix/OPS-021-health-check
```
