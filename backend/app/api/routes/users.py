from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.user import UserResponse, UserProfileUpdate, UserProfileResponse
from app.services.user_service import UserService
from app.schemas.common import SuccessResponse

router = APIRouter()

@router.get("/me", response_model=SuccessResponse[UserResponse])
async def get_me(current_user: User = Depends(get_current_active_user)):
    return SuccessResponse(data=current_user)

@router.put("/me", response_model=SuccessResponse[UserResponse])
async def update_me(update_data: UserProfileUpdate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    user = await UserService.update_user(db, current_user, update_data)
    return SuccessResponse(data=user, message="Profile updated")

@router.get("/me/profile", response_model=SuccessResponse[UserProfileResponse])
async def get_profile(current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    profile = await UserService.get_profile(db, current_user.id)
    return SuccessResponse(data=profile)

@router.put("/me/profile", response_model=SuccessResponse[UserProfileResponse])
async def update_profile(update_data: UserProfileUpdate, current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    profile = await UserService.update_profile(db, current_user.id, update_data)
    return SuccessResponse(data=profile, message="Preferences updated")

@router.delete("/me", response_model=SuccessResponse)
async def delete_me(current_user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    await UserService.delete_user(db, current_user)
    return SuccessResponse(message="Account deleted successfully")

