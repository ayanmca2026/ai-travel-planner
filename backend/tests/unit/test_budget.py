import pytest
from app.services.budget_service import BudgetService
from app.models.itinerary import ItineraryDay, ItineraryItem
from app.models.expense import Expense

@pytest.mark.asyncio
async def test_budget_analysis(db_session, test_user, sample_trip):
    # Setup itinerary expenses
    day = ItineraryDay(trip_id=sample_trip.id, day_number=1, date=sample_trip.start_date, total_estimated_cost=0)
    db_session.add(day)
    await db_session.flush()
    
    # 5000 Accommodation
    item1 = ItineraryItem(day_id=day.id, title="Hotel", category="ACCOMMODATION", estimated_cost=5000)
    # 3000 Restaurant
    item2 = ItineraryItem(day_id=day.id, title="Lunch", category="RESTAURANT", estimated_cost=3000)
    
    db_session.add_all([item1, item2])
    await db_session.commit()
    
    analysis = await BudgetService.get_budget_analysis(db_session, sample_trip.id, test_user.id)
    assert analysis.analysis.total_spent == 8000
    assert analysis.analysis.total_remaining == 2000 # 10000 total budget
    
    categories = {c.category: c for c in analysis.analysis.categories}
    assert "ACCOMMODATION" in categories
    assert categories["ACCOMMODATION"].spent == 5000
    assert categories["RESTAURANT"].spent == 3000
    
@pytest.mark.asyncio
async def test_savings_suggestions(db_session, test_user, sample_trip):
    # Setup scenario where Accommodation > 40%
    day = ItineraryDay(trip_id=sample_trip.id, day_number=1, date=sample_trip.start_date, total_estimated_cost=0)
    db_session.add(day)
    await db_session.flush()
    
    item = ItineraryItem(day_id=day.id, title="Luxury Resort", category="ACCOMMODATION", estimated_cost=7000)
    db_session.add(item)
    await db_session.commit()
    
    breakdown = await BudgetService.suggest_savings(db_session, sample_trip.id, test_user.id)
    assert len(breakdown.suggestions) > 0
    assert breakdown.suggestions[0].category == "ACCOMMODATION"
    assert "cheaper" in breakdown.suggestions[0].suggestion.lower()
