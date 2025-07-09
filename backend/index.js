// backend/server.js (or index.js)
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const placeRoutes = require("./routes/placeRoutes");

// Connect to DB
connectDB();

const app = express();

app.use(
  cors({
    origin: ["https://outnodes.vercel.app"], // ✅ Allow your frontend domain
    credentials: true, // if you're sending cookies or authorization headers
  })
);

// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Optional: serve static assets (like uploaded files if you store them locally)
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/places/admin/all", placeRoutes); // Admin routes can be under the same or a different path

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.use((req, res, next) => {
  console.log("📡 Request received:", req.method, req.originalUrl);
  next();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
// Export app for testing
module.exports = app;