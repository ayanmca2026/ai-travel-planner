import pytest

@pytest.mark.asyncio
async def test_register_success(client):
    response = await client.post("/api/auth/register", json={
        "email": "newuser@test.com",
        "password": "strongpassword123",
        "full_name": "New User"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]

@pytest.mark.asyncio
async def test_register_duplicate_email(client, test_user):
    response = await client.post("/api/auth/register", json={
        "email": "test@tripwise.ai",
        "password": "password123",
        "full_name": "Duplicate User"
    })
    assert response.status_code == 400
    assert response.json()["success"] is False

@pytest.mark.asyncio
async def test_register_invalid_email(client):
    response = await client.post("/api/auth/register", json={
        "email": "invalid-email",
        "password": "password123",
        "full_name": "Invalid User"
    })
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_login_success(client, test_user):
    response = await client.post("/api/auth/login", data={
        "username": "test@tripwise.ai",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_login_wrong_password(client, test_user):
    response = await client.post("/api/auth/login", data={
        "username": "test@tripwise.ai",
        "password": "wrongpassword"
    })
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_login_nonexistent_user(client):
    response = await client.post("/api/auth/login", data={
        "username": "doesnotexist@test.com",
        "password": "password123"
    })
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_refresh_success(client, test_user):
    login_res = await client.post("/api/auth/login", data={
        "username": "test@tripwise.ai",
        "password": "password123"
    })
    refresh_token = login_res.json()["refresh_token"]
    
    response = await client.post("/api/auth/refresh", json={
        "refresh_token": refresh_token
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_refresh_invalid_token(client):
    response = await client.post("/api/auth/refresh", json={
        "refresh_token": "invalid.jwt.token"
    })
    assert response.status_code == 401
