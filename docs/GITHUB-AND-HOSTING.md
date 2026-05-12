# GitHub + optional hosting

## Create the GitHub repository (browser)

1. Go to [https://github.com/new](https://github.com/new).  
2. Repository name: e.g. `intern-assign-nexus` (public).  
3. Do **not** add README/license/gitignore (you already have files locally).  
4. Create repository → copy the **HTTPS** URL.

## Push this project (first time)

From PowerShell (replace the URL):

```powershell
cd "c:\Users\HP\OneDrive\Desktop\InternAssign"
git init
git add -A
git status   # confirm .env files are NOT listed
git commit -m "Intern assignment: React landing + Express + MongoDB contact API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If GitHub shows “empty” instructions, use **git remote add** + **push** as above.

**Two-repo variant:** create a second empty repo, add a second remote (e.g. `origin-fe`), subtree or copy only `frontend/` — only if your brief requires separate FE/BE links.

---

## Optional: host the frontend (Vercel)

1. Import GitHub repo in [Vercel](https://vercel.com).  
2. **Root directory:** `frontend`  
3. **Build command:** `npm run build`  
4. **Output directory:** `dist`  
5. **Environment variables:**  
   - `VITE_API_URL` = your **public** API base, e.g. `https://your-api.onrender.com` (no trailing slash)

Redeploy when you change `VITE_API_URL`.

---

## Optional: host the backend (Render example)

1. New **Web Service** → connect repo.  
2. **Root directory:** `backend`  
3. **Build:** `npm install`  
4. **Start:** `npm start`  
5. **Environment:**  
   - `DB_URI` = Atlas connection string  
   - `PORT` = `10000` (or whatever Render assigns; use Render’s `$PORT` if they inject it — then set `PORT` in Render dashboard to match)  
   - `FRONTEND_ORIGIN` = your Vercel URL, e.g. `https://your-app.vercel.app`

CORS must allow your frontend origin.

---

## After hosting

- Put **frontend URL** and **API URL** in `README.md` or `SUBMISSION.md`.  
- Test: submit contact form on the **live** site → verify row in Atlas + `/admin` if you deploy SPA with API URL set.
