from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional

class User(BaseModel):
    _id: str
    email: str
    name: Optional[str] = None
    isAdmin: bool = Field(default=False)
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=datetime.now(timezone.utc))
