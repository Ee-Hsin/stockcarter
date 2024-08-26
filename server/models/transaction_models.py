
from pydantic import BaseModel, Field, validator
from datetime import datetime, timezone
from typing import Optional
from enum import Enum
from typing import List


class CurrencyEnum(Enum):
    USD = "USD"
    # Add other currencies if needed in the future


class TransactionTypeEnum(Enum):
    BUY = 1
    SELL = -1


class Transaction(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    userId: Optional[str] = None  # User ID to link transaction to the user
    currency: CurrencyEnum
    date: datetime  # Pydantic transaction model automatically parses ISO 8601 strings
    # into datetime objects
    notes: Optional[str] = None
    price: float
    ticker: str
    transactionType: TransactionTypeEnum
    units: int

    class Config:
        use_enum_values = True


class TransactionResponse(BaseModel):
    message: str
    transaction_ids: List[str]
