const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Place = require("../models/Place");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authorization denied" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );
    req.user = decoded; // Attaches { id, role } to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "yourSecretKey",
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      msg: "User registered",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePic: newUser.profilePic,
        businessPhone: newUser.businessPhone,
        location: newUser.location,
        businessDesc: newUser.businessDesc,
        idCard: newUser.idCard,
        phone: newUser.phone,
        interests: newUser.interests,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === "admin@outnodes.com" && password === "admin123") {
      const token = jwt.sign(
        { id: "admin-id", role: "admin" },
        process.env.JWT_SECRET || "yourSecretKey",
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        msg: "Admin logged in successfully",
        token,
        isLoggedIn: true,
        role: "admin",
        user: {
          id: "admin-id",
          email: "admin@outnodes.com",
          role: "admin",
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    // NOTE: You should hash + compare passwords in production!
    if (user.password !== password)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "yourSecretKey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id || user.id, // handle both cases
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        businessPhone: user.businessPhone,
        location: user.location,
        businessDesc: user.businessDesc,
        idCard: user.idCard,
        phone: user.phone,
        interests: user.interests,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
});

router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    // Find all places where the 'favorites' array contains the logged-in user's ID.
    const favoritePlaces = await Place.find({ favorites: req.user.id });

    res.status(200).json({
      success: true,
      favorites: favoritePlaces,
    });
  } catch (err) {
    console.error("Error fetching favorites:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
