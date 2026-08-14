from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.schemas.auth import RegisterRequest, TokenResponse, RefreshRequest
from app.services.auth_service import AuthService
from app.schemas.common import SuccessResponse
from typing import Any

router = APIRouter()

@router.post("/register", response_model=SuccessResponse[TokenResponse])
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    tokens = await AuthService.register_user(db, request)
    return SuccessResponse(data=tokens, message="User registered successfully")

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    return await AuthService.authenticate_user(db, form_data.username, form_data.password)

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: RefreshRequest, db: AsyncSession = Depends(get_db)):
    return await AuthService.refresh_token(db, request.refresh_token)

@router.post("/logout", response_model=SuccessResponse[Any])
async def logout():
    return SuccessResponse(message="Logged out successfully")
