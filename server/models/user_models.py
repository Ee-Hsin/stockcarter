from pydantic import BaseModel, Field, validator
from datetime import datetime, timezone
from typing import Optional, List
from enum import Enum
from .transaction_models import Transaction  # Import the Transaction model from transaction_models


class ExperienceLevel(Enum):
    beginner = "Beginner"
    intermediate = "Intermediate"
    expert = "Expert"


class InvestmentTimeframe(Enum):
    day_trader = "Day Trader (1 day - 1 week)"
    short_term_investor = "Short Term Investor (1-6 months)"
    medium_term_investor = "Medium Term Investor (6 -12 months)"
    long_term_investor = "Long Term Investor (1 - 5 years+)"


class InvestorType(Enum):
    short_term_trader = "Short Term Trader"
    value_investor = "Value Investor"
    growth_investor = "Growth Investor"
    dividend_investor = "Dividend Investor"
    quality_investor = "Quality Investor"
    no_strategy_investor = "No Strategy Investor"
    other = "Other"


class User(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    email: str
    name: Optional[str] = None
    isAdmin: bool = Field(default=False)
    isOnboarded: bool = Field(default=False)
    age: Optional[int] = None
    experienceLevel: Optional[ExperienceLevel] = None
    investmentTimeframe: Optional[InvestmentTimeframe] = None
    investorType: Optional[InvestorType] = None
    transactions: List[Transaction] = []  # List of transactions
    createdAt: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))

    class Config:
        populate_by_name = True


class UserUpdateModel(BaseModel):
    isOnboarded: Optional[bool] = None
    isAdmin: Optional[bool] = None
    email: Optional[str] = None
    name: Optional[str] = None
    age: Optional[int] = None
    experienceLevel: Optional[ExperienceLevel] = None
    investmentTimeframe: Optional[InvestmentTimeframe] = None
    investorType: Optional[InvestorType] = None
    transactions: Optional[List[Transaction]] = None
