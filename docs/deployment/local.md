# TripWise AI — Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+ and npm 9+
- Python 3.11+
- Git
- Docker (optional, for PostgreSQL)

### Quick Start

```bash
# 1. Clone and setup
git clone <repo-url>
cd tripwise-ai
cp .env.example .env

# 2. Backend
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
alembic upgrade head
python -m app.db.seed
uvicorn app.main:app --reload --port 8000

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Production Deployment

### Frontend — Vercel

1. Connect your GitHub repository to Vercel
2. Set framework preset to "Vite"
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variables:
   - `VITE_API_URL` = your backend URL

### Backend — Railway / Render

#### Railway

1. Create new project from GitHub repo
2. Set root directory to `backend/`
3. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables from `.env.example`
5. Add PostgreSQL service and link `DATABASE_URL`

#### Render

1. Create new Web Service from GitHub
2. Set root directory to `backend/`
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database
6. Set environment variables

### Database — PostgreSQL

Use managed PostgreSQL from:
- Railway (built-in)
- Render (built-in)
- Neon (serverless, free tier)
- Supabase (free tier)

Connection string format:
```
postgresql+asyncpg://user:password@host:5432/dbname
```

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# Run migrations
docker exec -it tripwise-backend alembic upgrade head

# Seed data
docker exec -it tripwise-backend python -m app.db.seed
```

## Production Checklist

- [ ] Strong `JWT_SECRET_KEY` (min 32 characters, random)
- [ ] PostgreSQL `DATABASE_URL` configured
- [ ] `AI_API_KEY` set for your AI provider
- [ ] `CORS_ORIGINS` restricted to production domains
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Database migrations run (`alembic upgrade head`)
- [ ] `APP_ENV=production`
- [ ] Error monitoring configured
- [ ] Health check endpoint accessible
- [ ] Logs configured for production
