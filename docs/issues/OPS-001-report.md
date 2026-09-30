# OPS-001: Run locally

Use Docker for PostgreSQL. Run the API and web app locally.

## Prerequisites

- Bun
- .NET 10 SDK
- Docker Desktop with Docker Compose v2

## 1. Start PostgreSQL

Start Docker Desktop. From Git Bash at the repository root, create local environment files once:

```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
```

Start the database:

```bash
docker compose up -d postgres
```

## 2. Start the API

In terminal 1, from the repository root:

```bash
dotnet run --project apps/api/SmartOps.Api.csproj
```

## 3. Start the web app

In terminal 2:

```bash
cd apps/web
bun install
bun run dev
```

Open http://localhost:3000.

## 4. Check health

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{"status":"healthy","database":"connected"}
```

## Without Docker

The web app and API can start without Docker, but the health check returns `unavailable` because PostgreSQL is not running.

## Stop PostgreSQL

```bash
docker compose down
```
