from fastapi import FastAPI

from app.api.routes.tickets import router as tickets_router


app = FastAPI(
    title="Smart Service Desk API",
    version="0.1.0",
    description="IT Helpdesk / Ticket Management API",
)


app.include_router(tickets_router)


@app.get("/", tags=["root"])
def root() -> dict[str, str]:
    return {
        "message": "Welcome to Smart Service Desk API",
        "version": "0.1.0",
    }


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "phase": "0-setup",
    }
