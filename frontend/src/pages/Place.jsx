import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);
    useEffect(() => {
    const fetchPlace = async () => {

      try {

        const res = await fetch(`http://localhost:5000/api/places/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text(); // Try to read the full error message
          throw new Error(`Server responded with ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        setPlace(data.place);
      } catch (err) {
        console.error("❌ Failed to fetch place:", err.message);
        setError("Couldn't load place.");
      }
    };

    fetchPlace();
  }, [id]);

  if (!place) {
    return <div className="p-10">Loading place info...</div>;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
        {/* 📸 Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {place.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Place ${idx}`}
              className="rounded-lg object-cover w-full h-48"
            />
          ))}
        </div>

        {/* 🏷️ Basic Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700">{place.name}</h2>
          <p className="text-sm text-gray-600">{place.category}</p>
        </div>

        {/* 📝 Description */}
        <p className="text-gray-800 whitespace-pre-line">{place.description}</p>

        {/* 🕒 Timings & Pricing */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Pricing:</strong> {place.pricing || "N/A"}
          </div>
          <div>
            <strong>Timings:</strong> {place.timings || "N/A"}
          </div>
        </div>

        {/* 📍 Location */}
        <div>
          <strong>Location:</strong>
          <p>{place.location?.address}</p>
        </div>

        {/* 💬 Category-specific Info */}
        {place.foodType && (
          <div>
            <strong>Food Type:</strong> {place.foodType}
            <p>
              <strong>Menu:</strong> {place.menu}
            </p>
            <p>
              <strong>Price Range:</strong> {place.priceRange}
            </p>
          </div>
        )}

        {place.entryPrice && (
          <div>
            <strong>Club Entry:</strong> {place.entryPrice}
            <p>
              <strong>Age Restriction:</strong> {place.ageLimit}
            </p>
          </div>
        )}

        {place.games && (
          <div>
            <strong>Games Available:</strong> {place.games}
            <p>
              <strong>Game Pricing:</strong> {place.gamePricing}
            </p>
            <p>
              <strong>Age Limit:</strong> {place.ageLimit}
            </p>
          </div>
        )}

        {/* ✨ Other Info */}
        {place.otherInfo && (
          <div>
            <strong>Other Info:</strong>
            <p className="text-gray-700">{place.otherInfo}</p>
          </div>
        )}
      </div>
    </section>
  );
}
