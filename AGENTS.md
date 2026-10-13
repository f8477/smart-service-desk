# AGENTS.md — Smart Service Desk working rules

Smart Service Desk is a long-term portfolio project for a Computer
Engineering student targeting Fachinformatiker/in –
Anwendungsentwicklung Ausbildung in Germany.

## Ground rules
- Respect this architecture: `API Routes → Services → Repositories → Database`.
- Keep `api/`, business logic (`services/`), database access
  (`repositories/`), ORM models (`models/`), and API contracts
  (`schemas/`) separated. No shortcuts between layers.
- Develop phase by phase. Do not implement future phases prematurely.
- Do not introduce unnecessary dependencies or folders.
- Prefer clean, readable, maintainable code over clever code.
- Use English names for code, files, classes, functions, variables,
  database tables, and API endpoints.
- Consider security from the beginning (validated input, least
  privilege, role checks from Phase 2 onward).
- Never commit secrets. Real `.env` files stay local; only
  `.env.example` files are committed.
- When implementing a feature, update the relevant documentation
  (`docs/`) and tests (`backend/tests/`).
- Do not rewrite unrelated parts of the project in a feature change.
- Before making architectural changes, explain the reason and ask
  for confirmation. Do not redesign silently.
- Keep future AI functionality isolated in `services/ai_service.py`
  and `api/routes/ai.py`. Core flows must work without AI.
- Do not add placeholder code that pretends a feature is implemented.
  Use explicit phase TODOs instead.

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
- Phase 9 — AI Assistant (isolated layer only)
- Phase 10 — Documentation and portfolio polish

STOP after Phase 0 scope unless the next phase is explicitly requested.
