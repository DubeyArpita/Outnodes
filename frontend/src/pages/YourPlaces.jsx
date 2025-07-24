import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Heart,
  Edit,
  Trash2,
  PlusCircle,
  AlertTriangle,
} from "lucide-react";
import { logoutUser } from "../store/userSlice"; // Adjust path if needed

// --- Delete Confirmation Modal Component ---
const DeleteConfirmationModal = ({
  isOpen,
  onCancel,
  onConfirm,
  placeName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <AlertTriangle
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Delete Place
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete "<strong>{placeName}</strong>"?
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const YourPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placeToDelete, setPlaceToDelete] = useState(null);

  const { token, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/places/mine`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 401) {
          console.error("Auth error, logging out.");
          dispatch(logoutUser());
          localStorage.clear();
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch places");

        const data = await res.json();
        setPlaces(data.places);
      } catch (err) {
        setError("⚠️ Couldn't load your places.");
        console.error("❌", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchPlaces();
    } else {
      setLoading(false);
    }
  }, [token, isLoggedIn, dispatch]);

  const handleDeleteClick = (place) => {
    setPlaceToDelete(place);
  };

  const confirmDelete = async () => {
    if (!placeToDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/places/${placeToDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setPlaces((prev) =>
        prev.filter((place) => place._id !== placeToDelete._id)
      );
      setPlaceToDelete(null); // Close modal
    } catch (err) {
      console.error("💥 Delete error:", err.message);
      setError("Failed to delete place. Please try again.");
      setPlaceToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <DeleteConfirmationModal
        isOpen={!!placeToDelete}
        onCancel={() => setPlaceToDelete(null)}
        onConfirm={confirmDelete}
        placeName={placeToDelete?.name}
      />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Places</h1>
              <p className="text-gray-500 mt-1">
                Manage all the places you've added to Outnodes.
              </p>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg">
              {error}
            </p>
          )}

          {!loading && places.length === 0 ? (
            <div className="text-center text-gray-500 py-20 px-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700">
                No places yet!
              </h3>
              <p className="mt-2">Ready to put your place on the map?</p>
              <Link
                to="/add-place"
                className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={20} />
                Add Your First Place
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <div
                  key={place._id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden"
                >
                  <Link to={`/places/${place._id}`}>
                    <img
                      src={
                        place.images?.[0] ||
                        "https://placehold.co/400x300/e2e8f0/4a5568?text=No+Image"
                      }
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">
                      {place.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-start items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Eye size={16} className="text-blue-400" />
                        <span>{place.viewsThisMonth || 0} Views</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Heart size={16} className="text-pink-400" />
                        <span>{place.favorites?.length || 0} Favorites</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/edit-place/${place._id}`}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Edit Place"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(place)}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-100 transition-colors"
                      title="Delete Place"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YourPlaces;
