from typing import List, Dict, Optional
from pydantic import BaseModel

class BudgetCategory(BaseModel):
    category: str
    allocated: float
    spent: float
    remaining: float
    percentage_of_total: float

class SavingSuggestion(BaseModel):
    category: str
    suggestion: str
    potential_savings: float

class BudgetAnalysis(BaseModel):
    total_budget: float
    total_spent: float
    total_remaining: float
    categories: List[BudgetCategory]
    daily_average: float
    warnings: List[str]

class BudgetBreakdown(BaseModel):
    analysis: BudgetAnalysis
    suggestions: List[SavingSuggestion]
