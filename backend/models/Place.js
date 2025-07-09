const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }, // e.g. cafe, adventure, stay, event
  images: [String], // Cloudinary URLs
  location: {
    city: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // links to business owner
    required: true,
  },
  contact: {
    phone: String,
    website: String,
    instagram: String,
  },
  timing: {
    open: String, // e.g. "10:00 AM"
    close: String, // e.g. "11:00 PM"
  },
  best_time: { type: String }, // e.g. "Evening", "Weekend"
  amenities: {type: [String] }, // e.g. ["WiFi", "Parking", "AC"]
  priceRange: { type: String }, // e.g. “₹₹”, “Affordable”, “Premium”
  games: { type: String }, 
  gamePricing: { type: String }, 
  ageLimit: { type: String }, 
  foodType: { type: String }, 
  menu: { type: String }, 
  entryPrice: { type: String }, 
  otherInfo: { type: String }, 
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      comment: String,
      createdAt: Date,
    },
  ],
});

module.exports = mongoose.model("Place", placeSchema);
