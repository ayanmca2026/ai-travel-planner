from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from app.models.chat import ChatRole

class GenerateRequest(BaseModel):
    preferences: Optional[Dict[str, Any]] = None

class OptimizeRequest(BaseModel):
    criteria: str # e.g. "make_cheaper", "more_relaxed"
    day_number: Optional[int] = None

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    role: ChatRole
    content: str

class AIItineraryResponse(BaseModel):
    success: bool
    message: str
    
