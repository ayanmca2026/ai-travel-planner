from typing import Generic, TypeVar, List, Optional, Any
from pydantic import BaseModel

T = TypeVar('T')

class HealthResponse(BaseModel):
    status: str
    database: str

class SuccessResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[Any] = None

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    pages: int
