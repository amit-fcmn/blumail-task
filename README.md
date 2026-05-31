# Feedback Insights API

Backend service that accepts free-text feedback, persists it to PostgreSQL, and asynchronously extracts structured insights via OpenRouter (LLM).

## Prerequisites

- Node.js 22+
- PostgreSQL database (remote connection string)
- [OpenRouter](https://openrouter.ai/) API key

## Setup

1. Copy environment template:

```bash
cp .env.example .env
```

2. Set variables in `.env`:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Render: include `?sslmode=require`) |
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `OPENROUTER_MODEL` | One of: `GEMINI_3_5_FLASH`, `KIMI_K2_6`, `DEEPSEEK_V4_FLASH`, `DEEPSEEK_V4_FLASH_FREE` |
| `PORT` | HTTP port (default `3000`) |

3. Install dependencies, generate the Prisma client, and apply migrations:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

> **Note:** Prisma 7 uses `moduleFormat = "cjs"` in `prisma/schema.prisma` so the generated client works with NestJS (avoids `exports is not defined` at runtime).

4. Run locally:

```bash
npm run start:dev
```

## UI

The same process serves a minimal browser UI at the app root (co-deployed with the API, no separate frontend service).

| URL | Purpose |
|-----|---------|
| `http://localhost:3000/` | Submit feedback, browse list, view insights, retry failed analysis |
| `http://localhost:3000/health` | API liveness (JSON) |

Static files live in [`public/`](public/) and are copied to `dist/public` on build. API routes (`/feedback`, `/health`) are unchanged.

After `npm run start:dev` or `docker compose up --build`, open `http://localhost:3000/` (or your configured `PORT`).

## Docker

Build and run the API container (uses `.env` for configuration):

```bash
docker compose up --build
```

Run migrations against your remote database before or after starting the container:

```bash
npx prisma migrate deploy
```

## API

### `POST /feedback`

Submit feedback. Returns `201` for new items, `200` when content hash matches an existing row (deduplication).

```json
{ "content": "Love the app but export is slow." }
```

### `GET /feedback`

List feedback with pagination.

Query params: `page` (default 1), `limit` (default 20, max 100), `status` (`RECEIVED`, `ANALYZING`, `DONE`, `FAILED`).

### `GET /feedback/:id`

Single feedback with latest analysis attempt.

### `POST /feedback/:id/retry`

Manual retry when status is `FAILED` and attempts remain (max 5 total).

### `GET /health`

Liveness check.

## State machine

```
RECEIVED → ANALYZING → DONE
                    ↘ FAILED → (auto-retry if transient) → ANALYZING
                    ↘ FAILED → POST /feedback/:id/retry
```

- Auto-retry: up to 3 attempts for transient OpenRouter errors (429, 5xx, timeout) with 3s / 5s backoff + jitter.
- Validation failures (invalid JSON / schema): `FAILED` immediately, no auto-retry.
- Manual retry allowed up to 5 total attempts.

## Structured AI output

Validated with OpenRouter `json_schema` (strict) and Zod:

```json
{
  "sentiment": "positive | neutral | negative",
  "feature_requests": [{ "title": "string", "confidence": 0.0 }],
  "actionable_insight": "string"
}
```

Raw response and validated JSON are stored on the `analysis` table.

## Tradeoffs

| Choice | Why | Cost |
|--------|-----|------|
| In-process queue | Meets spec without Redis; simplest async path | Jobs lost on crash; single instance |
| Hash dedup guardrail | Stops duplicate LLM spend on identical feedback | Normalization may treat near-duplicates as distinct |
| Remote Postgres (no DB container) | You provide `DATABASE_URL` | Reviewers need their own database |
| 16,384 char cap | Boundary validation without truncation guardrail | Very long feedback rejected at API |
| Append-only `analysis` rows | Audit trail per attempt | More rows than single update-in-place |
| Prisma 7 + driver adapter | Current Prisma default for Postgres | Slightly more setup than Prisma 6 |

## AI Collaboration Log

See [AI_COLLABORATION_LOG.md](./AI_COLLABORATION_LOG.md).

## Domain language

See [CONTEXT.md](./CONTEXT.md).
