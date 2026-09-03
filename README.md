# StorePulse

StorePulse is a store ratings application built with a NestJS + TypeORM backend and a Vite + React TypeScript frontend.

## Phase 0

The initial foundation includes:

- Separate `backend/` and `frontend/` applications
- npm-based scripts
- Docker Compose MySQL 8.4 service
- Environment examples for local development
- Backend health endpoint at `GET /health`
- Runnable frontend shell

Entities, migrations, authentication, roles, seed data, and feature pages are planned for later phases.

## Prerequisites

- Node.js 22 or newer
- npm 10 or newer
- Docker Desktop with Compose

## Setup

From the repository root:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
npm --prefix backend install
npm --prefix frontend install
docker compose up -d
```

The default local MySQL connection is:

- Host: `localhost`
- Port: `3306`
- Database: `storepulse`
- User: `storepulse`
- Password: `storepulse`

## Run the applications

Start the backend in one terminal:

```powershell
Set-Location backend
npm run start:dev
```

The API runs at `http://localhost:3000`. Verify it with:

```powershell
Invoke-RestMethod http://localhost:3000/health
```

Start the frontend in another terminal:

```powershell
Set-Location frontend
npm run dev
```

Open `http://localhost:5173` in a browser.

## Validation

```powershell
npm --prefix backend run build
npm --prefix backend run lint
npm --prefix frontend run build
npm --prefix frontend run lint
```

Stop the database with `docker compose down`. Add `-v` when the local MySQL volume should also be removed.