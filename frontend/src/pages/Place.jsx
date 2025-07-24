import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice"; // Make sure this path is correct

// For icons, you'll need to install lucide-react: npm install lucide-react
import {
  Star,
  Heart,
  MapPin,
  Clock,
  DollarSign,
  Send,
  LogIn,
  Trash2,
  Utensils,
  Music,
  Gamepad2,
  Mountain,
  Phone,
  Info,
  Award,
  Calendar,
} from "lucide-react";

// --- Star Rating Component ---
const StarRating = ({ rating, setRating, interactive = true }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= (hoverRating || rating);
    stars.push(
      <Star
        key={i}
        size={interactive ? 24 : 16}
        className={`cursor-pointer transition-colors ${
          isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
        onMouseEnter={interactive ? () => setHoverRating(i) : null}
        onMouseLeave={interactive ? () => setHoverRating(0) : null}
        onClick={interactive ? () => setRating(i) : null}
      />
    );
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

export default function PlacePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // Get auth status from Redux
  const { token, user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/places/${id}`,
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
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        setPlace(data.place);

        // Check if the current user has favorited this place
        // Assumes `data.place.favorites` is an array of user IDs
        if (user && data.place.favorites?.includes(user.id)) {
          setIsFavorited(true);
        }
      } catch (err) {
        console.error("❌ Failed to fetch place:", err.message);
        setError("Couldn't load the requested place.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && id) {
      fetchPlace();
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn, token, dispatch, user]);

  const handleToggleFavorite = async () => {
    const originalIsFavorited = isFavorited;
    setIsFavorited(!originalIsFavorited); // Optimistic update

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/places/${id}/favorite`,
        {
          method: isFavorited ? "DELETE" : "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        setIsFavorited(originalIsFavorited); // Revert on failure
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      setIsFavorited(originalIsFavorited); // Revert on failure
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewRating === 0 || reviewComment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }
    setReviewSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/places/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: reviewRating,
            comment: reviewComment,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to submit review.");
      }

      const data = await res.json();
      // Update state with the new list of reviews from the server
      setPlace((prev) => ({
        ...prev,
        reviews: data.reviews,
        rating: data.rating,
      }));

      // Reset form
      setReviewRating(0);
      setReviewComment("");
    } catch (error) {
      console.error("Review submission error:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/places/${id}/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to delete review.");

      // Optimistically remove the review from the UI
      setPlace((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (error) {
      console.error("Delete review error:", error.message);
      alert("Could not delete the review. Please try again.");
    }
  };

  // --- NEW: Check if the logged-in user is the owner of the place ---
  const isOwner = place && user && place.addedBy === user.id;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Authentication Required
          </h2>
          <p className="text-gray-600 mt-2 mb-6">
            Please log in to view details about this place.
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

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 bg-red-50 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!place) {
    return (
      <div className="p-10 text-center min-h-screen flex items-center justify-center">
        Place not found.
      </div>
    );
  }

  const placeImages =
    place.images?.length > 0
      ? place.images
      : ["https://placehold.co/800x600/e2e8f0/4a5568?text=Image+Not+Available"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={placeImages[activeImage]}
                alt={`${place.name} main view`}
                className="w-full h-96 object-cover"
              />
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {placeImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-4 transition-all ${
                      activeImage === idx
                        ? "border-blue-500"
                        : "border-transparent hover:border-blue-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Name, Actions, and Review Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h1 className="text-3xl font-bold text-gray-800">{place.name}</h1>
              {/* --- NEW: FEATURED BADGE --- */}
              {place.featured && (
                <div className="flex-shrink-0 ml-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    <Award size={16} className="mr-1.5" /> Featured
                  </span>
                </div>
              )}
              <p className="text-md text-gray-500 mt-1">{place.category}</p>
              <div className="flex items-center mt-3">
                <StarRating rating={place.rating || 0} interactive={false} />
                <span className="text-gray-600 ml-2 text-sm">
                  ({place.reviews?.length || 0} reviews)
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                {isOwner ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm bg-pink-100 text-pink-700">
                    <Heart size={16} />
                    <span>{place.favorites?.length || 0} Favorites</span>
                  </div>
                ) : (
                  <button
                    onClick={handleToggleFavorite}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
                      isFavorited
                        ? "bg-pink-500 text-white hover:bg-pink-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <Heart
                      size={16}
                      className={isFavorited ? "fill-white" : ""}
                    />
                    {isFavorited ? "Favorited" : "Add to Favorites"}
                  </button>
                )}
              </div>
            </div>

            {!isOwner && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Leave a Review
                </h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Rating
                    </label>
                    <StarRating
                      rating={reviewRating}
                      setRating={setReviewRating}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Comment
                    </label>
                    <textarea
                      id="comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Share your experience..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                  >
                    <Send size={16} />
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* --- DETAILS SECTION (BELOW) --- */}
        <div className="mt-12 bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
            Place Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Description */}
            <div className="md:col-span-2">
              <p className="text-gray-700 leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* --- UPDATED: Core Details --- */}
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p className="text-sm text-gray-600">
                  {place.location?.address || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-700">Hours</h3>
                <p className="text-sm text-gray-600">{place.timing || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <DollarSign
                size={20}
                className="text-blue-500 flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-semibold text-gray-700">Pricing</h3>
                <p className="text-sm text-gray-600">
                  {place.priceRange || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-700">Contact</h3>
                <p className="text-sm text-gray-600">
                  {place.contact?.phone || "N/A"}
                </p>
              </div>
            </div>

            {/* --- UPDATED: Category Specifics --- */}
            {place.category === "Food Outlet" && (
              <>
                <div className="flex items-start gap-4">
                  <Utensils
                    size={20}
                    className="text-green-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Cuisine</h3>
                    <p className="text-sm text-gray-600">
                      {place.foodType || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Utensils
                    size={20}
                    className="text-green-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Menu</h3>
                    {place.menu && place.menu.startsWith("http") ? (
                      <a
                        href={place.menu}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline font-medium"
                      >
                        View Online Menu
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">
                        {place.menu || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {place.category === "Club & Nightlife" && (
              <>
                <div className="flex items-start gap-4">
                  <Music
                    size={20}
                    className="text-purple-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Entry</h3>
                    <p className="text-sm text-gray-600">
                      {place.entryPrice || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Music
                    size={20}
                    className="text-purple-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Age Limit</h3>
                    <p className="text-sm text-gray-600">
                      {place.ageLimit || "N/A"}
                    </p>
                  </div>
                </div>
              </>
            )}
            {place.category === "Gaming & Entertainment" && (
              <>
                <div className="flex items-start gap-4">
                  <Gamepad2
                    size={20}
                    className="text-red-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Games</h3>
                    <p className="text-sm text-gray-600">
                      {place.games || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Gamepad2
                    size={20}
                    className="text-red-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Game Pricing
                    </h3>
                    <p className="text-sm text-gray-600">
                      {place.gamePricing || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Gamepad2
                    size={20}
                    className="text-red-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Age Limit</h3>
                    <p className="text-sm text-gray-600">
                      {place.ageLimit || "N/A"}
                    </p>
                  </div>
                </div>
              </>
            )}
            {place.category === "Monuments & Nature" && (
              <>
                <div className="flex items-start gap-4">
                  <Mountain
                    size={20}
                    className="text-teal-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Entry Fee</h3>
                    <p className="text-sm text-gray-600">
                      {place.entryPrice || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mountain
                    size={20}
                    className="text-teal-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Best Time to Visit
                    </h3>
                    <p className="text-sm text-gray-600">
                      {place.best_time || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mountain
                    size={20}
                    className="text-teal-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-700">Amenities</h3>
                    <p className="text-sm text-gray-600">
                      {place.amenities?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* --- NEW: Other Info and Created At --- */}
            {place.otherInfo && (
              <div className="md:col-span-2 flex items-start gap-4 pt-6 border-t">
                <Info size={20} className="text-gray-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Additional Information
                  </h3>
                  <p className="text-sm text-gray-600">{place.otherInfo}</p>
                </div>
              </div>
            )}
            <div className="md:col-span-2 flex items-start gap-4 pt-6 border-t">
              <Calendar
                size={20}
                className="text-gray-500 flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-semibold text-gray-700">Listed On</h3>
                <p className="text-sm text-gray-600">
                  {new Date(place.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            What People Are Saying
          </h2>
          <div className="space-y-6">
            {place.reviews && place.reviews.length > 0 ? (
              place.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-5 rounded-xl shadow-md flex gap-4"
                >
                  <img
                    src={
                      review.user?.profilePic ||
                      `https://i.pravatar.cc/48?u=${review.user?._id}`
                    }
                    alt={review.user?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        {review.user?.name || "Anonymous"}
                      </h3>
                      <div className="flex items-center gap-4">
                        <StarRating
                          rating={review.rating}
                          interactive={false}
                        />
                        {user && user.id === review.user?._id && (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Delete my review"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
