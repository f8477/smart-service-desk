# Architecture — Smart Service Desk

Status: Phase 0 (setup). This document describes the target backend
layering. The frontend is a separate React + TypeScript + Vite app
that talks to the backend over REST.

## Layered backend flow

```
API Routes
  → Services
    → Repositories
      → Database
```

## Layer responsibilities

### API (`backend/app/api/`)
- HTTP routing only.
- Validates requests/responses with `schemas/`.
- Delegates all business logic to `services/`.
- Contains no SQL and no business rules.

### Services (`backend/app/services/`)
- Business logic and orchestration.
- Calls repositories, enforces rules (assignment, status, roles).
- Contains no raw SQL and no HTTP routing code.
- `ai_service.py` is isolated: AI may assist (classification,
  suggestions) but must never own business rules. Core flows must
  work without AI (see Phase 9).

### Repositories (`backend/app/repositories/`)
- Database access only (SQLAlchemy).
- CRUD operations per aggregate.
- Contains no business logic and no HTTP code.

### Database (`backend/app/database/`, `backend/app/models/`)
- `database/`: engine, session, `Base`.
- `models/`: SQLAlchemy ORM models (`User`, `Ticket`, `Comment`,
  `Category`, `Activity`).
- Schema creation/migrations arrive in Phase 1.

## Supporting layers

### Core (`backend/app/core/`)
- `config.py`: environment-based configuration.
- `security.py`: password hashing, JWT handling (Phase 2).
- `dependencies.py`: shared FastAPI dependencies
  (DB session, current user, role checks).

### Schemas (`backend/app/schemas/`)
- Pydantic request/response contracts.
- API validation boundary between HTTP and services.

### Utils (`backend/app/utils/`)
- Reusable validation/helpers with no layer-specific coupling.

## Data flow example (planned)

1. `POST /tickets` hits `api/routes/tickets.py`.
2. Request is validated with `schemas/ticket.py`.
3. `services/ticket_service.py` applies business rules.
4. `repositories/ticket_repository.py` persists via SQLAlchemy.
5. Response is serialized with a response schema.

No shortcuts between layers. See `AGENTS.md` before changing this.
