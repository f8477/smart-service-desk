# Requirements — Smart Service Desk (initial, Phase 0)

This is the planned scope. Nothing below is implemented yet.
Features will be built phase by phase (see `AGENTS.md`).

## Purpose
Professional IT Helpdesk / Ticket Management web application.
Portfolio project for a Computer Engineering student targeting
Fachinformatiker/in – Anwendungsentwicklung Ausbildung in Germany.

## Roles
- Employee: creates and tracks own tickets, comments.
- IT Support: triages, assigns, updates, resolves tickets.
- Admin: manages users, categories, and system configuration.

## Functional scope (planned)
- Authentication: registration, login, JWT-based sessions.
- Role-based authorization: employee / support / admin.
- Ticket creation with title, description, category, priority.
- Ticket assignment to support staff.
- Ticket status management (e.g. open → in progress → resolved → closed).
- Ticket priorities.
- Categories for classification.
- Comments on tickets.
- Activity / audit history per ticket.
- Search and filtering (status, priority, category, assignee, text).
- Dashboard and reports (workload, SLA-relevant overviews).
- Notifications (scope to be defined in a later phase).
- AI-assisted ticket classification and suggestions (Phase 9 only,
  isolated in `services/ai_service.py`; core flows work without AI).

## Non-functional notes
- Clean layered architecture (API → Services → Repositories → Database).
- English identifiers for code, tables, and endpoints.
- Security considered from the start (no secrets in git, validated input,
  role checks from Phase 2 onward).
- Maintainability over clever code; no over-engineering.
- `pytest` coverage grows from Phase 2 onward (see Phase 7).
- Dockerized local setup via Docker Compose (Phase 8).
