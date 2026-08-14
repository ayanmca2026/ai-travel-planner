from sqlalchemy.ext.asyncio import AsyncSession
from ai.providers.base_provider import get_ai_provider
from app.schemas.assistant import ChatResponse
from app.models.chat import ChatRole

class TravelAssistant:
    def __init__(self, db: AsyncSession, user_id: int, trip_id: int):
        self.db = db
        self.user_id = user_id
        self.trip_id = trip_id
        self.provider = get_ai_provider()
        
    async def chat(self, message: str) -> ChatResponse:
        reply = await self.provider.chat([{"role": "user", "content": message}])
        return ChatResponse(role=ChatRole.ASSISTANT, content=reply)
