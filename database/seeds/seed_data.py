import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import async_session_maker, engine
from app.db.base import Base
from app.models.user import User, UserProfile
from app.models.trip import Trip, TripStatus
from app.models.saved_place import Destination
from app.models.itinerary import ItineraryDay, ItineraryItem
from app.core.security import get_password_hash
from datetime import date, timedelta

DESTINATIONS = [
    {"name": "Darjeeling", "slug": "darjeeling", "city": "Darjeeling", "state": "West Bengal", "country": "India", "lat": 27.0360, "lng": 88.2627, "desc": "Hill station, tea gardens", "tags": ["hill", "tea", "nature"]},
    {"name": "Goa", "slug": "goa", "city": "Goa", "state": "Goa", "country": "India", "lat": 15.2993, "lng": 74.1240, "desc": "Beaches, nightlife", "tags": ["beach", "party", "relax"]},
    {"name": "Jaipur", "slug": "jaipur", "city": "Jaipur", "state": "Rajasthan", "country": "India", "lat": 26.9124, "lng": 75.7873, "desc": "Forts, palaces", "tags": ["history", "culture", "forts"]},
    {"name": "Manali", "slug": "manali", "city": "Manali", "state": "Himachal Pradesh", "country": "India", "lat": 32.2432, "lng": 77.1892, "desc": "Mountains, adventure", "tags": ["mountains", "adventure", "snow"]},
    {"name": "Rishikesh", "slug": "rishikesh", "city": "Rishikesh", "state": "Uttarakhand", "country": "India", "lat": 30.0869, "lng": 78.2676, "desc": "Yoga, rafting", "tags": ["yoga", "spiritual", "rafting"]},
    {"name": "Delhi", "slug": "delhi", "city": "Delhi", "state": "Delhi", "country": "India", "lat": 28.6139, "lng": 77.2090, "desc": "Historical, diverse food", "tags": ["capital", "food", "history"]},
    {"name": "Mumbai", "slug": "mumbai", "city": "Mumbai", "state": "Maharashtra", "country": "India", "lat": 19.0760, "lng": 72.8777, "desc": "Gateway of India, street food", "tags": ["city", "bollywood", "food"]},
    {"name": "Bengaluru", "slug": "bengaluru", "city": "Bengaluru", "state": "Karnataka", "country": "India", "lat": 12.9716, "lng": 77.5946, "desc": "Parks, tech hub", "tags": ["tech", "parks", "pubs"]},
    {"name": "Gangtok", "slug": "gangtok", "city": "Gangtok", "state": "Sikkim", "country": "India", "lat": 27.3389, "lng": 88.6065, "desc": "Monasteries, views", "tags": ["mountains", "monasteries", "peace"]},
    {"name": "Shillong", "slug": "shillong", "city": "Shillong", "state": "Meghalaya", "country": "India", "lat": 25.5788, "lng": 91.8933, "desc": "Scotland of East", "tags": ["hills", "waterfalls", "music"]}
]

async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        
    async with async_session_maker() as db:
        # 1. Destinations
        for d in DESTINATIONS:
            dest = Destination(
                name=d["name"], slug=d["slug"], city=d["city"], state=d["state"], country=d["country"],
                latitude=d["lat"], longitude=d["lng"], description=d["desc"], tags=d["tags"],
                avg_daily_budget_inr=2000, best_months=["Oct", "Nov", "Dec"]
            )
            db.add(dest)
        
        # 2. User
        demo_user = User(
            email="demo@tripwise.ai",
            hashed_password=get_password_hash("password123"),
            full_name="Demo User",
            is_active=True
        )
        db.add(demo_user)
        await db.commit()
        await db.refresh(demo_user)
        
        profile = UserProfile(user_id=demo_user.id)
        db.add(profile)
        
        # 3. Trip
        trip = Trip(
            user_id=demo_user.id,
            title="Goa Getaway",
            slug="goa-getaway",
            destination="Goa, India",
            destination_lat=15.2993,
            destination_lng=74.1240,
            start_date=date.today() + timedelta(days=7),
            end_date=date.today() + timedelta(days=9),
            num_travelers=2,
            total_budget=50000,
            status=TripStatus.GENERATED,
            currency="INR"
        )
        db.add(trip)
        await db.commit()
        await db.refresh(trip)

        # 4. Itinerary
        for i in range(3):
            day = ItineraryDay(
                trip_id=trip.id, day_number=i+1, date=trip.start_date + timedelta(days=i),
                title=f"Goa Adventures Day {i+1}", theme="Beaches & Fun", total_estimated_cost=2500
            )
            db.add(day)
            await db.commit()
            await db.refresh(day)
            
            items = [
                ItineraryItem(day_id=day.id, title="Baga Beach", category="ATTRACTION", start_time="10:00", end_time="12:00", estimated_cost=0, sort_order=0),
                ItineraryItem(day_id=day.id, title="Seafood Lunch", category="RESTAURANT", start_time="13:00", end_time="14:00", estimated_cost=1000, sort_order=1),
                ItineraryItem(day_id=day.id, title="Fort Aguada", category="ATTRACTION", start_time="15:00", end_time="17:00", estimated_cost=50, sort_order=2)
            ]
            db.add_all(items)

        await db.commit()
        print("Database seeded successfully with 10 destinations, user demo@tripwise.ai, and sample trip.")

if __name__ == "__main__":
    asyncio.run(seed_data())
