from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from typing import List, Tuple, Optional
from app.models.trip import Trip, TripStatus
from app.schemas.trip import TripCreate, TripUpdate
from app.core.exceptions import NotFoundError, AuthorizationError

class TripService:
    @staticmethod
    async def create_trip(db: AsyncSession, user_id: int, data: TripCreate) -> Trip:
        trip = Trip(
            user_id=user_id,
            title=data.title,
            destination=data.destination,
            start_date=data.start_date,
            end_date=data.end_date,
            num_travelers=data.num_travelers,
            total_budget=data.total_budget,
            status=TripStatus.PLANNING,
            slug=data.title.lower().replace(" ", "-") + "-" + str(data.start_date)
        )
        if data.preferences:
            trip.travel_style = data.preferences.travel_style
            trip.interests = data.preferences.interests
            trip.transport_pref = data.preferences.transport_pref
            trip.accommodation_pref = data.preferences.accommodation_pref
            trip.food_pref = data.preferences.food_pref
            trip.activity_intensity = data.preferences.activity_intensity

        db.add(trip)
        await db.commit()
        await db.refresh(trip)
        return trip

    @staticmethod
    async def get_user_trips(db: AsyncSession, user_id: int, skip: int = 0, limit: int = 20, status: Optional[str] = None, search: Optional[str] = None) -> Tuple[List[Trip], int]:
        stmt = select(Trip).where(Trip.user_id == user_id)
        
        if status:
            stmt = stmt.where(Trip.status == status)
        if search:
            stmt = stmt.where(Trip.title.ilike(f"%{search}%") | Trip.destination.ilike(f"%{search}%"))
            
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total = await db.scalar(count_stmt)
        
        stmt = stmt.offset(skip).limit(limit).order_by(Trip.created_at.desc())
        result = await db.execute(stmt)
        return list(result.scalars().all()), total

    @staticmethod
    async def get_trip(db: AsyncSession, trip_id: int, user_id: int) -> Trip:
        stmt = select(Trip).where(Trip.id == trip_id)
        result = await db.execute(stmt)
        trip = result.scalar_one_or_none()
        
        if not trip:
            raise NotFoundError("Trip not found")
        if trip.user_id != user_id:
            raise AuthorizationError("Not authorized to access this trip")
            
        return trip

    @staticmethod
    async def update_trip(db: AsyncSession, trip_id: int, user_id: int, data: TripUpdate) -> Trip:
        trip = await TripService.get_trip(db, trip_id, user_id)
        
        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(trip, key, value)
            
        await db.commit()
        await db.refresh(trip)
        return trip

    @staticmethod
    async def delete_trip(db: AsyncSession, trip_id: int, user_id: int) -> None:
        trip = await TripService.get_trip(db, trip_id, user_id)
        await db.delete(trip)
        await db.commit()
