from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.trip import TripResponse
from app.services.sharing_service import ShareService
from app.schemas.common import SuccessResponse
from pydantic import BaseModel

router = APIRouter()

class ShareResponse(BaseModel):
    share_url: str

@router.post("/trips/{trip_id}/share", response_model=SuccessResponse[ShareResponse])
async def generate_share_link(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    url = await ShareService.generate_link(db, trip_id, current_user.id)
    return SuccessResponse(data={"share_url": url})

@router.get("/{share_id}", response_model=SuccessResponse[TripResponse])
async def get_shared_trip(share_id: str, db: AsyncSession = Depends(get_db)):
    trip = await ShareService.get_by_share_id(db, share_id)
    return SuccessResponse(data=trip)
