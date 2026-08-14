import pytest
import json
from ai.providers.llm_provider import DemoProvider
from ai.schemas.itinerary_schema import AIGeneratedTrip

@pytest.mark.asyncio
async def test_demo_provider_returns_valid_schema():
    provider = DemoProvider()
    response_json = await provider.generate_itinerary({
        "destination": "Goa",
        "start_date": "2026-10-01",
        "end_date": "2026-10-03" # 3 days
    })
    
    # Validates against the schema
    data = AIGeneratedTrip.model_validate_json(response_json)
    
    assert len(data.days) > 0
    assert data.days[0].items[0].title != ""
    assert data.days[0].items[0].estimated_cost >= 0

@pytest.mark.asyncio
async def test_ai_chat_contextual(client, auth_headers, sample_trip):
    response = await client.post(
        f"/api/trips/{sample_trip.id}/assistant",
        json={"message": "What should I pack?"},
        headers=auth_headers
    )
    assert response.status_code == 200
    assert "pack" in response.json()["data"]["content"].lower()

@pytest.mark.asyncio
async def test_ai_generate_endpoint(client, auth_headers, sample_trip):
    response = await client.post(
        f"/api/trips/{sample_trip.id}/generate",
        json={},
        headers=auth_headers
    )
    assert response.status_code == 200
    assert response.json()["success"] is True
