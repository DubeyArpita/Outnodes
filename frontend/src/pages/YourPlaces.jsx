import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const YourPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/places/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPlaces(data.places);
      } catch (err) {
        setError("⚠️ Couldn't load your places.");
        console.error("❌", err.message);
      }
    };

    fetchPlaces();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/places/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setPlaces((prev) => prev.filter((place) => place._id !== id));
    } catch (err) {
      console.error("💥 Delete error:", err.message);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">
        🧭 Your Places
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {places.length === 0 ? (
        <p className="text-center text-gray-500">No places added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {places.map((place) => (
            <div
              key={place._id}
              className="group bg-white border rounded-xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer relative"
              onClick={() => navigate(`/places/${place._id}`)}
            >
              <h3 className="text-xl font-semibold text-slate-700 group-hover:text-indigo-600">
                {place.title}
              </h3>
              <p className="text-gray-600 mt-2">{place.description}</p>

              <div
                className="absolute bottom-4 right-4 flex gap-3"
                onClick={(e) => e.stopPropagation()} // prevent card navigation
              >
                <Link
                  to={`/edit-place/${place._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(place._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPlaces;
