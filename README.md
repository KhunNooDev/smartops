# SmartOps

SmartOps local development setup.

Read the [issue documentation](docs/issues) to start, check, build, and stop the local environment.

## Quick start

From Git Bash at the repository root:

    cp .env.example .env
    cp apps/web/.env.example apps/web/.env.local
    docker compose up -d postgres
    dotnet run --project apps/api/SmartOps.Api.csproj

In a second terminal:

    cd apps/web
    bun install
    bun run dev

Open http://localhost:3000.

## GitHub workflow

Create development work with the **Development task** Issue Form. Do not add an
`OPS-xxx` prefix: GitHub automatically adds the next available SmartOps ID after
the Issue opens. The ID is independent from the GitHub Issue number and remains
unchanged if the workflow runs again.

Pull requests start with the repository template. In **Related Issue**, use the
native Issue number, for example `Closes #3`, so GitHub closes the related Issue
when the pull request merges.
