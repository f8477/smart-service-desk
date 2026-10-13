# Smart Service Desk

Professional IT Helpdesk / Ticket Management web application.

Portfolio project for a Computer Engineering student targeting
Fachinformatiker/in – Anwendungsentwicklung Ausbildung in Germany.

> Current status: **Phase 0 — project setup and architecture.**
> No features are implemented yet. Structure and documentation only.

## Purpose
Employees report IT issues, IT support triages and resolves them,
and admins oversee users and categories — with dashboards, audit
history, and (later) isolated AI assistance.

## Main technologies
- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, Pydantic, JWT (planned), pytest
- **Frontend:** React, TypeScript, Vite
- **Infrastructure:** Docker, Docker Compose
- **Version control:** Git
- **AI (later, isolated):** assistance layer kept separate from core logic

## High-level architecture
Layered backend:

```
API Routes → Services → Repositories → Database
```

- `api/` — HTTP routing only.
- `services/` — business logic (AI stays isolated in `ai_service.py`).
- `repositories/` — database access only.
- `models/` + `schemas/` — ORM models and API contracts.
- `core/` — config, security, dependencies.
- `utils/` — reusable helpers.

Details: `docs/architecture.md`.

## Current development status
Phase 0 complete state (this commit):
- Directory structure created.
- Empty module placeholders with phase TODOs.
- Config examples (`.env.example`), Dockerfiles, Compose file.
- Initial docs (`architecture`, `requirements`, `api`, `database`).
- No dependencies installed, no services started, no business logic.

## Planned development phases
- Phase 0 — Project setup and architecture (current)
- Phase 1 — Database
- Phase 2 — Authentication and authorization
- Phase 3 — Ticket management
- Phase 4 — Comments and activity log
- Phase 5 — Frontend
- Phase 6 — Dashboard, search and filtering
- Phase 7 — Testing
- Phase 8 — Docker and deployment
- Phase 9 — AI Assistant (isolated)
- Phase 10 — Documentation and portfolio polish

See `AGENTS.md` for working rules and `docs/` for details.
