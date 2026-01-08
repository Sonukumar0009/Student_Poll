# 📌 Backend README

## 🚀 Getting Started (Backend)

### 1. Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas cluster)

---

### 2. Environment Setup
Create a `.env` file inside the `src/Backend` folder:

```
PORT=3000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
```

- Replace `<username>` and `<password>` with your MongoDB credentials.
- The backend will run on `http://localhost:3000` if `PORT=3000`.

---

### 3. Install Dependencies
From the `Backend` folder:

```bash
npm install
```

---

### 4. Run the Backend
Start the backend server inside `src/Backend` folder:

```bash
node app.js
```

The backend should now be running on:

👉 [http://localhost:3000](http://localhost:3000)

---

### 5. Troubleshooting
- **MongoDB connection error?**  
  Make sure your `MONGODB_URL` is correct and your IP is whitelisted in MongoDB Atlas.
- **Port already in use?**  
  Change the `PORT` value in `.env`.

---

✅ Now you can run **frontend** (`npm run dev`) and **backend** (`node app.js`) in **separate terminals** and they will work together.
