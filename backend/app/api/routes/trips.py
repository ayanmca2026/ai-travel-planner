from fastapi import APIRouter, Depends, Query, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.trip import TripCreate, TripUpdate, TripResponse, TripListResponse
from app.services.trip_service import TripService
from app.services.pdf_service import PDFService
from app.schemas.common import SuccessResponse, PaginatedResponse

router = APIRouter()

@router.post("", response_model=SuccessResponse[TripResponse])
async def create_trip(request: TripCreate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    trip = await TripService.create_trip(db, current_user.id, request)
    return SuccessResponse(data=trip, message="Trip created successfully")

@router.get("", response_model=SuccessResponse[PaginatedResponse[TripListResponse]])
async def list_trips(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[str] = None,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_active_user), 
    db: AsyncSession = Depends(get_db)
):
    skip = (page - 1) * limit
    trips, total = await TripService.get_user_trips(db, current_user.id, skip, limit, status, search)
    pages = (total + limit - 1) // limit
    
    return SuccessResponse(
        data=PaginatedResponse(
            items=trips,
            total=total,
            page=page,
            size=limit,
            pages=pages
        )
    )

@router.get("/{trip_id}", response_model=SuccessResponse[TripResponse])
async def get_trip(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    trip = await TripService.get_trip(db, trip_id, current_user.id)
    return SuccessResponse(data=trip)

@router.put("/{trip_id}", response_model=SuccessResponse[TripResponse])
async def update_trip(trip_id: int, update_data: TripUpdate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    trip = await TripService.update_trip(db, trip_id, current_user.id, update_data)
    return SuccessResponse(data=trip, message="Trip updated successfully")

@router.delete("/{trip_id}", response_model=SuccessResponse[None])
async def delete_trip(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    await TripService.delete_trip(db, trip_id, current_user.id)
    return SuccessResponse(message="Trip deleted successfully")

@router.get("/{trip_id}/export-pdf")
async def export_trip_pdf(trip_id: int, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    trip = await TripService.get_trip(db, trip_id, current_user.id)
    from app.services.itinerary_service import ItineraryService
    itinerary = await ItineraryService.get_itinerary(db, trip_id, current_user.id)
    
    trip_data = {
        "title": trip.title,
        "destination": trip.destination,
        "start_date": trip.start_date.isoformat(),
        "end_date": trip.end_date.isoformat(),
        "num_travelers": trip.num_travelers,
        "total_budget": trip.total_budget,
        "currency": trip.currency,
        "itinerary": itinerary.model_dump()
    }
    
    pdf_bytes = PDFService.generate_trip_pdf(trip_data)
    return Response(
        content=pdf_bytes, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename=trip_{trip.id}.pdf"}
    )
