# Screenshot guide for your submission

Use **Windows + Shift + S** (Snipping Tool) or full-screen capture. Prefer **PNG** for UI.

## Frontend / landing (required)

1. **Home / hero**  
   - Open `http://localhost:5173` (or your hosted URL).  
   - Capture from the top of the page through the hero and primary buttons.

2. **Services**  
   - Scroll to **Services**; capture the three cards.

3. **Technology stack**  
   - Scroll to **Tech Stack**; capture the tabbed panel with one tab selected.

4. **Contact**  
   - Empty form: show labels and fields.  
   - Fill with test data → **Send message** → capture **toast** + the **success panel** under the button (mentions MongoDB / admin).

5. **Admin dashboard**  
   - Go to `http://localhost:5173/admin`.  
   - Capture the table with **at least one row** (submit the form first if empty).

6. **Dark mode (optional but impressive)**  
   - Toggle moon/sun in the navbar → capture hero or full page again.

## MongoDB — stored data (required)

### MongoDB Atlas

1. Log in → **Project** → your **Cluster**.  
2. **Browse Collections**.  
3. Open your database (from connection string, e.g. `intern_assign` or `test`).  
4. Open collection **`contacts`**.  
5. Screenshot the **document list** so **fullName**, **email**, **description**, and **createdAt** are readable.

### MongoDB Compass

1. Connect with the same **`DB_URI`** as in `backend/.env`.  
2. Navigate: database → **`contacts`**.  
3. Screenshot documents in **List** or **JSON** view.

---

**Tip:** Use a fake email like `demo@example.com` in screenshots if you prefer not to expose a real address.
