from app.database.base import Base
from app.database.database import engine
from app.models.ticket import Ticket


Base.metadata.create_all(bind=engine)

print("Tables created successfully.")