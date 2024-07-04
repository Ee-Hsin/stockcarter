from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional

class User(BaseModel):
    id: str = Field(..., alias='_id')  # Using an alias
    email: str
    name: Optional[str] = None
    isAdmin: bool = Field(default=False)
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    class Config:
        populate_by_name = True