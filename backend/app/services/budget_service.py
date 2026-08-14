from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from collections import defaultdict
from app.models.trip import Trip
from app.models.expense import Expense
from app.models.itinerary import ItineraryItem, ItineraryDay
from app.schemas.budget import BudgetBreakdown, BudgetAnalysis, BudgetCategory, SavingSuggestion
from app.services.trip_service import TripService

class BudgetService:
    @staticmethod
    async def get_budget_analysis(db: AsyncSession, trip_id: int, user_id: int) -> BudgetBreakdown:
        trip = await TripService.get_trip(db, trip_id, user_id)
        total_budget = trip.total_budget or 0.0
        
        # Calculate expenses from itinerary
        stmt = select(ItineraryItem).join(ItineraryDay).where(ItineraryDay.trip_id == trip_id)
        result = await db.execute(stmt)
        items = result.scalars().all()
        
        category_totals = defaultdict(float)
        for item in items:
            cat_name = item.category.value if hasattr(item.category, "value") else str(item.category)
            category_totals[cat_name] += item.estimated_cost
            
        # Get separate expenses
        exp_stmt = select(Expense).where(Expense.trip_id == trip_id)
        exp_result = await db.execute(exp_stmt)
        expenses = exp_result.scalars().all()
        
        for exp in expenses:
            category_totals[exp.category] += exp.amount
            
        total_spent = sum(category_totals.values())
        
        categories = []
        for cat, amount in category_totals.items():
            allocated = (amount / total_spent * total_budget) if total_spent and total_budget else amount
            categories.append(BudgetCategory(
                category=cat,
                allocated=allocated,
                spent=amount,
                remaining=allocated - amount,
                percentage_of_total=(amount / total_spent * 100) if total_spent else 0
            ))
            
        analysis = BudgetAnalysis(
            total_budget=total_budget,
            total_spent=total_spent,
            total_remaining=total_budget - total_spent,
            categories=categories,
            daily_average=total_spent / ((trip.end_date - trip.start_date).days + 1) if (trip.end_date - trip.start_date).days >= 0 else total_spent,
            warnings=["Over budget"] if total_spent > total_budget else []
        )
        
        return BudgetBreakdown(analysis=analysis, suggestions=[])
        
    @staticmethod
    async def suggest_savings(db: AsyncSession, trip_id: int, user_id: int) -> BudgetBreakdown:
        breakdown = await BudgetService.get_budget_analysis(db, trip_id, user_id)
        
        # Deterministic logic for savings
        suggestions = []
        for cat in breakdown.analysis.categories:
            if cat.category == "ACCOMMODATION" and cat.percentage_of_total > 40:
                suggestions.append(SavingSuggestion(category="ACCOMMODATION", suggestion="Consider cheaper hostels or homestays", potential_savings=cat.spent * 0.2))
            if cat.category == "FOOD" and cat.percentage_of_total > 30:
                suggestions.append(SavingSuggestion(category="FOOD", suggestion="Try local street food instead of restaurants", potential_savings=cat.spent * 0.3))
                
        breakdown.suggestions = suggestions
        return breakdown
