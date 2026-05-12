# Intern assignment — Nexus Digital landing + contact API

Monorepo: **`frontend/`** (Vite + React + Tailwind + Framer Motion) and **`backend/`** (Express + Mongoose).

## Submission package (checklist #1–#5)

Open **[`SUBMISSION.md`](./SUBMISSION.md)** for GitHub links template, zip script, screenshot list, and hosting notes. Screenshot steps: [`docs/SCREENSHOTS-GUIDE.md`](./docs/SCREENSHOTS-GUIDE.md). Git + deploy: [`docs/GITHUB-AND-HOSTING.md`](./docs/GITHUB-AND-HOSTING.md).

**Quick zip (optional deliverable):**

```powershell
cd "c:\Users\HP\OneDrive\Desktop\InternAssign"
.\scripts\make-submission-zip.ps1
```

## Prerequisites

- Node.js 18+
- MongoDB ([Atlas](https://www.mongodb.com/cloud/atlas) or local)

## Backend

```bash
cd backend
cp .env.example .env
# Set DB_URI, PORT; optional FRONTEND_ORIGIN for CORS
npm install
npm run dev
```

- `GET /health`
- `POST /api/contact` — JSON: `fullName`, `email`, `description`
- `GET /api/contact/getContactInfo` — demo list (newest first)

## Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

- Landing: `/`
- Admin (demo): `/admin`

Local dev uses the **Vite proxy** (`/api` → backend). Leave `VITE_API_URL` unset in `frontend/.env` for local work. For a **production build** hosted separately, set `VITE_API_URL` to your public API origin at build time.

## License

Private / assignment use unless you add your own license.
