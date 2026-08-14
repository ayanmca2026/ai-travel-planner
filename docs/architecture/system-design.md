# TripWise AI — Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              React + Vite + TypeScript                   │ │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐            │ │
│  │  │  Pages   │  │Components│  │  Hooks    │            │ │
│  │  └────┬─────┘  └────┬─────┘  └─────┬─────┘            │ │
│  │       │              │              │                   │ │
│  │  ┌────▼──────────────▼──────────────▼─────┐            │ │
│  │  │         Services / API Layer            │            │ │
│  │  │    (Axios + TanStack Query)             │            │ │
│  │  └────────────────┬───────────────────────┘            │ │
│  └───────────────────┼────────────────────────────────────┘ │
└──────────────────────┼──────────────────────────────────────┘
                       │ HTTP/REST
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    FastAPI Backend                            │
│  ┌──────────────────────────────────────────────────────────┐│
│  │                   API Routes                              ││
│  │  /auth  /trips  /itinerary  /ai  /budget  /places  /share││
│  └────────────────────┬─────────────────────────────────────┘│
│                       │                                      │
│  ┌────────────────────▼─────────────────────────────────────┐│
│  │                 Service Layer                             ││
│  │  AuthService  TripService  BudgetService  ShareService    ││
│  └──────┬────────────┬──────────────┬───────────────────────┘│
│         │            │              │                         │
│  ┌──────▼────┐ ┌─────▼─────┐ ┌─────▼──────┐                │
│  │ Database  │ │ AI Engine │ │ External   │                │
│  │ (SQLAlch) │ │           │ │ APIs       │                │
│  └──────┬────┘ └─────┬─────┘ └─────┬──────┘                │
│         │            │              │                         │
└─────────┼────────────┼──────────────┼────────────────────────┘
          │            │              │
     ┌────▼────┐  ┌────▼────┐  ┌─────▼─────┐
     │PostgreSQL│  │ Gemini/ │  │OpenStreet │
     │ /SQLite │  │ OpenAI/ │  │   Map     │
     │         │  │  Demo   │  │           │
     └─────────┘  └─────────┘  └───────────┘
```

## AI Engine Architecture

```
                    ┌───────────────────┐
                    │   AI Orchestrator  │
                    └────────┬──────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
       ┌──────▼──────┐ ┌────▼────┐ ┌───────▼───────┐
       │   Planner   │ │Optimizer│ │   Assistant    │
       │   Agent     │ │  Agent  │ │    Agent       │
       └──────┬──────┘ └────┬────┘ └───────┬───────┘
              │              │              │
       ┌──────▼──────────────▼──────────────▼───────┐
       │            AI Provider Abstraction          │
       │  ┌─────────┐ ┌──────────┐ ┌─────────────┐ │
       │  │ Gemini  │ │  OpenAI  │ │    Demo     │ │
       │  │Provider │ │ Provider │ │  Provider   │ │
       │  └─────────┘ └──────────┘ └─────────────┘ │
       └─────────────────────────────────────────────┘
```

### AI Response Flow

1. User creates trip with preferences
2. Planner Agent builds context prompt
3. AI Provider generates structured JSON
4. Response validated against Pydantic schema
5. If invalid: retry (max 2 times)
6. If all retries fail: use Demo Provider fallback
7. Validated itinerary stored in database
8. Budget Engine calculates deterministic costs

## Database Schema

```
users ──────────┐
                │
profiles ───────┤
                │
trips ──────────┼──── itinerary_days ──── itinerary_items
                │
                ├──── expenses
                │
                ├──── chat_messages
                │
                ├──── ai_generations
                │
                └──── recommendations

saved_places ────── users

destinations (seed data)
```

## Data Flow

### Trip Generation
```
User Input → Trip Created (DB) → AI Planner → JSON Response →
Validate → Store Itinerary Days/Items (DB) → Budget Calc →
Return Full Trip + Budget Analysis
```

### Trip Optimization
```
Existing Trip (DB) → Build Context → AI Optimizer → JSON Diff →
Validate → Update Items (DB) → Recalculate Budget → Return Updated Trip
```

### Budget Calculation (Deterministic)
```
Itinerary Items (DB) → Sum by Category → Calculate Totals →
Compare vs Budget → Health Status → Savings Suggestions
```
