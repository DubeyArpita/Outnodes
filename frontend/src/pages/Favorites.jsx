import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, LogIn } from "lucide-react"; // Using lucide-react for consistency
import { logoutUser } from "../store/userSlice"; // Make sure path is correct

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.user);

  // --- Fetch favorites from the backend ---
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assume an endpoint that returns the user's favorited places
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/auth/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          console.error("Authorization failed. Logging out.");
          localStorage.clear();
          dispatch(logoutUser());
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch favorites.");
        }

        const data = await res.json();
        // Assuming the API returns { success: true, favorites: [...] }
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("❌ Failed to fetch favorites:", err.message);
        setError("Could not load your favorites right now.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchFavorites();
    } else {
      setLoading(false); // Don't show loader if not logged in
    }
  }, [isLoggedIn, token, dispatch]);

  // --- Handle removing a favorite ---
  const handleRemoveFavorite = async (placeId) => {
    // Optimistic UI update: remove from state immediately
    const originalFavorites = [...favorites];
    setFavorites((prev) => prev.filter((place) => place._id !== placeId));

    try {
      // Assume an endpoint to unfavorite a place
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/places/${placeId}/favorite`,
        {
          method: "DELETE", // Or POST with { favorited: false }
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        // If the API call fails, revert the change
        setFavorites(originalFavorites);
        console.error("Failed to update favorite status on the server.");
      }
    } catch (err) {
      // Revert on network error
      setFavorites(originalFavorites);
      console.error("Network error when removing favorite:", err);
    }
  };

  const filtered =
    filter === "all"
      ? favorites
      : favorites.filter((f) => f.category.toLowerCase() === filter);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // --- Not Logged In State ---
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            See Your Favorites
          </h2>
          <p className="text-gray-600 mt-2 mb-6">
            Log in to view the places you've saved.
          </p>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <LogIn size={16} />
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your Favorites
        </h1>
        <p className="text-gray-500 mb-8">The places you've saved and loved.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            "all",
            "food outlet",
            "club & nightlife",
            "gaming & entertainment",
            "monuments & nature",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === cat.toLowerCase()
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* No favorites fallback */}
        {!error && filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg font-semibold">
              No favorites yet in this category.
            </p>
            <p className="mt-1">
              Explore and save some places to see them here ❤️
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered
              .sort((a, b) => new Date(b.favoritedAt) - new Date(a.favoritedAt)) // Assuming a `favoritedAt` field
              .map((place) => (
                <div
                  key={place._id} // Use MongoDB _id
                  className="bg-white rounded-xl shadow-sm group relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <button
                    onClick={() => handleRemoveFavorite(place._id)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-pink-500 z-10 transition-transform hover:scale-110"
                    title="Remove from favorites"
                  >
                    <Heart size={20} className="fill-current" />
                  </button>

                  <Link to={`/places/${place._id}`}>
                    <img
                      src={
                        place.images?.[0] ||
                        "https://placehold.co/400x300/e2e8f0/4a5568?text=No+Image"
                      }
                      alt={place.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {place.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {place.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        📍 {place.location?.address || "N/A"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
