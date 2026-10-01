# OPS-002: GitHub Issue and pull request workflow

SmartOps development work uses a GitHub Issue Form, a Pull Request template, and
automatic `OPS-xxx` Issue IDs. The SmartOps ID is independent from GitHub's
native Issue and Pull Request numbers.

## Files

```text
.github/
├── ISSUE_TEMPLATE/
│   └── task.yml
├── pull_request_template.md
└── workflows/
    └── assign-issue-id.yml
```

## Create a development Issue

1. In GitHub, select **Issues** then **New issue**.
2. Choose **Development task**.
3. Enter a title without an `OPS-xxx` prefix.
4. Complete Goal, Scope, Acceptance Criteria, Out of Scope, and Technical Notes.
5. Create the Issue.

GitHub starts the ID workflow after the Issue opens. It updates the title to the
next available ID, for example:

```text
Improve environment configuration
```

becomes:

```text
OPS-003: Improve environment configuration
```

Do not use the GitHub Issue number as a SmartOps ID. A pull request can consume
a native number without affecting the next `OPS-xxx` value.

## Create a pull request

The Pull Request template opens automatically. Complete Summary, Changes,
Testing, Related Issue, and Notes. In Related Issue, reference the GitHub Issue
number with a closing keyword:

```md
Closes #3
```

GitHub closes that Issue when the pull request merges.

## ID assignment behavior

The workflow runs only for newly opened Issues and has only `issues: write`
permission. All runs share one GitHub Actions concurrency group, so a later
Issue waits while an earlier Issue selects and writes its ID. Each run reads all
existing Issues, ignores Pull Requests, finds the largest valid `OPS-<number>:`
prefix, then assigns the next number with at least three digits.

If an Issue already has a valid prefix such as `OPS-005: Add device management`,
the workflow leaves it unchanged. This makes repeated runs safe.

## Verify after merge to `main`

1. Create an Issue without an `OPS-xxx` prefix. Confirm its title gains the next
   sequential ID and retains original title text.
2. Re-run **Assign SmartOps issue ID** for that Issue. Confirm title does not
   change.
3. Create two Issues close together. Confirm they receive distinct sequential
   IDs.
4. Create a Pull Request. Confirm template appears and `Closes #<issue-number>`
   closes linked Issue after merge.
5. Confirm the workflow permissions show only `issues: write`.

## Troubleshooting

If an ID does not appear, open the Issue's **Actions** run and inspect the
**Assign next OPS ID** step. The workflow must exist on the repository's default
branch before newly opened Issues can use it. Re-running the failed workflow is
safe: existing valid IDs are not changed.
