from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code

class AuthenticationError(AppException):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, status_code=status.HTTP_401_UNAUTHORIZED)

class AuthorizationError(AppException):
    def __init__(self, message: str = "Not authorized"):
        super().__init__(message, status_code=status.HTTP_403_FORBIDDEN)

class NotFoundError(AppException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, status_code=status.HTTP_404_NOT_FOUND)

class ValidationError(AppException):
    def __init__(self, message: str = "Validation error"):
        super().__init__(message, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

class AIServiceError(AppException):
    def __init__(self, message: str = "AI Service error"):
        super().__init__(message, status_code=status.HTTP_502_BAD_GATEWAY)

class RateLimitError(AppException):
    def __init__(self, message: str = "Rate limit exceeded"):
        super().__init__(message, status_code=status.HTTP_429_TOO_MANY_REQUESTS)


def add_exception_handlers(app):
    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"success": False, "error": exc.message}
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"success": False, "error": "Validation Error", "details": exc.errors()}
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "error": "Database error occurred"}
        )
