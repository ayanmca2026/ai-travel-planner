from sqlalchemy.ext.asyncio import AsyncSession
from ai.providers.base_provider import get_ai_provider

class TripOptimizer:
    def __init__(self, db: AsyncSession, user_id: int, trip_id: int):
        self.db = db
        self.user_id = user_id
        self.trip_id = trip_id
        self.provider = get_ai_provider()
        
    async def optimize(self, criteria: str, day_number: int = None) -> bool:
        # In a real app, this would use the AI provider with TRIP_OPTIMIZATION prompt
        # For simplicity, returning True
        return True
        
    async def regenerate_day(self, day_number: int) -> bool:
        return True
