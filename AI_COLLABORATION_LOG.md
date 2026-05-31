# AI Collaboration Log

## Tools used

- **Cursor** (Composer agent) — scaffolding, implementation, and documentation
- **Plan + grill-with-docs session** — architecture decisions before coding

## Example prompts relied on

1. *"Implement the Feedback Insights Backend plan: NestJS, Prisma, hash dedup, in-process queue, OpenRouter with Zod validation, dual retry policy."*

2. *"Grill the design: choose stack, guardrail, retry semantics, dedup API contract, and OpenRouter model enum for cheap models (Gemini, Kimi, DeepSeek)."*

3. *"Use Prisma 7 with Postgres adapter; validate env at startup; expose POST/GET feedback and POST retry with offset pagination."*

## Correction example

**Issue:** Initial Prisma 7 setup used `datasourceUrl` in `PrismaClient` constructor (Prisma 6 style). Build failed: property does not exist.

**AI output:** Assumed classic Prisma client initialization.

**Correction:** Read generated `client.ts` docs — Prisma 7 requires `@prisma/adapter-pg` with a `pg` `Pool`. Updated `PrismaService` to pass `{ adapter: new PrismaPg(pool) }`.

**Constraint added:** Always run `npm run build` after schema/client changes before marking scaffold complete.

## What I would improve with more time

- **Outbox pattern** or durable queue (BullMQ + Redis) so analysis jobs survive process restarts
- **Integration tests** with mocked OpenRouter and a test Postgres container
- **Model capability probe** at startup to select `json_schema` vs `json_object` fallback per model
- **Observability**: structured logging, metrics for queue depth and analysis latency
- **OpenAPI** document generated from Nest decorators for reviewers
