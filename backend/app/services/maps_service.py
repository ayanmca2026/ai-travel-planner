from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.models.saved_place import Destination, SavedPlace
from app.core.exceptions import NotFoundError
from typing import List, Tuple, Any

class PlaceService:
    @staticmethod
    async def get_destinations(db: AsyncSession, skip: int, limit: int) -> Tuple[List[Destination], int]:
        stmt = select(Destination)
        count_stmt = select(func.count()).select_from(Destination)
        total = await db.scalar(count_stmt)
        
        result = await db.execute(stmt.offset(skip).limit(limit))
        return list(result.scalars().all()), total
        
    @staticmethod
    async def get_destination_by_slug(db: AsyncSession, slug: str) -> Destination:
        stmt = select(Destination).where(Destination.slug == slug)
        result = await db.execute(stmt)
        dest = result.scalar_one_or_none()
        if not dest:
            raise NotFoundError("Destination not found")
        return dest
        
    @staticmethod
    async def search_destinations(db: AsyncSession, query: str) -> List[Destination]:
        stmt = select(Destination).where(
            Destination.name.ilike(f"%{query}%") | 
            Destination.city.ilike(f"%{query}%")
        ).limit(10)
        result = await db.execute(stmt)
        return list(result.scalars().all())

    @staticmethod
    async def get_saved_places(db: AsyncSession, user_id: int) -> List[SavedPlace]:
        stmt = select(SavedPlace).where(SavedPlace.user_id == user_id).order_by(SavedPlace.created_at.desc())
        result = await db.execute(stmt)
        return list(result.scalars().all())

    @staticmethod
    async def save_place(db: AsyncSession, user_id: int, data: Any) -> SavedPlace:
        place = SavedPlace(**data.model_dump(), user_id=user_id)
        db.add(place)
        await db.commit()
        await db.refresh(place)
        return place
        
    @staticmethod
    async def delete_saved_place(db: AsyncSession, user_id: int, place_id: int):
        stmt = select(SavedPlace).where(SavedPlace.id == place_id, SavedPlace.user_id == user_id)
        result = await db.execute(stmt)
        place = result.scalar_one_or_none()
        if not place:
            raise NotFoundError("Saved place not found")
        await db.delete(place)
        await db.commit()
