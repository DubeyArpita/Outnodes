import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  rating: Number,
  image: String
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
