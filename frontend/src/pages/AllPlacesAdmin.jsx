import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllPlacesAdmin = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/unauthorized");
      return;
    }

    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/places/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setPlaces(Array.isArray(data.places) ? data.places : []);
      } catch (err) {
        console.error("❌ Fetch error:", err.message);
        setError("Could not load places.");
      }
    };

    fetchPlaces();
  }, [user, token, navigate]);

  const handleDelete = async (placeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/places/${placeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete");
      setPlaces((prev) => prev.filter((p) => p._id !== placeId));
    } catch (err) {
      console.error("❌ Delete error:", err.message);
      alert("Could not delete this place.");
    }
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        🛡️ Admin Dashboard — All Places
      </h1>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {places.length === 0 ? (
        <p className="text-center text-gray-500">No places found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
              onClick={() => navigate(`/places/${place._id}`)}
            >
              <img
                src={
                  Array.isArray(place.images) && place.images.length > 0
                    ? place.images[0]
                    : "https://via.placeholder.com/300"
                }
                alt={place.title || "Place image"}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold text-indigo-700">
                  {place.name || "Untitled"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {place.location?.address || "Unknown Address"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  🏷️ {place.category || "No category"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  👤 Added by: {place.addedBy || "Unknown"}
                </p>

                <button
                  onClick={() => handleDelete(place._id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPlacesAdmin;
