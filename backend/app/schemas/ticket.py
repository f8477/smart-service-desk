from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


Priority = Literal["low", "medium", "high", "critical"]

Category = Literal[
    "hardware",
    "software",
    "network",
    "account",
    "security",
    "other",
]

TicketStatus = Literal[
    "open",
    "assigned",
    "in_progress",
    "waiting_for_user",
    "resolved",
    "closed",
    "reopened",
]


class TicketCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=5)

    priority: Priority = "medium"
    category: Category = "other"


class TicketUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=200,
    )

    description: str | None = Field(
        default=None,
        min_length=5,
    )

    priority: Priority | None = None
    category: Category | None = None
    status: TicketStatus | None = None

    @model_validator(mode="after")
    def reject_explicit_nulls(self):
        for field in self.model_fields_set:
            if getattr(self, field) is None:
                raise ValueError(
                    f"{field} cannot be null when provided"
                )

        return self


class TicketResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    priority: Priority
    category: Category
    status: TicketStatus
    created_at: datetime