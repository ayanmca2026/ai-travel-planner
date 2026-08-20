import os
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI

# Add project root to sys.path to allow importing the `ai` module
# Works on both Windows (local dev) and Linux (Render)
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from app.api.deps import get_db
from app.core.config import settings
from app.middleware.cors import add_middlewares
from app.core.exceptions import add_exception_handlers
from app.api.routes import auth, users, trips, itinerary, assistant, budget, maps, sharing, health
from app.db.session import engine
from app.db.base import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Database is managed by Alembic migrations
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for TripWise AI - AI Travel Planning Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Add middlewares
add_middlewares(app)

# Add exception handlers
add_exception_handlers(app)

# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(trips.router, prefix="/api/trips", tags=["Trips"])
app.include_router(itinerary.router, prefix="/api/trips", tags=["Itinerary"])
app.include_router(assistant.router, prefix="/api/trips", tags=["AI"])
app.include_router(budget.router, prefix="/api/trips", tags=["Budget"])
app.include_router(maps.router, prefix="/api/places", tags=["Places"])
app.include_router(sharing.router, prefix="/api/share", tags=["Share"])

@app.get("/")
async def root():
    return {
        "name": "TripWise AI API",
        "description": "AI-powered student travel planning backend",
        "status": "online",
        "version": "1.0.0",
        "frontend": "https://ai-travel-planner-puce-three.vercel.app",
        "health": "/api/health",
        "docs": "/docs",
        "redoc": "/redoc",
    }
