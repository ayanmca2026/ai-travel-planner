from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.api.deps import get_db
from app.schemas.common import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check(db: AsyncSession = Depends(get_db)):
    db_status = "offline"
    try:
        await db.execute(text("SELECT 1"))
        db_status = "online"
    except Exception:
        pass
        
    return {"status": "ok", "database": db_status}
