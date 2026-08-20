from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from jose import jwt, JWTError
from app.models.user import User, UserProfile
from app.schemas.auth import RegisterRequest, TokenResponse
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.core.exceptions import AuthenticationError, AppException, DuplicateError
from app.core.config import settings

class AuthService:
    @staticmethod
    async def register_user(db: AsyncSession, request: RegisterRequest) -> TokenResponse:
        stmt = select(User).where(User.email == request.email)
        result = await db.execute(stmt)
        if result.scalar_one_or_none():
            raise DuplicateError("Email already registered")
            
        hashed_password = get_password_hash(request.password)
        user = User(email=request.email, hashed_password=hashed_password, full_name=request.full_name)
        
        try:
            db.add(user)
            await db.flush()
            
            profile = UserProfile(user_id=user.id)
            db.add(profile)
            
            await db.commit()
            await db.refresh(user)
        except Exception as e:
            await db.rollback()
            import traceback
            print(f"[REGISTRATION ERROR] {type(e).__name__}: {e}")
            traceback.print_exc()
            raise AppException(f"Database error: {type(e).__name__}: {str(e)}", status_code=500)
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        
        return TokenResponse(access_token=access_token, refresh_token=refresh_token)

    @staticmethod
    async def authenticate_user(db: AsyncSession, email: str, password: str) -> TokenResponse:
        stmt = select(User).where(User.email == email)
        result = await db.execute(stmt)
        user = result.scalar_one_or_none()
        
        if not user or not verify_password(password, user.hashed_password):
            raise AuthenticationError("Invalid email or password")
            
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        
        return TokenResponse(access_token=access_token, refresh_token=refresh_token)

    @staticmethod
    async def refresh_token(db: AsyncSession, refresh_token: str) -> TokenResponse:
        try:
            payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if not user_id or payload.get("type") != "refresh":
                raise AuthenticationError("Invalid token")
                
            access_token = create_access_token(user_id)
            new_refresh_token = create_refresh_token(user_id)
            return TokenResponse(access_token=access_token, refresh_token=new_refresh_token)
            
        except JWTError:
            raise AuthenticationError("Invalid token")
