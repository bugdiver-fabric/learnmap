# Learnmap monorepo

| Package | Path |
|---------|------|
| API | `api/` |
| App | `app/` |

`learnmap/api` → `api/`, `learnmap/app` → `app/`. See `AGENTS.md`.

## Prerequisites

- Node.js 22+ (`.nvmrc`)
- Docker Compose, or PostgreSQL 16+ for local API

## Setup

```bash
git clone git@github.com:AI-warriors-au/roadmap-build.git
cd roadmap-build
cp .env.example .env
docker compose up
```

Each package (`api/`, `app/`) has its own `package.json` and lockfile. There is no root npm workspace — run commands from the package directory, or use Docker.

## Docker (full stack)

```bash
docker compose up
```

| Service | URL |
|---------|-----|
| App | http://localhost:5173 |
| API | http://localhost:3000/health |
| PostgreSQL | `localhost:5432` — `learnmap` / `learnmap` / `learnmap` |

```bash
docker compose up -d              # detached
docker compose up -d postgres     # postgres only
docker compose logs -f api
docker compose down -v && docker compose up   # reset database
docker compose build api && docker compose up -d api   # rebuild API image
docker compose exec api npm run db:migration:deploy  # migrate manually
```

Migrations run automatically when the API container starts. Set `SEED_DATABASE=true` in `.env` to seed on startup (once `prisma.seed` is configured in `api/package.json`).

## Local API (without Docker for the API process)

```bash
docker compose up -d postgres     # or use your own PostgreSQL
cd api && npm ci --include=dev
npm run db:migration:deploy
npm run start:dev
curl http://localhost:3000/health
```

| Task | Command (from `api/`) |
|------|------------------------|
| Start API | `npm run start:dev` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Test | `npm run test` |

## Database / Prisma

Schema: `api/prisma/schema.prisma` · Migrations: `api/prisma/migrations/`

Use npm scripts from `api/` (loads `DATABASE_URL` from `.env` at repo root or `api/.env`):

| Task | Command (from `api/`) |
|------|------------------------|
| Apply migrations | `npm run db:migration:deploy` |
| Create migration | `npm run db:migration:generate -- --name descriptive_name` |
| Reset database | `npm run db:migration:reset` |
| Seed | `npm run db:seed` |
| Prisma Studio | `npm run db:studio` |

After editing `schema.prisma`:

```bash
cd api
npm run db:migration:generate -- --name add_my_change
npm run db:migration:deploy
```

Commit `schema.prisma` and the new file under `api/prisma/migrations/`.

**`DATABASE_URL` in `.env`**

```env
# Host / Prisma Studio / local API against Docker Postgres
DATABASE_URL=postgresql://learnmap:learnmap@localhost:5432/learnmap
```

## App (local, without Docker for the app process)

```bash
cd app && npm ci --include=optional
npm run start:dev
```

| Task | Command (from `app/`) |
|------|------------------------|
| Lint | `npm run lint` |
| Build | `npm run build` |
| Test | `npm run test` |

## Deployment

Deploy on **Render (free)** + **Neon**, orchestrated by GitHub Actions — no Blueprint. One workflow per service: lint / test / build → Dev → manual approval → Prod. See [`docs/deployment-render.md`](docs/deployment-render.md).

## Agent / GitHub MCP

```bash
gh auth login -h github.com -p https -s repo,read:org
bash scripts/setup-github-mcp.sh
export GITHUB_TOKEN=$(gh auth token)
```

Restart Cursor, or in chat: **Setup mcps**
