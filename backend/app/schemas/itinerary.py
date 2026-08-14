from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel
from app.models.itinerary import PlaceCategory

class ItineraryItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    place_name: Optional[str] = None
    place_address: Optional[str] = None
    category: PlaceCategory
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    duration_minutes: Optional[int] = None
    estimated_cost: float = 0.0
    currency: str = "INR"

class ItineraryItemCreate(ItineraryItemBase):
    pass

class ItineraryItemUpdate(ItineraryItemBase):
    pass

class ItineraryItemResponse(ItineraryItemBase):
    id: int
    day_id: int
    sort_order: int
    
    class Config:
        from_attributes = True

class ItineraryDayResponse(BaseModel):
    id: int
    day_number: int
    date: date
    title: Optional[str]
    theme: Optional[str]
    notes: Optional[str]
    total_estimated_cost: float
    items: List[ItineraryItemResponse] = []
    
    class Config:
        from_attributes = True

class FullItineraryResponse(BaseModel):
    trip_id: int
    days: List[ItineraryDayResponse]
