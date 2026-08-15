# TripWise AI

**Your AI-Powered Student Travel Companion**

*Plan smarter. Spend less. Explore more.*

---

## 🌍 Overview

TripWise AI is an intelligent travel planning platform designed specifically for students and budget-conscious travelers. It uses AI to generate personalized, optimized travel itineraries that respect your budget while maximizing your experience.

### What Makes TripWise AI Different?

- **Student-First**: Every feature is designed around student budgets and travel styles
- **AI-Powered**: Generates complete day-by-day itineraries with intelligent optimization
- **Budget Intelligence**: Deterministic budget calculations with AI-powered savings suggestions
- **Interactive Maps**: Visualize your entire trip on an interactive map
- **Conversational**: Chat with an AI assistant to modify and improve your trip
- **Share & Export**: Share trips with friends and export professional PDF itineraries

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 AI Trip Generation | Complete day-by-day itineraries from your preferences |
| 💰 Budget Engine | Real-time budget tracking with category breakdowns |
| 🗺️ Interactive Maps | Leaflet maps with markers, routes, and clustering |
| 💬 AI Assistant | Chat to modify and optimize your trip |
| 📊 Budget Analytics | Charts, health indicators, savings suggestions |
| 🔗 Trip Sharing | Share trips via secure public links |
| 📄 PDF Export | Download professional itinerary PDFs |
| 🌙 Dark Mode | Premium dark mode with custom design tokens |
| 📱 Mobile Responsive | Fully responsive mobile-first design |
| 🔐 Authentication | JWT-based auth with secure password hashing |

---

## 🏗️ Architecture

```
tripwise-ai/
├── frontend/          # React + Vite + TypeScript + Tailwind CSS
├── backend/           # Python FastAPI + SQLAlchemy + PostgreSQL
├── database/          # Migrations and seed data
├── docs/              # Documentation
├── scripts/           # Utility scripts
├── docker-compose.yml # Local development services
└── .env.example       # Environment variable template
```

### Frontend Stack
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router v6 (routing)
- TanStack Query v5 (server state)
- React Hook Form + Zod (forms)
- Framer Motion (animations)
- Leaflet + React-Leaflet (maps)
- Recharts (charts)
- Lucide React (icons)

### Backend Stack
- Python 3.11+
- FastAPI (web framework)
- SQLAlchemy 2.0 async (ORM)
- PostgreSQL / SQLite (database)
- Alembic (migrations)
- JWT authentication
- bcrypt (password hashing)
- Pydantic v2 (validation)

### AI Engine
- Configurable provider (Gemini / OpenAI / Demo)
- Structured JSON responses with schema validation
- Multi-agent architecture (Planner, Optimizer, Assistant)
- Retry logic with graceful fallbacks
- Demo mode for development without API keys

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL (optional - SQLite works for development)

### 1. Clone and Setup Environment

```bash
cd tripwise-ai
cp .env.example .env
# Edit .env with your configuration
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Seed development data
python -m app.db.seed

# Start backend server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Open Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Demo Account
- Email: `demo@tripwise.ai`
- Password: `password123`

---

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `sqlite:///./tripwise.db` |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | (required) |
| `AI_PROVIDER` | AI provider: `gemini`, `openai`, `demo` | `demo` |
| `AI_API_KEY` | API key for AI provider | (optional) |
| `AI_MODEL` | AI model name | `gemini-2.0-flash` |
| `MAPS_PROVIDER` | Maps provider | `openstreetmap` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |

See `.env.example` for the complete list.

---

## 🗄️ Database

### Using SQLite (Default - No Setup Required)
The application uses SQLite by default. The database file is created automatically.

### Using PostgreSQL
```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Update .env
DATABASE_URL=postgresql+asyncpg://tripwise:tripwise_dev_password@localhost:5432/tripwise

# Run migrations
cd backend
alembic upgrade head
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest -v
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### Type Checking
```bash
cd frontend
npm run type-check
```

---

## 📡 API Documentation

When the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/trips` | Create trip |
| GET | `/api/trips` | List trips |
| POST | `/api/trips/{id}/generate` | AI generate itinerary |
| POST | `/api/trips/{id}/optimize` | Optimize itinerary |
| POST | `/api/trips/{id}/assistant` | AI chat |
| GET | `/api/trips/{id}/budget` | Budget analysis |
| GET | `/api/share/{share_id}` | Shared trip (public) |
| GET | `/api/health` | Health check |

---

## 🚢 Deployment (Production Guide)

TripWise AI is designed to be deployed across a modern cloud-native stack: Supabase (Database), Render (Backend), and Vercel (Frontend).

### 1. Database Setup (Supabase)
1. Create an account and project on [Supabase](https://supabase.com).
2. Go to Project Settings -> Database to find your connection string.
3. Your database URL will look like: `postgresql+asyncpg://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres`

### 2. Backend Deployment (Render)
1. Create a [Render](https://render.com) account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Use the following settings:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && alembic upgrade head`
   - **Start Command:** `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add the following **Environment Variables**:
   - `DATABASE_URL`: Your Supabase connection string.
   - `JWT_SECRET_KEY`: A secure random string (e.g., generated via `openssl rand -hex 32`).
   - `CORS_ORIGINS`: Your Vercel frontend URL (e.g., `https://ai-travel-planner-[hash].vercel.app`).
   - `FRONTEND_URL`: Same as above.
   - `AI_API_KEY`: Your Gemini/OpenAI API key.
   - `AI_PROVIDER`: `gemini` (or `openai`).
   - `APP_ENV`: `production`

### 3. Frontend Deployment (Vercel)
1. Create a [Vercel](https://vercel.com) account.
2. Click **Add New... -> Project** and import your GitHub repository.
3. Ensure the Framework Preset is set to **Vite**.
4. Set the Build Command to `npm run build` and Output Directory to `dist` (default).
5. Add the following **Environment Variables**:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://ai-travel-planner-xxxx.onrender.com/api`).
6. Click **Deploy**.

### Production Checklist
- [x] Configure PostgreSQL `DATABASE_URL` with `asyncpg` scheme.
- [x] Run `alembic upgrade head` during the Render build step.
- [x] Set strong `JWT_SECRET_KEY` on Render.
- [x] Set `VITE_API_URL` pointing to the Render backend on Vercel.
- [x] Configure `CORS_ORIGINS` on Render to allow Vercel domain.
- [x] Test production user registration and login flows.

---

## 🔒 Security

- JWT authentication with access/refresh tokens
- bcrypt password hashing
- Input validation on all endpoints (Pydantic + Zod)
- CORS protection
- Rate limiting
- SQL injection protection (SQLAlchemy ORM)
- XSS protection (React default escaping)
- No secrets in source code
- Environment-based configuration

---

## 📸 Screenshots

*Screenshots will be added after the UI is complete.*

---

## 🗺️ Roadmap

### Current
- [x] AI trip generation
- [x] Interactive maps
- [x] Budget intelligence
- [x] Authentication
- [x] Trip sharing
- [x] PDF export
- [x] Dark mode

### Planned
- [ ] Real-time collaboration
- [ ] Expense splitting
- [ ] Weather integration
- [ ] Offline support (PWA)
- [ ] Mobile app (React Native)
- [ ] Social features
- [ ] Trip reviews/ratings

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- OpenStreetMap for free map tiles
- Leaflet for the mapping library
- Google AI / OpenAI for AI capabilities
- The student travel community for inspiration

---

**Built with ❤️ for student travelers everywhere.**
