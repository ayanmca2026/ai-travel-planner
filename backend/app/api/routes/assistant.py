from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.assistant import GenerateRequest, OptimizeRequest, ChatRequest, ChatResponse, AIItineraryResponse
from app.schemas.common import SuccessResponse
from ai.services.itinerary_generator import TripPlanner
from ai.services.trip_optimizer import TripOptimizer
from ai.services.travel_assistant import TravelAssistant

router = APIRouter()

@router.post("/{trip_id}/generate", response_model=SuccessResponse[AIItineraryResponse])
async def generate_itinerary(trip_id: int, request: GenerateRequest, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    planner = TripPlanner(db, current_user.id, trip_id)
    result = await planner.generate()
    return SuccessResponse(data=AIItineraryResponse(success=True, message="Itinerary generated"), message="AI Generation complete")

@router.post("/{trip_id}/optimize", response_model=SuccessResponse[AIItineraryResponse])
async def optimize_itinerary(trip_id: int, request: OptimizeRequest, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    optimizer = TripOptimizer(db, current_user.id, trip_id)
    result = await optimizer.optimize(request.criteria, request.day_number)
    return SuccessResponse(data=AIItineraryResponse(success=True, message="Itinerary optimized"))

@router.post("/{trip_id}/regenerate-day/{day_number}", response_model=SuccessResponse[AIItineraryResponse])
async def regenerate_day(trip_id: int, day_number: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    optimizer = TripOptimizer(db, current_user.id, trip_id)
    result = await optimizer.regenerate_day(day_number)
    return SuccessResponse(data=AIItineraryResponse(success=True, message="Day regenerated"))

@router.post("/{trip_id}/assistant", response_model=SuccessResponse[ChatResponse])
async def chat_assistant(trip_id: int, request: ChatRequest, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    assistant = TravelAssistant(db, current_user.id, trip_id)
    response = await assistant.chat(request.message)
    return SuccessResponse(data=response)
