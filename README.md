# Finance Data Processing and Access Control Backend

Backend for a finance dashboard: **JWT login**, **role-based access**, **user and record APIs**, and **dashboard aggregates**. Intended for clear HR or evaluator walkthroughs (Postman: login → users → records → dashboard).

## Table of contents

- [Project overview](#project-overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Setup](#setup-instructions)
- [Environment variables](#environment-variables)
- [API endpoints](#api-endpoints)
- [Authentication and roles](#authentication--access-control)
- [Postman (HR workflow)](#postman-testing-workflow)
- [Sample responses](#sample-responses)

## Project overview

- **User management:** Create users, assign roles (`ADMIN`, `ANALYST`, `VIEWER`), status (`ACTIVE` / `INACTIVE`).
- **Financial records:** Income/expense records linked to a user (`createdBy`).
- **Dashboard:** Counts and totals (users, records, income, expense).
- **Security:** JWT on protected routes; role checks per endpoint.

## Features

| Area | Capability |
|------|------------|
| Auth | `POST /api/login` returns JWT + safe user profile (no password) |
| Users | Create / list (**ADMIN**); responses never include password hashes |
| Records | Create (**ADMIN**); list (**ADMIN** & **ANALYST**) |
| Dashboard | Summary (**ADMIN** & **ANALYST**) |

## Technology stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT (`jsonwebtoken`), `bcrypt` / `bcryptjs` |

## Setup instructions

1. **Clone and install**

   ```bash
   git clone <repo_url>
   cd finance-backend
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set values (see [Environment variables](#environment-variables)).

3. **Database**

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

   Seed creates a default **ADMIN** (see [Authentication](#authentication--access-control)).

4. **Run**

   ```bash
   npm start
   ```

   Default URL: `http://localhost:5000` (or your `PORT`).

5. **Quick check**

   `GET http://localhost:5000/` returns a short list of recommended request order.

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default `3000` in code if unset; use `5000` if you follow examples) |
| `JWT_SECRET` | Secret for signing JWTs (required) |
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `SEED_ADMIN_EMAIL` | Optional; default `admin@finance.local` |
| `SEED_ADMIN_PASSWORD` | Optional; default `Admin@123456` |

## API endpoints

All paths below are under the `/api` prefix (e.g. full login URL: `POST /api/login`).

### Recommended evaluation order

1. **Login** — obtain token  
2. **Users** — create / list (ADMIN)  
3. **Records** — create (ADMIN), then list  
4. **Dashboard** — summary  

### `POST /api/login`

Public. Body (JSON):

```json
{
  "email": "admin@finance.local",
  "password": "Admin@123456"
}
```

Response (example):

```json
{
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "System Admin",
    "email": "admin@finance.local",
    "role": "ADMIN",
    "status": "ACTIVE"
  }
}
```

`INACTIVE` users receive `403`.

### `POST /api/users` (ADMIN)

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "name": "Ayush",
  "email": "ayush@example.com",
  "password": "password123",
  "role": "ANALYST",
  "status": "ACTIVE"
}
```

### `GET /api/users` (ADMIN)

Headers: `Authorization: Bearer <token>`

Returns users **without** `password`; includes related `records`.

### `POST /api/records` (ADMIN)

Headers: `Authorization: Bearer <token>`

Body (JSON):

```json
{
  "amount": 1000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-04",
  "createdBy": "<user_id>"
}
```

Use a real user `id` from login or `GET /api/users`.

### `GET /api/records` (ADMIN, ANALYST)

Headers: `Authorization: Bearer <token>`

### `GET /api/dashboard` (ADMIN, ANALYST)

Headers: `Authorization: Bearer <token>`

## Authentication & access control

- Protected routes expect: `Authorization: Bearer <token>`.
- **ADMIN:** users, records, dashboard.  
- **ANALYST:** records (read), dashboard.  
- **VIEWER:** reserved for future use.

**Default seed admin** (unless overridden by env):

- Email: `admin@finance.local`  
- Password: `Admin@123456`  

## Postman testing workflow

1. Import **`postman/Finance-Backend.postman_collection.json`**.
2. Set collection variable `baseUrl` if your server is not `http://localhost:5000`.
3. Run **1 — Login** first (tests save `token` and `createdByUserId` for the demo record request).
4. Run the remaining requests in order (or use **Run collection**).

To test as **ANALYST**, create an analyst user while logged in as admin, then use **Login** with that analyst’s email/password and call **Get records** / **Dashboard** (not **Create user** / **Create record**).

## Sample responses

**Dashboard** (`GET /api/dashboard`):

```json
{
  "totalUsers": 3,
  "totalRecords": 5,
  "totalIncome": 5000,
  "totalExpense": 0
}
```

---

This backend is structured for **evaluation**: clear routes, explicit RBAC, and a reproducible seed + Postman flow for reviewers.

## License

MIT (or as specified by your course).
