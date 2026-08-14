from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.trip import Trip
from app.services.trip_service import TripService
from app.core.config import settings
from app.core.exceptions import NotFoundError

class ShareService:
    @staticmethod
    async def generate_link(db: AsyncSession, trip_id: int, user_id: int) -> str:
        trip = await TripService.get_trip(db, trip_id, user_id)
        if not trip.share_id:
            import uuid
            trip.share_id = str(uuid.uuid4())
            await db.commit()
        return f"{settings.CORS_ORIGINS.split(',')[0]}/shared/{trip.share_id}"
        
    @staticmethod
    async def get_by_share_id(db: AsyncSession, share_id: str) -> Trip:
        stmt = select(Trip).where(Trip.share_id == share_id)
        result = await db.execute(stmt)
        trip = result.scalar_one_or_none()
        if not trip:
            raise NotFoundError("Shared trip not found")
        return trip
