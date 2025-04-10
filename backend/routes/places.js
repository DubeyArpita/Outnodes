import express from "express";
import Place from "./models/Place.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

export default router;


// import express from "express";
// const router = express.Router();

// const samplePlaces = [
//   {
//     id: 1,
//     name: "Sunset Café",
//     category: "Food",
//     location: "Uptown",
//     rating: 4.5,
//     image: "https://source.unsplash.com/400x300/?cafe"
//   },
//   {
//     id: 2,
//     name: "Green Park",
//     category: "Garden",
//     location: "Downtown",
//     rating: 4.2,
//     image: "https://source.unsplash.com/400x300/?park"
//   },
//   {
//     id: 3,
//     name: "Blue Lagoon Club",
//     category: "Nightlife",
//     location: "Beachside",
//     rating: 4.8,
//     image: "https://source.unsplash.com/400x300/?club"
//   },
//   {
//     id: 4,
//     name: "Historic Fort",
//     category: "Monument",
//     location: "Old City",
//     rating: 4.1,
//     image: "https://source.unsplash.com/400x300/?fort"
//   },
//   {
//     id: 5,
//     name: "Gaming Arena X",
//     category: "Entertainment",
//     location: "Tech Mall",
//     rating: 4.6,
//     image: "https://source.unsplash.com/400x300/?gaming"
//   },
//   {
//     id: 6,
//     name: "Botanical Gardens",
//     category: "Nature",
//     location: "City Edge",
//     rating: 4.3,
//     image: "https://source.unsplash.com/400x300/?garden"
//   },
//   {
//     id: 7,
//     name: "Cineplex 7D",
//     category: "Entertainment",
//     location: "Central Plaza",
//     rating: 4.4,
//     image: "https://source.unsplash.com/400x300/?cinema"
//   },
//   {
//     id: 8,
//     name: "Mountain View Café",
//     category: "Food",
//     location: "Hilltop",
//     rating: 4.9,
//     image: "https://source.unsplash.com/400x300/?coffee"
//   },
//   {
//     id: 9,
//     name: "City Palace",
//     category: "Monument",
//     location: "Main City",
//     rating: 4.0,
//     image: "https://source.unsplash.com/400x300/?palace"
//   },
//   {
//     id: 10,
//     name: "Rooftop Lounge",
//     category: "Nightlife",
//     location: "Skyline Tower",
//     rating: 4.7,
//     image: "https://source.unsplash.com/400x300/?rooftop"
//   },
//   {
//     id: 11,
//     name: "Neon Vibes Lounge",
//     category: "Nightlife",
//     location: "City Center",
//     rating: 4.6,
//     image: "https://source.unsplash.com/400x300/?nightclub"
//   },
//   {
//     id: 12,
//     name: "The Rooftop Affair",
//     category: "Nightlife",
//     location: "Skyline Heights",
//     rating: 4.8,
//     image: "https://source.unsplash.com/400x300/?rooftop-party"
//   },
//   {
//     id: 13,
//     name: "After Hours Bar",
//     category: "Nightlife",
//     location: "Urban Block",
//     rating: 4.3,
//     image: "https://source.unsplash.com/400x300/?bar"
//   },
//   {
//     id: 14,
//     name: "Moonlight Disco",
//     category: "Nightlife",
//     location: "Neon Street",
//     rating: 4.7,
//     image: "https://source.unsplash.com/400x300/?disco"
//   },
//   {
//     id: 15,
//     name: "SkyPulse Club",
//     category: "Nightlife",
//     location: "TopFloor Hub",
//     rating: 4.5,
//     image: "https://source.unsplash.com/400x300/?club-dance"
//   },
//   {
//     id: 16,
//     name: "Fun Galaxy Arcade",
//     category: "Entertainment",
//     location: "Playground Mall",
//     rating: 4.6,
//     image: "https://source.unsplash.com/400x300/?arcade"
//   },
//   {
//     id: 17,
//     name: "VR Mania",
//     category: "Entertainment",
//     location: "Tech Arena",
//     rating: 4.8,
//     image: "https://source.unsplash.com/400x300/?vr-gaming"
//   },
//   {
//     id: 18,
//     name: "Bowling Strike Zone",
//     category: "Entertainment",
//     location: "Strike Avenue",
//     rating: 4.5,
//     image: "https://source.unsplash.com/400x300/?bowling"
//   },
//   {
//     id: 19,
//     name: "Laser Battle Arena",
//     category: "Entertainment",
//     location: "Neon District",
//     rating: 4.7,
//     image: "https://source.unsplash.com/400x300/?laser-tag"
//   },
//   {
//     id: 20,
//     name: "Trampoline Planet",
//     category: "Entertainment",
//     location: "Jump Street",
//     rating: 4.4,
//     image: "https://source.unsplash.com/400x300/?trampoline-park"
//   }
    
// ];

// router.get("/", (req, res) => {
//   res.json(samplePlaces);
// });

// export default router;
