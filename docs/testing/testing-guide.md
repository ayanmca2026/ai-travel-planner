# TripWise AI — Testing Guide

## Backend Tests (pytest)

### Setup
```bash
cd backend
pip install -r requirements.txt
```

### Run All Tests
```bash
pytest -v
```

### Run Specific Test Categories
```bash
# Unit tests
pytest tests/unit/ -v

# API tests
pytest tests/api/ -v

# AI service tests
pytest tests/ai/ -v
```

### Test Coverage
```bash
pytest --cov=app --cov-report=html
open htmlcov/index.html
```

### Test Categories

#### Unit Tests
- Budget calculations (deterministic)
- Itinerary validation
- AI response parsing/validation
- Currency formatting
- Date/time calculations
- JWT token creation/verification

#### API Tests
- Authentication (register, login, refresh)
- Trip CRUD operations
- Itinerary management
- Budget endpoints
- Place search
- Sharing
- Health check
- Error handling (400, 401, 403, 404, 500)

#### AI Service Tests
- Provider selection
- Prompt generation
- Response parsing
- Retry logic
- Fallback handling
- Demo provider responses

## Frontend Tests (Vitest)

### Setup
```bash
cd frontend
npm install
```

### Run Tests
```bash
npm run test
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Test Categories

#### Component Tests
- UI components render correctly
- Form validation works
- Loading/error states display
- Dark mode toggles

#### Hook Tests
- Auth state management
- API call hooks
- Budget calculation hooks

## E2E Tests (Playwright)

### Setup
```bash
cd frontend
npx playwright install
```

### Run E2E Tests
```bash
npm run test:e2e
```

### E2E Test Scenarios

1. **Registration Flow**: Register → Profile setup → Dashboard
2. **Login Flow**: Login → Dashboard → Logout
3. **Trip Creation**: Create trip → Enter preferences → Generate → View itinerary
4. **Trip Editing**: Open trip → Edit item → Save → Verify
5. **Budget Analysis**: View budget → Check categories → Apply optimization
6. **Sharing**: Generate share link → Open shared view
7. **PDF Export**: Export trip → Verify download

## CI/CD Pipeline

Tests run automatically on:
- Pull request creation
- Push to main branch

Pipeline: Install → Lint → Type Check → Unit Tests → Build → E2E Tests
