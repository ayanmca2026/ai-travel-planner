from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, ConfigDict

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    home_city: Optional[str] = None
    preferred_currency: Optional[str] = None
    budget_preference: Optional[str] = None
    travel_styles: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    dietary_restrictions: Optional[List[str]] = None
    student_id: Optional[str] = None
    theme: Optional[str] = None
    notifications_enabled: Optional[bool] = None

class UserProfileResponse(BaseModel):
    home_city: Optional[str]
    preferred_currency: str
    budget_preference: Optional[str]
    travel_styles: List[str]
    interests: List[str]
    dietary_restrictions: List[str]
    student_id: Optional[str] = None
    theme: str
    notifications_enabled: bool

    model_config = ConfigDict(from_attributes=True)

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    avatar_url: Optional[str]
    created_at: datetime
    profile: Optional[UserProfileResponse] = None

    model_config = ConfigDict(from_attributes=True)
