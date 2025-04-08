import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placesRoutes from "./routes/places.js";

dotenv.config();

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
