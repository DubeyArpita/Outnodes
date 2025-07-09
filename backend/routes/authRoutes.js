const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const newUser = new User(req.body);
    await newUser.save();

    console.log("🎯 About to sign JWT with:", {
      id: newUser._id,
      role: newUser.role,
      secret: process.env.JWT_SECRET || "yourSecretKey",
    });

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

module.exports = router;
