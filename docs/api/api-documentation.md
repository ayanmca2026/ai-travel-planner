# TripWise AI — API Documentation

## Base URL

```
Development: http://localhost:8000
Production: https://api.tripwise.ai
```

## Authentication

All protected endpoints require a JWT Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Error Responses

All errors follow this structure:

```json
{
  "detail": "Error message",
  "status_code": 400,
  "error_type": "VALIDATION_ERROR"
}
```

---

## Endpoints

### Authentication

#### POST `/api/auth/register`

Register a new user.

**Request:**
```json
{
  "email": "student@university.edu",
  "full_name": "Ayan Kumar",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "student@university.edu",
    "full_name": "Ayan Kumar",
    "avatar_url": null,
    "is_active": true
  }
}
```

#### POST `/api/auth/login`

**Request:**
```json
{
  "email": "student@university.edu",
  "password": "SecurePass123!"
}
```

**Response (200):** Same as register response.

#### POST `/api/auth/refresh`

**Request:**
```json
{
  "refresh_token": "eyJ..."
}
```

**Response (200):**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

---

### Trips

#### POST `/api/trips` 🔐

Create a new trip.

**Request:**
```json
{
  "title": "Darjeeling Adventure",
  "destination": "Darjeeling",
  "destination_lat": 27.0360,
  "destination_lng": 88.2627,
  "start_location": "Kolkata",
  "start_lat": 22.5726,
  "start_lng": 88.3639,
  "start_date": "2026-09-01",
  "end_date": "2026-09-03",
  "num_travelers": 3,
  "total_budget": 5000,
  "currency": "INR",
  "travel_style": "backpacker",
  "interests": ["nature", "photography", "food"],
  "transport_pref": "public",
  "accommodation_pref": "hostel",
  "food_pref": "street_food",
  "activity_intensity": "moderate"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Darjeeling Adventure",
  "status": "DRAFT",
  "share_id": "uuid",
  ...
}
```

#### GET `/api/trips` 🔐

List user's trips with pagination.

**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 10)
- `status` (string, optional): DRAFT, PLANNING, GENERATED, SAVED, ARCHIVED
- `search` (string, optional)
- `sort_by` (string, default: "created_at")

#### GET `/api/trips/{trip_id}` 🔐

Get trip with full itinerary.

#### PUT `/api/trips/{trip_id}` 🔐

Update trip details.

#### DELETE `/api/trips/{trip_id}` 🔐

Delete trip and all associated data.

---

### AI Generation

#### POST `/api/trips/{trip_id}/generate` 🔐

Generate AI itinerary for a trip.

**Response (200):**
```json
{
  "trip_id": "uuid",
  "status": "GENERATED",
  "itinerary": {
    "days": [
      {
        "day_number": 1,
        "date": "2026-09-01",
        "title": "Arrival & City Exploration",
        "theme": "Heritage & Local Culture",
        "items": [
          {
            "title": "Arrive at NJP Station",
            "description": "Take a shared jeep to Darjeeling",
            "place_name": "NJP Railway Station",
            "category": "TRANSPORT",
            "start_time": "08:00",
            "end_time": "11:30",
            "duration_minutes": 210,
            "estimated_cost": 200,
            "transport_type": "shared_jeep"
          }
        ],
        "total_estimated_cost": 1200
      }
    ]
  },
  "budget": {
    "total_budget": 5000,
    "total_estimated": 4650,
    "remaining": 350,
    "per_person": 1550,
    "health": "HEALTHY",
    "categories": {
      "transportation": 1500,
      "accommodation": 1600,
      "food": 900,
      "activities": 500,
      "miscellaneous": 150
    }
  }
}
```

#### POST `/api/trips/{trip_id}/optimize` 🔐

Optimize existing itinerary.

**Request:**
```json
{
  "optimization_type": "make_cheaper",
  "target_budget": 4000,
  "notes": "Remove expensive activities"
}
```

#### POST `/api/trips/{trip_id}/assistant` 🔐

Chat with AI about the trip.

**Request:**
```json
{
  "message": "Can we make Day 2 cheaper?",
  "context": "budget_optimization"
}
```

**Response (200):**
```json
{
  "role": "assistant",
  "content": "Yes! Here are some suggestions for Day 2...",
  "suggestions": [],
  "metadata": {}
}
```

---

### Budget

#### GET `/api/trips/{trip_id}/budget` 🔐

Get deterministic budget analysis.

#### POST `/api/trips/{trip_id}/optimize-budget` 🔐

Get AI-powered budget optimization suggestions.

---

### Places

#### GET `/api/places/destinations`

List popular destinations (public).

#### GET `/api/places/search`

Search places by query and location.

---

### Sharing

#### POST `/api/trips/{trip_id}/share` 🔐

Generate/get share link.

#### GET `/api/share/{share_id}`

Get shared trip (public, no auth required).

---

### Health

#### GET `/api/health`

```json
{
  "status": "healthy",
  "database": "connected",
  "ai_provider": "demo",
  "timestamp": "2026-08-13T21:30:00Z"
}
```

---

🔐 = Requires authentication
