# StorePulse

StorePulse is a store ratings application built with a NestJS + TypeORM backend and a Vite + React TypeScript frontend.

## Current status

The application is implemented through Phase 11:

- JWT authentication with role-based access
- Admin user, store, dashboard, filtering, sorting, and pagination screens
- Normal-user store search and rating workflow
- Store Owner dashboard with average ratings and rater details
- Responsive frontend screens with loading and error states
- Swagger API documentation and an idempotent admin seed

Phase 12 completes polish, documentation, and deployment guidance.

## Database migrations

Phase 1 defines the `users`, `stores`, and `ratings` tables. TypeORM is configured with `synchronize: false`; use migrations to change the schema.

```powershell
Set-Location backend
npm run migration:show
npm run migration:run
```

The schema enforces unique user emails, one store per store owner, one rating per user and store, foreign keys, and the 1-5 rating range.

## Authentication

Phase 2 provides:

- `POST /auth/signup` for normal users
- `POST /auth/login` returning a one-hour access token
- `PATCH /auth/update-password` for authenticated users
- DTO validation for names, emails, addresses, and passwords
- bcrypt password hashing
- JWT and role guard infrastructure for protected feature modules

Send the token in the `Authorization: Bearer <token>` header when calling protected endpoints.

## Backend hardening

Phase 6 adds a global exception filter, consistent success responses, input sanitization, and Swagger documentation at `http://localhost:3000/docs`.

Create the default admin once the database migration has run:

```powershell
Set-Location backend
npm run seed:admin
```

The seed is idempotent and reads `ADMIN_*` settings from `backend/.env`.

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
npm --prefix backend run migration:run
npm --prefix backend run seed:admin
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

The API documentation is available at `http://localhost:3000/docs`.

You can also use the root convenience scripts:

```powershell
npm run install:all
npm run build
npm run lint
npm test
```

## Deployment notes

Deploy the backend and frontend as separate services. Set the backend environment variables from `backend/.env.example`, including a strong production `JWT_SECRET`, production database credentials, and the deployed frontend origin in `FRONTEND_URL`. Set `VITE_API_URL` in the frontend environment to the deployed backend URL before building.

For a production database, run `npm run migration:run` from `backend/` during deployment. Keep `synchronize` disabled and run the idempotent `npm run seed:admin` only when the initial administrator is required. Do not use the sample local passwords in production.

The Docker Compose file is intended for local MySQL development. A managed MySQL service is recommended for production, with backups, restricted credentials, TLS, and a private network between the API and database.

## Validation

```powershell
npm --prefix backend run build
npm --prefix backend run lint
npm --prefix frontend run build
npm --prefix frontend run lint
```

Stop the database with `docker compose down`. Add `-v` when the local MySQL volume should also be removed.