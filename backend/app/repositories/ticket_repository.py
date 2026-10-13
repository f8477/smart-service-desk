from sqlalchemy.orm import Session

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate


class TicketRepository:

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_all(self) -> list[Ticket]:
        return (
            self.db.query(Ticket)
            .order_by(Ticket.id)
            .all()
        )

    def get_by_id(self, ticket_id: int) -> Ticket | None:
        return (
            self.db.query(Ticket)
            .filter(Ticket.id == ticket_id)
            .first()
        )

    def create(self, ticket_data: TicketCreate) -> Ticket:
        ticket = Ticket(
            title=ticket_data.title,
            description=ticket_data.description,
            priority=ticket_data.priority,
            category=ticket_data.category,
            status="open",
        )

        self.db.add(ticket)
        self.db.commit()
        self.db.refresh(ticket)

        return ticket

    def update(
        self,
        ticket_id: int,
        ticket_data: TicketUpdate,
    ) -> Ticket | None:
        ticket = self.get_by_id(ticket_id)

        if ticket is None:
            return None

        update_data = ticket_data.model_dump(
            exclude_unset=True,
        )

        for field, value in update_data.items():
            setattr(ticket, field, value)

        self.db.commit()
        self.db.refresh(ticket)

        return ticket

    def delete(self, ticket_id: int) -> bool:
        ticket = self.get_by_id(ticket_id)

        if ticket is None:
            return False

        self.db.delete(ticket)
        self.db.commit()

        return True