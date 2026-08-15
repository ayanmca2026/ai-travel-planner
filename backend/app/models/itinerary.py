import datetime
from datetime import timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum

class PlaceCategory(str, enum.Enum):
    ATTRACTION = "ATTRACTION"
    RESTAURANT = "RESTAURANT"
    ACTIVITY = "ACTIVITY"
    TRANSPORT = "TRANSPORT"
    ACCOMMODATION = "ACCOMMODATION"
    SHOPPING = "SHOPPING"
    OTHER = "OTHER"

class ItineraryDay(Base):
    __tablename__ = "itinerary_days"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    day_number = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    title = Column(String, nullable=True)
    theme = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    total_estimated_cost = Column(Float, default=0.0)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(timezone.utc))
    
    trip = relationship("Trip", back_populates="itinerary_days")
    items = relationship("ItineraryItem", back_populates="day", cascade="all, delete-orphan")

class ItineraryItem(Base):
    __tablename__ = "itinerary_items"

    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("itinerary_days.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    
    place_name = Column(String, nullable=True)
    place_address = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    category = Column(Enum(PlaceCategory), default=PlaceCategory.ATTRACTION)
    
    start_time = Column(String, nullable=True) # HH:MM format
    end_time = Column(String, nullable=True)
    duration_minutes = Column(Integer, nullable=True)
    
    estimated_cost = Column(Float, default=0.0)
    currency = Column(String, default="INR")
    
    transport_type = Column(String, nullable=True)
    transport_duration = Column(Integer, nullable=True)
    distance_km = Column(Float, nullable=True)
    
    rating = Column(Float, nullable=True)
    image_url = Column(String, nullable=True)
    tips = Column(String, nullable=True)
    sort_order = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(timezone.utc))
    
    day = relationship("ItineraryDay", back_populates="items")
