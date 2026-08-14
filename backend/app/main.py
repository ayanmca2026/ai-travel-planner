from fastapi import FastAPI
from app.api.deps import get_db
from app.core.config import settings
from app.middleware.cors import add_middlewares
from app.core.exceptions import add_exception_handlers
from app.api.routes import auth, users, trips, itinerary, assistant, budget, maps, sharing, health
from app.db.session import engine
from app.db.base import Base

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for TripWise AI - AI Travel Planning Platform",
    version="1.0.0"
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

@app.on_event("startup")
async def startup_event():
    # Only for SQLite development - in prod use Alembic
    if settings.DATABASE_URL.startswith("sqlite"):
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
