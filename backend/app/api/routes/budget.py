from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.budget import BudgetBreakdown
from app.services.budget_service import BudgetService
from app.schemas.common import SuccessResponse

router = APIRouter()

@router.get("/{trip_id}/budget", response_model=SuccessResponse[BudgetBreakdown])
async def get_budget(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    budget = await BudgetService.get_budget_analysis(db, trip_id, current_user.id)
    return SuccessResponse(data=budget)

@router.post("/{trip_id}/optimize-budget", response_model=SuccessResponse[BudgetBreakdown])
async def optimize_budget(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    budget = await BudgetService.suggest_savings(db, trip_id, current_user.id)
    return SuccessResponse(data=budget)
