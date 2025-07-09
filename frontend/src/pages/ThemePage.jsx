import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThemePage = ({ theme }) => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        console.log("🔍 Fetching places for theme:", theme);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/places?category=${theme}`
        );
        console.log("📡 Fetch response:", res);
        if (!res.ok) throw new Error("Failed to fetch places");

        const data = await res.json();
        console.log("📥 Places data:", data);
        console.log("📥 Places count:", data.places?.length);
        setPlaces(data.places);
      } catch (err) {
        setError("⚠️ Could not load places for this theme.");
        console.error("❌", err.message);
      }
    };

    fetchPlaces();
  }, [theme]);

  const formatTitle = (theme) => {
    return theme.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">
        ✨ Discover: {formatTitle(theme)}
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {places.length === 0 ? (
        <p className="text-center text-gray-500">
          No places found in this theme.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group"
              onClick={() => navigate(`/places/${place._id}`)}
            >
              <img
                src={place.photo || "https://via.placeholder.com/300"}
                alt={place.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {place.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  📍 {place.location?.city}, {place.location?.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemePage;
