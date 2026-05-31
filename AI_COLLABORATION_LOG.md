# AI Collaboration Log

## Tools used

- **Cursor** (Composer agent) — scaffolding, implementation, and documentation
- **Plan + grill-with-docs session** — architecture decisions before coding

## Example prompts relied on
To be honest, i just took the pdf with assignment description and gave it tp cursor with the skill "grill-with-docs". this skill is created by a guy named Matt and can be found here: https://www.aihero.dev/grill-with-docs
This skill is excellent and for a lot of tasks, including this one, is enough to one shot the solution. there few others we can use like TDD and improve architecture but they werent so much needed for this task.

few other prompts i used is when i reviewed the code i asked to change some parmaters to be class property and break some functions to be smaller.


## What I would improve with more time

- **Outbox pattern** use  SQS for actual event driven approach that will scale and persist.
- **Integration tests** with mocked OpenRouter and a test Postgres container
- **Observability**: structured logging, metrics for queue depth and analysis latency
- **OpenAPI** document generated from Nest decorators for reviewers
- **Budget** Add budget control on api request and limit users that will abuse the system
