from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.models.itinerary import ItineraryDay, ItineraryItem
from app.models.trip import Trip
from app.schemas.itinerary import ItineraryItemCreate, ItineraryItemUpdate, FullItineraryResponse
from app.core.exceptions import NotFoundError, AuthorizationError
from app.services.trip_service import TripService

class ItineraryService:
    @staticmethod
    async def get_itinerary(db: AsyncSession, trip_id: int, user_id: int) -> FullItineraryResponse:
        # Verify ownership
        await TripService.get_trip(db, trip_id, user_id)
        
        stmt = select(ItineraryDay).where(ItineraryDay.trip_id == trip_id).options(selectinload(ItineraryDay.items)).order_by(ItineraryDay.day_number)
        result = await db.execute(stmt)
        days = list(result.scalars().all())
        
        for day in days:
            day.items.sort(key=lambda x: x.sort_order)
            
        return FullItineraryResponse(trip_id=trip_id, days=days)

    @staticmethod
    async def add_item(db: AsyncSession, trip_id: int, day_id: int, user_id: int, data: ItineraryItemCreate) -> ItineraryItem:
        await TripService.get_trip(db, trip_id, user_id)
        
        # Verify day belongs to trip
        stmt = select(ItineraryDay).where(ItineraryDay.id == day_id, ItineraryDay.trip_id == trip_id)
        result = await db.execute(stmt)
        if not result.scalar_one_or_none():
            raise NotFoundError("Day not found")
            
        item = ItineraryItem(**data.model_dump(), day_id=day_id)
        db.add(item)
        await db.commit()
        await db.refresh(item)
        return item

    @staticmethod
    async def update_item(db: AsyncSession, trip_id: int, item_id: int, user_id: int, data: ItineraryItemUpdate) -> ItineraryItem:
        await TripService.get_trip(db, trip_id, user_id)
        
        stmt = select(ItineraryItem).join(ItineraryDay).where(ItineraryItem.id == item_id, ItineraryDay.trip_id == trip_id)
        result = await db.execute(stmt)
        item = result.scalar_one_or_none()
        
        if not item:
            raise NotFoundError("Item not found")
            
        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(item, key, value)
            
        await db.commit()
        await db.refresh(item)
        return item

    @staticmethod
    async def delete_item(db: AsyncSession, trip_id: int, item_id: int, user_id: int) -> None:
        await TripService.get_trip(db, trip_id, user_id)
        
        stmt = select(ItineraryItem).join(ItineraryDay).where(ItineraryItem.id == item_id, ItineraryDay.trip_id == trip_id)
        result = await db.execute(stmt)
        item = result.scalar_one_or_none()
        
        if not item:
            raise NotFoundError("Item not found")
            
        await db.delete(item)
        await db.commit()

    @staticmethod
    async def reorder_items(db: AsyncSession, trip_id: int, day_id: int, user_id: int, item_ids: List[int]) -> None:
        await TripService.get_trip(db, trip_id, user_id)
        
        stmt = select(ItineraryItem).where(ItineraryItem.day_id == day_id)
        result = await db.execute(stmt)
        items = result.scalars().all()
        
        item_map = {item.id: item for item in items}
        
        for idx, item_id in enumerate(item_ids):
            if item_id in item_map:
                item_map[item_id].sort_order = idx
                
        await db.commit()
