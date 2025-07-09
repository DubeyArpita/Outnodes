import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SubmitPlace() {
  const { register, handleSubmit, control, watch } = useForm();
  const category = watch("category");
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);

  const onSubmit = async (data) => {
    try {
      const uploadedImageUrls = [];

      // Convert FileList to Array
      const imageFiles = Array.from(data.images);

      for (let file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_preset");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dho2su984/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();
        uploadedImageUrls.push(result.secure_url);
      }

      // Now combine everything into one payload:
      const payload = {
        ...data,
        images: uploadedImageUrls,
        location: {
          address: data.location,
          city: "Ghaziabad", // optional: make this user input later
        },
        contact: {
          phone: "Add optional phone field?",
          instagram: "",
          website: "",
        },
      };

      // 🔐 Attach your JWT token (from Redux or localStorage)
      console.log("🧪 Token before submit:", token);
      console.log("🔑 Auth Header:", `Bearer ${token}`);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      console.log("✅ Place submitted:", result);

      if (result.place?._id) {
        // 🧭 Redirect to the newly created place page
        navigate(`/places/${result.place._id}`);
      }

      // ✅ Optionally redirect to /place/:id or show a success message
    } catch (err) {
      console.error("❌ Failed to submit place:", err.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Submit a New Place
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name of the Place</label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. Cafe Nostalgia"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="Food Outlet">Food Outlet</option>
              <option value="Club & Nightlife">Club & Nightlife</option>
              <option value="Gaming & Entertainment">
                Gaming & Entertainment
              </option>
              <option value="Monuments & Nature">Monuments & Nature</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Images (Carousel)</label>
            <input
              {...register("images")}
              type="file"
              multiple
              accept="image/*"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              placeholder="Tell us about this place"
            />
          </div>

          {/* Pricing */}
          <div>
            <label className="block mb-1 font-medium">Pricing (if any)</label>
            <input
              {...register("pricing")}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. ₹200 per person"
            />
          </div>

          {/* Timings */}
          <div>
            <label className="block mb-1 font-medium">Timings</label>
            <input
              {...register("timing")}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. 10:00 AM - 10:00 PM"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              {...register("location")}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Address or landmark"
            />
          </div>

          {/* 💡 Conditional Fields by Category */}
          {category === "Food Outlet" && (
            <>
              <div>
                <label className="block mb-1 font-medium">Food Type</label>
                <input
                  {...register("foodType")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. Italian, Street Food"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Menu</label>
                <input
                  {...register("menu")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Upload URL or describe briefly"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price Range</label>
                <input
                  {...register("priceRange")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. ₹100 - ₹500"
                />
              </div>
            </>
          )}

          {category === "Club & Nightlife" && (
            <>
              <div>
                <label className="block mb-1 font-medium">Entry Price</label>
                <input
                  {...register("entryPrice")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. ₹1000"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Age Restriction
                </label>
                <input
                  {...register("ageRestriction")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. 21+"
                />
              </div>
            </>
          )}

          {category === "Gaming & Entertainment" && (
            <>
              <div>
                <label className="block mb-1 font-medium">
                  Games Available
                </label>
                <input
                  {...register("games")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. Bowling, VR, Arcade"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Game Pricing</label>
                <input
                  {...register("gamePricing")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. ₹50 per game"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Age Limit</label>
                <input
                  {...register("ageLimit")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. All Ages / 12+"
                />
              </div>
            </>
          )}

          {role === "admin" && category === "Monuments & Nature" && (
            <>
              <div>
                <label className="block mb-1 font-medium">
                  Best Time to Visit
                </label>
                <input
                  {...register("best_time")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. Evening, Weekend"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Amenities</label>
                <input
                  {...register("amenities")}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. Wifi, Parking, AC"
                />
              </div>
            </>
          )}

          {/* Other Info */}
          <div>
            <label className="block mb-1 font-medium">Other Info</label>
            <textarea
              {...register("otherInfo")}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
              placeholder="Any additional details?"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
          >
            Submit Place
          </button>
        </form>
      </div>
    </section>
  );
}
