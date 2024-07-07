from pydantic import BaseModel, Field, validator
from datetime import datetime, timezone
from typing import Optional, List
from enum import Enum


# Ensure these enums are always the same as the frontend
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
    id: str = Field(..., alias='_id')  # Using an alias
    email: str
    name: Optional[str] = None
    isAdmin: bool = Field(default=False)
    isOnboarded: bool = Field(default=False)
    age: Optional[int] = None
    experienceLevel: Optional[ExperienceLevel] = None
    investmentTimeframe: Optional[InvestmentTimeframe] = None
    investorType: List[InvestorType] = Field(default_factory=list)
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    class Config:
        populate_by_name = True
    
    # Limits number of investor types to 2
    @validator('investorType')
    def limit_investor_types(cls, value):
        if len(value) > 2:
            raise ValueError("You can select up to 2 investor types.")
        return value