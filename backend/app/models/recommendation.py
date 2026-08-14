import datetime
import enum
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from app.db.session import Base

class RecommendationType(str, enum.Enum):
    CHEAPER_TRANSPORT = "CHEAPER_TRANSPORT"
    CHEAPER_FOOD = "CHEAPER_FOOD"
    FREE_ATTRACTION = "FREE_ATTRACTION"
    BUDGET_STAY = "BUDGET_STAY"
    ALTERNATIVE_ACTIVITY = "ALTERNATIVE_ACTIVITY"

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    type = Column(Enum(RecommendationType), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    original_cost = Column(Float, nullable=True)
    suggested_cost = Column(Float, nullable=True)
    savings = Column(Float, nullable=True)
    metadata_ = Column("metadata", JSON, default=dict)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    trip = relationship("Trip", back_populates="recommendations")
