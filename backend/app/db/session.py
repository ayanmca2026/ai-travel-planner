from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool
from app.core.config import settings

is_postgres = "postgresql" in settings.get_database_url or "postgres" in settings.get_database_url

engine_kwargs = {
    "echo": settings.ENVIRONMENT == "development",
    "future": True,
}

# In production with Supabase/PgBouncer, use NullPool + disable statement caching
# NullPool = fresh DB connection per request, no pool = no PgBouncer conflicts
if is_postgres:
    engine_kwargs["poolclass"] = NullPool
    engine_kwargs["connect_args"] = {"statement_cache_size": 0}

engine = create_async_engine(
    settings.get_database_url,
    **engine_kwargs
)

async_session_maker = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, autoflush=False
)

Base = declarative_base()

async def get_db():
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()
