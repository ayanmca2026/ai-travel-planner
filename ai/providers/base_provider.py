from abc import ABC, abstractmethod
from typing import Any, Dict

class AIProvider(ABC):
    @abstractmethod
    async def generate_itinerary(self, context: Dict[str, Any]) -> str:
        pass
        
    @abstractmethod
    async def chat(self, messages: list) -> str:
        pass

def get_ai_provider() -> AIProvider:
    from app.core.config import settings
    if settings.AI_PROVIDER == "demo":
        from ai.providers.llm_provider import DemoProvider
        return DemoProvider()
    elif settings.AI_PROVIDER == "gemini":
        from ai.providers.llm_provider import DemoProvider # Replace with real implementation later
        return DemoProvider()
    else:
        from ai.providers.llm_provider import DemoProvider
        return DemoProvider()
