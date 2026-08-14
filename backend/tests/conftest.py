import pytest
import pytest_asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.main import app
from app.db.session import get_db
from app.db.base import Base
from app.models.user import User, UserProfile
from app.models.trip import Trip, TripStatus
from app.core.security import get_password_hash, create_access_token
from datetime import date, timedelta

# Use an in-memory SQLite database for tests
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

engine = create_async_engine(TEST_DATABASE_URL, echo=False, future=True)
TestingSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False, autoflush=False)

@pytest_asyncio.fixture(scope="function")
async def db_session():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    async with TestingSessionLocal() as session:
        yield session

@pytest_asyncio.fixture(scope="function")
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    
    from httpx import ASGITransport
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as test_client:
        yield test_client
        
    app.dependency_overrides.clear()

@pytest_asyncio.fixture(scope="function")
async def test_user(db_session):
    user = User(
        email="test@tripwise.ai",
        hashed_password=get_password_hash("password123"),
        full_name="Test User",
        is_active=True
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    
    profile = UserProfile(user_id=user.id)
    db_session.add(profile)
    await db_session.commit()
    
    return user

@pytest_asyncio.fixture(scope="function")
async def auth_headers(test_user):
    token = create_access_token(subject=test_user.id)
    return {"Authorization": f"Bearer {token}"}

@pytest_asyncio.fixture(scope="function")
async def sample_trip(db_session, test_user):
    trip = Trip(
        user_id=test_user.id,
        title="Test Trip",
        slug="test-trip",
        destination="Test City",
        start_date=date.today() + timedelta(days=10),
        end_date=date.today() + timedelta(days=15),
        num_travelers=2,
        total_budget=10000,
        status=TripStatus.PLANNING,
        currency="INR"
    )
    db_session.add(trip)
    await db_session.commit()
    await db_session.refresh(trip)
    return trip
