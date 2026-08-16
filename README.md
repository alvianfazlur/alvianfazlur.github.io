# Web Porto

Monorepo: FastAPI backend + Next.js frontend + Supabase PostgreSQL.

## Structure

```
backend/   FastAPI + SQLAlchemy (connects to Supabase Postgres)
frontend/  Next.js (React)
```

## 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Configure Supabase DB
cp .env.example .env
#  -> edit DATABASE_URL with your Supabase Postgres connection string
#     (SQLAlchemy style: postgresql://postgres.REF:pass@aws-0-x.pooler.supabase.com:6543/postgres)

uvicorn app.main:app --reload
# API docs: http://localhost:8000/docs
```

## 2. Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local

npm run dev
# App: http://localhost:3000  (proxies /api to the backend)
```

`DATABASE_URL` example (from Supabase → Project Settings → Database → Connection string, "Transaction" pooler):

```
postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
```

## Notes
- The backend auto-creates the `items` table on startup (SQLAlchemy `create_all`).
- CORS is enabled for `http://localhost:3000` (override via `CORS_ORIGINS`).