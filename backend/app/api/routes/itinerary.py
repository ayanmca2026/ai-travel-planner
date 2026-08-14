from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.itinerary import FullItineraryResponse, ItineraryItemCreate, ItineraryItemUpdate, ItineraryItemResponse
from app.services.itinerary_service import ItineraryService
from app.schemas.common import SuccessResponse
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ReorderRequest(BaseModel):
    item_ids: List[int]

@router.get("/{trip_id}/itinerary", response_model=SuccessResponse[FullItineraryResponse])
async def get_itinerary(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    itinerary = await ItineraryService.get_itinerary(db, trip_id, current_user.id)
    return SuccessResponse(data=itinerary)

@router.post("/{trip_id}/itinerary/items", response_model=SuccessResponse[ItineraryItemResponse])
async def add_item(trip_id: int, day_id: int, request: ItineraryItemCreate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    item = await ItineraryService.add_item(db, trip_id, day_id, current_user.id, request)
    return SuccessResponse(data=item, message="Item added successfully")

@router.put("/{trip_id}/itinerary/items/{item_id}", response_model=SuccessResponse[ItineraryItemResponse])
async def update_item(trip_id: int, item_id: int, update_data: ItineraryItemUpdate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    item = await ItineraryService.update_item(db, trip_id, item_id, current_user.id, update_data)
    return SuccessResponse(data=item, message="Item updated successfully")

@router.delete("/{trip_id}/itinerary/items/{item_id}", response_model=SuccessResponse[None])
async def delete_item(trip_id: int, item_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    await ItineraryService.delete_item(db, trip_id, item_id, current_user.id)
    return SuccessResponse(message="Item deleted successfully")

@router.put("/{trip_id}/itinerary/days/{day_id}/reorder", response_model=SuccessResponse[None])
async def reorder_items(trip_id: int, day_id: int, request: ReorderRequest, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    await ItineraryService.reorder_items(db, trip_id, day_id, current_user.id, request.item_ids)
    return SuccessResponse(message="Items reordered successfully")
