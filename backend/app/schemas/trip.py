from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel

class TripPreferences(BaseModel):
    travel_style: Optional[str] = None
    interests: List[str] = []
    transport_pref: Optional[str] = None
    accommodation_pref: Optional[str] = None
    food_pref: Optional[str] = None
    activity_intensity: Optional[str] = None

class TripCreate(BaseModel):
    title: str
    destination: str
    start_date: date
    end_date: date
    num_travelers: int = 1
    total_budget: Optional[float] = None
    preferences: Optional[TripPreferences] = None

class TripUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None

class TripResponse(BaseModel):
    id: int
    title: str
    slug: Optional[str]
    description: Optional[str]
    destination: str
    start_date: date
    end_date: date
    num_travelers: int
    total_budget: Optional[float]
    currency: str
    status: str
    share_id: str
    cover_image: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class TripListResponse(TripResponse):
    pass
