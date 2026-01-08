# 📌 Frontend README

## 🚀 Getting Started (Frontend)

### 1. Prerequisites
- Node.js (v16+ recommended)
- npm

### 2. Environment Setup
Create a `.env` file inside the `frontend` folder:

```
VITE_API_BASE_URL=http://localhost:3000
```

This tells the frontend where your backend API is running.

> ⚠️ Do **not** commit `.env` files to GitHub. Add them to `.gitignore`.

---

### 3. Install Dependencies
From the `frontend` folder:

```bash
npm install
```

---

### 4. Run the Frontend
Start the Vite dev server:

```bash
npm run dev
```

By default, the frontend will run on:

👉 [http://localhost:5173](http://localhost:5173) (Vite default port)

---

### 5. Troubleshooting
- **Backend not reachable?**  
  Make sure backend is running at the same URL you set in `VITE_API_BASE_URL`.
- **Port conflict?**  
  Vite may choose another port. Check your terminal logs after running `npm run dev`.
