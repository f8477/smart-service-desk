from app.repositories.ticket_repository import TicketRepository
from app.schemas.ticket import TicketCreate, TicketUpdate


class TicketService:

    def __init__(self, repository: TicketRepository) -> None:
        self.repository = repository

    def get_all_tickets(self):
        return self.repository.get_all()

    def get_ticket(self, ticket_id: int):
        return self.repository.get_by_id(ticket_id)

    def create_ticket(self, ticket_data: TicketCreate):
        return self.repository.create(ticket_data)

    def update_ticket(
        self,
        ticket_id: int,
        ticket_data: TicketUpdate,
    ):
        return self.repository.update(ticket_id, ticket_data)

    def delete_ticket(self, ticket_id: int) -> bool:
        return self.repository.delete(ticket_id)