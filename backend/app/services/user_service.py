from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User, UserProfile
from app.schemas.user import UserProfileUpdate

class UserService:
    @staticmethod
    async def get_profile(db: AsyncSession, user_id: int) -> UserProfile:
        stmt = select(UserProfile).where(UserProfile.user_id == user_id)
        result = await db.execute(stmt)
        profile = result.scalar_one_or_none()
        if not profile:
            profile = UserProfile(user_id=user_id)
            db.add(profile)
            await db.commit()
            await db.refresh(profile)
        return profile

    @staticmethod
    async def update_profile(db: AsyncSession, user_id: int, update_data: UserProfileUpdate) -> UserProfile:
        profile = await UserService.get_profile(db, user_id)
        
        update_dict = update_data.model_dump(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(profile, key, value)
            
        await db.commit()
        await db.refresh(profile)
        return profile
        
    @staticmethod
    async def update_user(db: AsyncSession, user: User, update_data: UserProfileUpdate) -> User:
        await UserService.update_profile(db, user.id, update_data)
        stmt = select(User).where(User.id == user.id)
        result = await db.execute(stmt)
        return result.scalar_one()
