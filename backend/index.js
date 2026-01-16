const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// ---------- ROUTES ----------
const auth_route = require("./router/auth.router");
const user_route = require("./router/user.router");
const payment_route = require("./router/payment.router");
const export_route = require("./router/export.router");

// ---------- MIDDLEWARE ----------
app.set("trust proxy", 1);
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
        "https://sanjivani-frontend-neon.vercel.app"
    ],
    credentials: true,
  })
);

// ---------- CLOUDINARY ----------
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

// ---------- MONGODB (SERVERLESS SAFE) ----------
let isConnected = false;

async function connectdb() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    throw err;
  }
}

// ---------- AUTO CONNECT PER REQUEST ----------
app.use(async (req, res, next) => {
  try {
    await connectdb();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// ---------- ROUTES ----------
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/api/auth", auth_route);
app.use("/api/user", user_route);
app.use("/api/donation", payment_route);
app.use("/api", export_route);

// ❌ DO NOT app.listen()
// ✅ EXPORT FOR VERCEL
module.exports = app;
