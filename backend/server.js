require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const contactRoutes = require("./routes/contactRoutes");

const PORT = Number(process.env.PORT) || 5000;
const DB_URI = process.env.DB_URI;

const app = express();

app.use(
  cors({
    origin:
      process.env.FRONTEND_ORIGIN?.split(",").map((s) => s.trim()) ?? true,
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/contact", contactRoutes);

async function bootstrap() {
  if (!DB_URI) {
    console.error("Missing DB_URI in environment. Copy backend/.env.example to backend/.env and set DB_URI.");
    process.exit(1);
  }

  await mongoose.connect(DB_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Server failed to start:", err.message);
  process.exit(1);
});
