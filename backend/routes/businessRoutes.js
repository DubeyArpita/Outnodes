const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Place = require("../models/Place");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Malformed token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user; // ✅ Attach full user
    next();
  } catch (err) {
    return res.status(401).json({
      msg:
        err.name === "TokenExpiredError" ? "Session expired" : "Invalid token",
    });
  }
};

// GET /api/business/stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Authenticated user

    const places = await Place.find({ addedBy: userId });

    const stats = {
      placesPosted: places.length,
      viewsThisMonth: places.reduce(
        (sum, p) => sum + (p.viewsThisMonth || 0),
        0
      ),
      rating: places.length
        ? (
            places.reduce((sum, p) => sum + (p.rating || 0), 0) / places.length
          ).toFixed(1)
        : 0,
    };

    res.status(200).json({ stats, name: req.user.name });
  } catch (err) {
    console.error("💥 Stats route error:", err.message);
    res.status(500).json({ msg: "Failed to fetch stats", error: err.message });
  }
});

module.exports = router;
