# StorePulse

StorePulse is a store ratings application built with a NestJS + TypeORM backend and a Vite + React TypeScript frontend.

## Live deployment

- **Frontend:** https://store-pulse-mohp.vercel.app
- **Backend API:** https://storepulse-93nt.onrender.com
- **API documentation (Swagger):** https://storepulse-93nt.onrender.com/docs
- **Database:** MySQL, hosted on Railway (private to the backend service)

> **Note for reviewers:** the backend is hosted on Render's free tier, which spins down after periods of inactivity. The **first** request after a period of inactivity can take up to 50–60 seconds to respond while the service wakes up. If the app appears slow or unresponsive on first load, please wait a moment or refresh — this is expected free-tier behavior, not an application error. Subsequent requests will be fast.

### Test credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@storepulse.local` | `Admin@1234` |
| Store Owner | `owner-1@storepulse.local` | `Owner@123` |
| Normal User | `customertest2026@example.com` | `Test@1234` |

New Normal User accounts can also be created directly via the signup page.

## Current status

The application is implemented through Phase 11 and deployed to production:

- JWT authentication with role-based access
- Admin user, store, dashboard, filtering, sorting, and pagination screens
- Normal-user store search and rating workflow
- Store Owner dashboard with average ratings and rater details
- Responsive frontend screens with loading and error states
- Swagger API documentation and an idempotent admin seed
- Deployed to Vercel (frontend), Render (backend), and Railway (MySQL)

Phase 12 completes final polish and documentation.

## Architecture

```
┌─────────────┐        HTTPS         ┌──────────────┐       MySQL (SSL/proxy)      ┌───────────┐
│  Vercel      │ ───────────────────▶│  Render       │ ────────────────────────────▶│  Railway   │
│  React (Vite)│◀─────────────────── │  NestJS API   │◀──────────────────────────── │  MySQL     │
└─────────────┘                      └──────────────┘                              └───────────┘
```

- Frontend and backend are deployed independently on separate providers.
- The backend connects to Railway's MySQL over its public proxy address, since Render and Railway are separate infrastructure providers with no shared private network.
- CORS on the backend is restricted to the deployed frontend origin via the `FRONTEND_URL` environment variable.

## Database migrations

Phase 1 defines the `users`, `stores`, and `ratings` tables. TypeORM is configured with `synchronize: false`; use migrations to change the schema.

```powershell
Set-Location backend
npm run migration:show
npm run migration:run
```

The schema enforces unique user emails, one store per store owner, one rating per user and store, foreign keys, and the 1–5 rating range.

**Running migrations against a remote database (e.g. Railway):** temporarily set the connection environment variables in your shell before running the migration command, so they override the local defaults for that command only:

```powershell
$env:DB_HOST = "<railway-proxy-host>"
$env:DB_PORT = "<railway-proxy-port>"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "<railway-root-password>"
$env:DB_NAME = "railway"
node --loader ts-node/esm ./node_modules/typeorm/cli.js migration:run -d src/database/data-source.ts
```

## Authentication

Phase 2 provides:

- `POST /auth/signup` for normal users
- `POST /auth/login` returning a one-hour access token
- `PATCH /auth/update-password` for authenticated users
- DTO validation for names, emails, addresses, and passwords
- bcrypt password hashing
- JWT and role guard infrastructure for protected feature modules

Send the token in the `Authorization: Bearer <token>` header when calling protected endpoints.

Signup only creates `NORMAL_USER` accounts. Admin and Store Owner accounts are created by an existing Admin via `POST /admin/users` — there is no public self-registration for these roles, by design.

## Backend hardening

Phase 6 adds a global exception filter, consistent success responses, input sanitization, and Swagger documentation (available locally at `http://localhost:3000/docs`, and in production at the link above).

Create the default admin once the database migration has run:

```powershell
Set-Location backend
npm run seed:admin
```

The seed is idempotent and reads `ADMIN_*` settings from `backend/.env`.

> If deploying to a new remote database where `npm run seed:admin` cannot be run directly (e.g. no shell access on the hosting provider), an admin can be inserted manually via the database console. See "Manual admin creation" below.

### Manual admin creation (remote database without shell access)

1. Generate a bcrypt hash locally:
   ```powershell
   cd backend
   node -e "require('bcrypt').hash('YOUR_PASSWORD', 4).then(console.log)"
   ```
2. Confirm the printed hash is exactly 60 characters (`$hash.Length` in PowerShell) before using it — truncation during copy-paste is a common and silent failure mode.
3. Insert directly via the database's console (e.g. Railway's web-based MySQL console):
   ```sql
   INSERT INTO users (name, email, password, address, role)
   VALUES ('Admin Name', 'admin@example.com', 'PASTE_60_CHAR_HASH_HERE', 'Address', 'ADMIN');
   ```
4. Verify the hash landed intact before testing login:
   ```sql
   SELECT LENGTH(password) FROM users WHERE email='admin@example.com';
   ```
   Must return exactly `60`.

## Prerequisites

- Node.js 22 or newer
- npm 10 or newer
- Docker Desktop with Compose (for local development only)

## Local setup

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

## Run the applications locally

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

The backend and frontend are deployed as separate services on separate providers (Render and Vercel), with the database on a third provider (Railway).

**Backend (Render):**
- Set all variables from `backend/.env.example`, including a strong production `JWT_SECRET`, production database credentials, and `FRONTEND_URL` set to the deployed frontend's exact origin (no trailing slash).
- Since the database is on a different provider than the backend, the connection uses the database's public proxy address rather than a private network hostname.
- Run `npm run migration:run` against the production database before first use — creating the schema does not happen automatically on deploy.
- Run `npm run seed:admin` (or the manual admin creation steps above) once, to create the first administrator account.
- Free-tier Render services spin down after inactivity; see the cold-start note at the top of this document.

**Frontend (Vercel):**
- Set `VITE_API_URL` to the deployed backend's exact URL before building. Vite bakes this value into the build at build time — changing the environment variable after a build has no effect until the site is redeployed.
- Double-check this URL character-by-character after setting it; a single-character typo in the domain will cause every API call to fail with a misleading browser-reported "CORS error," even though the real cause is a failed DNS/connection to a non-existent host.

**Database (Railway or similar managed MySQL):**
- Keep `synchronize` disabled in all environments; use migrations exclusively.
- A managed MySQL service is recommended for production, with backups, restricted credentials, TLS where required by the provider, and network access limited to trusted services.
- Do not reuse the local development password (`storepulse`) or any sample credentials in production.

## Validation

```powershell
npm --prefix backend run build
npm --prefix backend run lint
npm --prefix frontend run build
npm --prefix frontend run lint
```

Stop the local database with `docker compose down`. Add `-v` when the local MySQL volume should also be removed.
