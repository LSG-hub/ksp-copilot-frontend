# KSP Copilot — Frontend (React)

React SPA for **Challenge 1**, deployed to **Catalyst Slate / Web Client Hosting**. Own GitHub repo.
See `../docs/PLAN.md` for architecture.

## Responsibilities
- Conversational chat UI (multi-turn, context-aware) — text + voice input.
- Renders grounded answers with **visible executed query + source FIR IDs** (the trust story).
- **Criminal-network graph**, **crime hotspot map** (lat/long), timelines, trend charts.
- Kannada/English toggle; PDF export of a conversation (via backend SmartBrowz).
- Catalyst Auth (embedded/hosted) + role-based views.

## Notes
- Talks to Catalyst Functions via API Gateway; ensure this origin is whitelisted (CORS).
- Deck-quality visuals matter — senior officers judge on the dashboard "snapshot" feel.
