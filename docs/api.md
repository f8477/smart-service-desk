# API Documentation — Smart Service Desk (initial, Phase 0)

No REST endpoints are implemented yet.

## Plan
Endpoints will be added phase by phase:

- Phase 2: `/auth`, `/users` — authentication and user management.
- Phase 3: `/tickets`, `/categories` — ticket management.
- Phase 4: `/comments` (and activity history) — collaboration trail.
- Phase 6: `/dashboard` — reports, search and filtering.
- Phase 9: `/ai` — isolated AI assistance (optional).

## Conventions (to be enforced when endpoints land)
- English, plural resource names (`/tickets`, `/comments`).
- Pydantic schemas for all requests/responses.
- Routes delegate to services; no business logic in routes.
- Authenticated, role-checked access from Phase 2 onward.

This file will grow with each phase.
