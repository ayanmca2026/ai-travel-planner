from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.common import SuccessResponse, PaginatedResponse
from app.services.maps_service import PlaceService
from pydantic import BaseModel, ConfigDict

router = APIRouter()

class SavedPlaceCreate(BaseModel):
    name: str
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    category: Optional[str] = None
    rating: Optional[float] = None
    image_url: Optional[str] = None
    notes: Optional[str] = None

class DestinationResponse(BaseModel):
    id: int
    name: str
    slug: str
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    description: Optional[str]
    cover_image: Optional[str]
    tags: List[str]
    avg_daily_budget_inr: Optional[float]
    best_months: List[str]
    
    model_config = ConfigDict(from_attributes=True)

class SavedPlaceResponse(BaseModel):
    id: int
    name: str
    address: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    category: Optional[str]
    rating: Optional[float]
    image_url: Optional[str]
    notes: Optional[str]
    
    model_config = ConfigDict(from_attributes=True)

@router.get("/destinations", response_model=SuccessResponse[PaginatedResponse[DestinationResponse]])
async def list_destinations(page: int = 1, limit: int = 20, db: AsyncSession = Depends(get_db)):
    skip = (page - 1) * limit
    dests, total = await PlaceService.get_destinations(db, skip, limit)
    pages = (total + limit - 1) // limit
    return SuccessResponse(data=PaginatedResponse(items=dests, total=total, page=page, size=limit, pages=pages))

@router.get("/destinations/{slug}", response_model=SuccessResponse[DestinationResponse])
async def get_destination(slug: str, db: AsyncSession = Depends(get_db)):
    dest = await PlaceService.get_destination_by_slug(db, slug)
    return SuccessResponse(data=dest)

@router.get("/search", response_model=SuccessResponse[List[DestinationResponse]])
async def search_destinations(q: str = Query(..., min_length=2), db: AsyncSession = Depends(get_db)):
    dests = await PlaceService.search_destinations(db, q)
    return SuccessResponse(data=dests)

@router.get("/saved", response_model=SuccessResponse[List[SavedPlaceResponse]])
async def get_saved_places(current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    places = await PlaceService.get_saved_places(db, current_user.id)
    return SuccessResponse(data=places)

@router.post("/saved", response_model=SuccessResponse[SavedPlaceResponse])
async def save_place(request: SavedPlaceCreate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    place = await PlaceService.save_place(db, current_user.id, request)
    return SuccessResponse(data=place, message="Place saved successfully")

@router.delete("/saved/{id}", response_model=SuccessResponse[None])
async def unsave_place(id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    await PlaceService.delete_saved_place(db, current_user.id, id)
    return SuccessResponse(message="Place removed")
