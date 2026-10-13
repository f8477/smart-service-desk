"""AI assistance routes.

Endpoints planned for Phase 9 (AI Assistant) only.
Must remain optional and isolated from core ticket logic.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["ai"])

# TODO(Phase 9): implement AI-assisted endpoints.
