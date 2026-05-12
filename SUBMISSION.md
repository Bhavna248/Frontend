# Assignment submission checklist

Fill every **Your …** line before you submit. Optional items are marked.

---

## 1. GitHub public repository links

**Option A — One monorepo (simplest)**  
Use a single public repo that contains both `frontend/` and `backend/`. Put the same URL in both rows if the form asks for two links.

| Deliverable | Your link |
|-------------|-----------|
| Frontend (FE UI) repository | _https://github.com/YOUR_USERNAME/YOUR_REPO_ |
| Backend (BE source) repository | _same URL as above, or a second repo if you split_ |

**Option B — Two repos**  
Push `frontend/` to one repo and `backend/` to another (more work; only needed if instructions require separate repos).

**Quick commands (monorepo, after you create an empty repo on GitHub):**

```powershell
cd "c:\Users\HP\OneDrive\Desktop\InternAssign"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Do **not** commit `.env` files (they are gitignored). Recruiters clone and copy `.env.example` → `.env`.

---

## 2. Source code (.zip file) — optional

A script builds a zip **without** `node_modules`, `dist`, or `.env`:

```powershell
cd "c:\Users\HP\OneDrive\Desktop\InternAssign"
.\scripts\make-submission-zip.ps1
```

Output: **`InternAssign-source-submission.zip`** on your Desktop (or path printed by the script).

---

## 3. Screenshots — frontend / landing page

Follow **`docs/SCREENSHOTS-GUIDE.md`**. Minimum captures:

- Full landing (hero + navbar), light and/or dark theme  
- Services + Tech Stack section  
- Contact form (before submit)  
- After successful submit (toast + green success panel)  
- `/admin` table with at least one row  

Save as PNG/JPG and attach to your report or LMS.

---

## 4. Screenshots — MongoDB (saved data)

Show **documents** in the `contacts` collection (name, email, description, `createdAt`).

- **Atlas:** Cluster → Browse Collections → your database → `contacts`  
- **Compass:** connect with your `DB_URI` → `contacts`  

Include a screenshot where field values are clearly visible (blur secrets in other UI if needed).

---

## 5. Hosted application URL(s) — optional

Typical setup:

| Piece | Where | Notes |
|-------|--------|--------|
| Frontend | [Vercel](https://vercel.com) or Netlify | Deploy `frontend/`; set **`VITE_API_URL`** to your public API URL at build time |
| Backend | [Render](https://render.com), [Railway](https://railway.app), or Fly.io | Set **`DB_URI`**, **`PORT`**, **`FRONTEND_ORIGIN`** (your live site URL) |

See **`docs/GITHUB-AND-HOSTING.md`** for condensed steps.

| Your hosted frontend | _https://…_ |
|----------------------|------------|
| Your hosted API (if separate) | _https://…_ |

---

## Final checks

- [ ] `README.md` or this file lists your real GitHub URLs  
- [ ] No secrets in GitHub (no `.env`, no Atlas password in code)  
- [ ] Zip runs and opens correctly (optional)  
- [ ] Screenshots attached  
- [ ] Hosted URLs work or marked N/A  
