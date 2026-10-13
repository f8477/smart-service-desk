from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.repositories.ticket_repository import TicketRepository
from app.schemas.ticket import TicketCreate, TicketResponse, TicketUpdate
from app.services.ticket_service import TicketService


router = APIRouter(
    prefix="/api/tickets",
    tags=["tickets"],
)


def get_ticket_service(
    db: Session = Depends(get_db),
) -> TicketService:
    repository = TicketRepository(db)
    return TicketService(repository)


@router.get(
    "/",
    response_model=list[TicketResponse],
)
def get_tickets(
    service: TicketService = Depends(get_ticket_service),
):
    return service.get_all_tickets()


@router.post(
    "/",
    response_model=TicketResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_ticket(
    ticket_data: TicketCreate,
    service: TicketService = Depends(get_ticket_service),
):
    return service.create_ticket(ticket_data)


@router.get(
    "/{ticket_id}",
    response_model=TicketResponse,
)
def get_ticket(
    ticket_id: int,
    service: TicketService = Depends(get_ticket_service),
):
    ticket = service.get_ticket(ticket_id)

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )

    return ticket


@router.put(
    "/{ticket_id}",
    response_model=TicketResponse,
)
def update_ticket(
    ticket_id: int,
    ticket_update: TicketUpdate,
    service: TicketService = Depends(get_ticket_service),
):
    ticket = service.update_ticket(ticket_id, ticket_update)

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )

    return ticket


@router.delete(
    "/{ticket_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_ticket(
    ticket_id: int,
    service: TicketService = Depends(get_ticket_service),
) -> None:
    deleted = service.delete_ticket(ticket_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )