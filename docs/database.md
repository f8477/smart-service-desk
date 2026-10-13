# Database Design — Smart Service Desk (initial, Phase 0)

No database schema is implemented yet.
SQLAlchemy models and migrations arrive in Phase 1.

## Planned entities

- **User** (`users`) — employee / support / admin accounts.
  Authentication and roles land in Phase 2.
- **Ticket** (`tickets`) — core helpdesk request with status,
  priority, category reference, reporter, and assignee.
- **Comment** (`comments`) — discussion entries linked to tickets.
- **Category** (`categories`) — ticket classification.
- **Activity** (`activities`) — audit trail for ticket events
  (creation, assignment, status changes).

## Planned conventions
- English table and column names.
- PostgreSQL in development and production (via Docker Compose).
- Migrations under `database/migrations/` (tooling defined in Phase 1).
- Repositories own all SQL; services own all rules.

Entity fields, relations, and indexes will be documented in Phase 1.
