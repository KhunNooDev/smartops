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
