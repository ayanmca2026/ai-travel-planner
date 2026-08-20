import datetime
from datetime import timezone
import enum
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.session import Base

class GenerationStatus(str, enum.Enum):
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"

class AIGeneration(Base):
    __tablename__ = "ai_generations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=True)
    prompt_type = Column(String, nullable=False)
    model_used = Column(String, nullable=True)
    input_tokens = Column(Integer, nullable=True)
    output_tokens = Column(Integer, nullable=True)
    duration_ms = Column(Integer, nullable=True)
    status = Column(Enum(GenerationStatus), default=GenerationStatus.PENDING)
    error_message = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.utcnow())
