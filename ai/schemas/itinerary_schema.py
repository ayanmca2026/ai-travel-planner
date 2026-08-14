from pydantic import BaseModel
from typing import List, Optional
from app.models.itinerary import PlaceCategory

class AIGeneratedActivity(BaseModel):
    title: str
    description: str
    place_name: Optional[str] = None
    category: PlaceCategory
    start_time: str
    end_time: str
    duration_minutes: int
    estimated_cost: float
    tips: Optional[str] = None

class AIGeneratedDay(BaseModel):
    day_number: int
    title: str
    theme: str
    notes: Optional[str] = None
    total_estimated_cost: float
    items: List[AIGeneratedActivity]

class AIGeneratedTrip(BaseModel):
    days: List[AIGeneratedDay]
