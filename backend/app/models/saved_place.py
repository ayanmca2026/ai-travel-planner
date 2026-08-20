import datetime
from datetime import timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

class SavedPlace(Base):
    __tablename__ = "saved_places"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    category = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    image_url = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())
    
    user = relationship("User", back_populates="saved_places")

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    country = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description = Column(String, nullable=True)
    cover_image = Column(String, nullable=True)
    images = Column(JSON, default=list)
    tags = Column(JSON, default=list)
    avg_daily_budget_inr = Column(Float, nullable=True)
    best_months = Column(JSON, default=list)
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())
