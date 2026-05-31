# Feedback Insights

Service that ingests free-text product feedback, persists it, and asynchronously produces structured sentiment and feature insights via an LLM.

## Language

**Feedback**:
A single free-text submission from a user, stored with lifecycle status and optional analysis results.
_Avoid_: ticket, comment (unless referring to the raw text field)

**Analysis Run**:
One append-only record of an LLM attempt for a Feedback item, including raw response and validated structured output.
_Avoid_: result, insight (when meaning the DB row)

**Normalized Content Hash**:
SHA-256 of trimmed, whitespace-collapsed, lowercased feedback text used for deduplication only; original content is stored unchanged.
_Avoid_: fingerprint, checksum (in user-facing docs)

**Feedback Status**:
Lifecycle state: `RECEIVED`, `ANALYZING`, `DONE`, or `FAILED`.
_Avoid_: state (generic), processing (ambiguous)

**Dedup Submit**:
Submitting feedback whose normalized hash already exists returns HTTP 200 with the existing Feedback; analysis is not re-queued unless the client calls retry on `FAILED`.
_Avoid_: duplicate error, conflict response

## Relationships

- A **Feedback** has zero or many **Analysis Run** rows (one per attempt)
- A **Feedback** optionally points to its latest **Analysis Run** via `latest_analysis_id`
- **Dedup Submit** keys on **Normalized Content Hash**, which belongs to exactly one **Feedback**

## Example dialogue

> **Dev:** "If someone posts the same feedback twice while the first is still `ANALYZING`, do we analyze twice?"
> **Domain expert:** "No. Dedup Submit returns the existing Feedback and does not enqueue again while status is `ANALYZING` or `DONE`."

> **Dev:** "When OpenRouter returns malformed JSON, do we retry?"
> **Domain expert:** "No. That marks `FAILED` on the Analysis Run. Only transient API failures get auto-retry."

## Flagged ambiguities

- Spec mentioned Docker for database; resolved: **remote Postgres** via `DATABASE_URL`, Docker only for the API container.
