import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placesRoutes from "./routes/places.js";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();

app.use(cors({
    origin: "http://localhost:3000",  // allow React dev server
    credentials: true
  }));
  
app.use(express.json());

app.use("/places", placesRoutes);

app.get('/', (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
