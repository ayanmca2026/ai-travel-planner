import datetime
import uuid
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Enum, Date
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum

class TripStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PLANNING = "PLANNING"
    GENERATED = "GENERATED"
    SAVED = "SAVED"
    ARCHIVED = "ARCHIVED"

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    slug = Column(String, nullable=True)
    description = Column(String, nullable=True)
    
    destination = Column(String, nullable=False)
    destination_lat = Column(Float, nullable=True)
    destination_lng = Column(Float, nullable=True)
    
    start_location = Column(String, nullable=True)
    start_lat = Column(Float, nullable=True)
    start_lng = Column(Float, nullable=True)
    
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    num_travelers = Column(Integer, default=1)
    
    total_budget = Column(Float, nullable=True)
    currency = Column(String, default="INR")
    
    travel_style = Column(String, nullable=True)
    interests = Column(JSON, default=list)
    transport_pref = Column(String, nullable=True)
    accommodation_pref = Column(String, nullable=True)
    food_pref = Column(String, nullable=True)
    activity_intensity = Column(String, nullable=True)
    
    status = Column(Enum(TripStatus), default=TripStatus.DRAFT)
    share_id = Column(String, unique=True, default=lambda: str(uuid.uuid4()))
    cover_image = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="trips")
    itinerary_days = relationship("ItineraryDay", back_populates="trip", cascade="all, delete-orphan")
    expenses = relationship("Expense", back_populates="trip", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="trip", cascade="all, delete-orphan")
    chat_messages = relationship("ChatMessage", back_populates="trip", cascade="all, delete-orphan")
