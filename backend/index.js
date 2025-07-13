// backend/server.js (or index.js)
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const placeRoutes = require("./routes/placeRoutes");
const businessRoutes = require("./routes/businessRoutes");
// Connect to DB
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // ✅ local frontend dev
      "https://outnodes.vercel.app", // ✅ deployed frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middlewares
//app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Optional: serve static assets (like uploaded files if you store them locally)
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/places/admin/all", placeRoutes); // Admin routes can be under the same or a different path
app.use("/api/business", businessRoutes);

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
