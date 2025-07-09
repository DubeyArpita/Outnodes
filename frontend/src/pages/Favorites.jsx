import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";

const dummyFavorites = [
  {
    id: 1,
    name: "Moonlight Café",
    image: "/moonlight.jpg",
    description: "A cozy escape for book lovers and chai sippers.",
    location: "Delhi, India",
    price: "₹300 avg",
    category: "food",
    addedAt: "2025-07-01",
  },
  {
    id: 2,
    name: "Skyline Arcade",
    image: "/arcade.jpg",
    description: "VR, bowling, and a sweet neon glow.",
    location: "Noida, India",
    price: "₹100+",
    category: "gaming",
    addedAt: "2025-06-27",
  },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState(dummyFavorites);
  const [filter, setFilter] = useState("all");

  const handleToggle = (id) => {
    setFavorites((prev) => prev.filter((place) => place.id !== id));
  };

  const filtered =
    filter === "all"
      ? favorites
      : favorites.filter((f) => f.category === filter);

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Your Favorites 💙
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["all", "food", "gaming", "clubs", "nature"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                filter === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } transition`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* No favorites fallback */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No favorites yet in this category.</p>
            <p className="mt-1">Add some love and they’ll show up here ❤️</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered
              .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
              .map((place) => (
                <div
                  key={place.id}
                  className="bg-white rounded-xl shadow group relative overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Heart Toggle */}
                  <button
                    onClick={() => handleToggle(place.id)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-red-50 text-red-500 z-10"
                    title="Remove from favorites"
                  >
                    <FiHeart size={20} />
                  </button>

                  {/* Image */}
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {place.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      📍 {place.location} • 💰 {place.price}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ❤️ Added on {place.addedAt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
