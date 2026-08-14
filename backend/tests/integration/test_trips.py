import pytest
from datetime import date, timedelta

@pytest.mark.asyncio
async def test_create_trip(client, auth_headers):
    response = await client.post(
        "/api/trips", 
        json={
            "title": "Summer Vacation",
            "destination": "Goa",
            "start_date": (date.today() + timedelta(days=5)).isoformat(),
            "end_date": (date.today() + timedelta(days=10)).isoformat(),
            "num_travelers": 2,
            "total_budget": 30000
        },
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["title"] == "Summer Vacation"
    assert data["destination"] == "Goa"

@pytest.mark.asyncio
async def test_create_trip_unauthorized(client):
    response = await client.post(
        "/api/trips", 
        json={
            "title": "Unauthorized Trip",
            "destination": "Goa",
            "start_date": "2026-10-10",
            "end_date": "2026-10-15",
        }
    )
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_list_trips(client, auth_headers, sample_trip):
    response = await client.get("/api/trips", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data["items"]) == 1
    assert data["items"][0]["title"] == "Test Trip"

@pytest.mark.asyncio
async def test_get_trip_details(client, auth_headers, sample_trip):
    response = await client.get(f"/api/trips/{sample_trip.id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["data"]["destination"] == "Test City"

@pytest.mark.asyncio
async def test_update_trip(client, auth_headers, sample_trip):
    response = await client.put(
        f"/api/trips/{sample_trip.id}", 
        json={"title": "Updated Title"},
        headers=auth_headers
    )
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Updated Title"

@pytest.mark.asyncio
async def test_delete_trip(client, auth_headers, sample_trip):
    response = await client.delete(f"/api/trips/{sample_trip.id}", headers=auth_headers)
    assert response.status_code == 200
    
    # Verify deletion
    verify_res = await client.get(f"/api/trips/{sample_trip.id}", headers=auth_headers)
    assert verify_res.status_code == 404
