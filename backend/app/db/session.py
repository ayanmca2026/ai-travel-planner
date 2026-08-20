from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

engine_kwargs = {
    "echo": settings.ENVIRONMENT == "development",
    "future": True,
}

# Disable prepared statements caching when using PostgreSQL (especially Supabase/PgBouncer)
if "postgresql" in settings.get_database_url or "postgres" in settings.get_database_url:
    engine_kwargs["connect_args"] = {"prepared_statement_cache_size": 0}

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
