# SmartOps Codex instructions

## Start every Issue or follow-up fix on a new branch

Before changing files for an Issue, review fix, follow-up fix, or documentation
change:

1. Check the working tree with `git status --short`. Preserve unrelated work.
2. Switch to `main`: `git switch main`.
3. Update local `main`: `git pull --ff-only origin main`.
4. Create the Issue branch from updated `main`:
   `git switch -c <type>/OPS-<id>-<short-description>`.
5. Confirm branch before the first file change:
   `git branch --show-current`.

The reported branch must exactly match the branch created for the current Issue.
Do not create, edit, or patch any file before branch verification succeeds. Do
not start implementation if checkout, update, branch creation, or branch
verification fails. Ask for direction rather than overwriting or discarding
existing work.

## Verify every change before reporting completion

After each implementation or fix, run the relevant checks before reporting it
complete. Use the strongest available verification for the changed behavior,
then run `git diff --check`. For GitHub Actions changes, verify workflow syntax
and the changed event-path logic; when a live GitHub run is required but cannot
be performed locally, state that limitation explicitly. Do not call static text
checks alone full verification when the behavior depends on GitHub Actions.

Examples:

```text
chore/OPS-002-github-workflow
feature/OPS-010-device-management
fix/OPS-021-health-check
```
