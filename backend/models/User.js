const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["explorer", "business", "admin"],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Explorer-specific
  phone: String,
  interests: [String],
  profilePic: String,

  // Business-specific
  businessPhone: String,
  location: String,
  idCard: String,
  businessDesc: String,

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
