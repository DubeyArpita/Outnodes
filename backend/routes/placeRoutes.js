const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Place = require("../models/Place");
const User = require("../models/User");

// ✅ Auth Middleware (inline or extract later if desired)
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1]; // strips "Bearer"
  if (!token) return res.status(401).json({ msg: "Malformed token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

//
// 🔶 Route 1: Submit a New Place (POST /api/places)
//
router.post("/", authMiddleware, async (req, res) => {
  try {
    const business = await User.findById(req.user.id);
    if (!business || business.role !== "business") {
      return res
        .status(403)
        .json({ msg: "Only business owners can add places." });
    }

    const { name, description, location, images, category } = req.body;

    // Validate required fields
    if (!name || !description || !location || !category) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields." });
    }

    // Validate category against allowed values
    const validCategories = [
      "Food Outlet",
      "Monuments & Nature",
      "Club & Nightlife",
      "Gaming & Entertainment",
    ];

    console.log("🔍 Validating category:", category);
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        msg: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
      });
    }

    const newPlace = new Place({
      name,
      description,
      location,
      images,
      category, // ✅ consistent with schema
      addedBy: business._id,
    });

    await newPlace.save();

    res
      .status(201)
      .json({ msg: "Place created successfully", place: newPlace });
  } catch (err) {
    console.error("💥 Place creation error:", err.message);
    res.status(500).json({ msg: "Error creating place", error: err.message });
  }
});

// 🔷 Admin: Get All Places (GET /api/places/admin/all)
router.get("/admin/all", authMiddleware, async (req, res) => {
  console.log("👑 Admin route hit by:", req.user);
  try {
    const places = await Place.find();
    res.status(200).json({ places });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching all places", error: err.message });
  }
});

router.get("/", async (req, res) => {
  console.log("🧪 Category received:", req.query.category);
  const places = await Place.find({ category: req.query.category });
  res.status(200).json({ places });
});

// 🔶 Route 2: Get Your Own Places (GET /api/places/mine)
//
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const places = await Place.find({ addedBy: req.user.id });
    res.status(200).json({ places });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching places", error: err.message });
  }
});

//
// 🔶 Route 3: Get a Place by ID (GET /api/places/:id)
//
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: "Place not found" });
    }

    place.viewsThisMonth = (place.viewsThisMonth || 0) + 1;
    await place.save();

    res.status(200).json({ place });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching place", error: err.message });
  }
});

// GET /api/places/mine ✅ already exists
// DELETE /api/places/:id

router.delete("/:id", authMiddleware, async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) return res.status(404).json({ msg: "Place not found" });

  // 🔐 Only owner or admin can delete
  if (req.user.role !== "admin" && place.addedBy.toString() !== req.user.id) {
    return res.status(403).json({ msg: "You don't own this place" });
  }

  await Place.findByIdAndDelete(req.params.id);
  res.json({ msg: "Place deleted successfully" });
});

module.exports = router;
