import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";
import { useSelector } from "react-redux";

export default function Signup() {
  const [userType, setUserType] = useState("explorer");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let profilePicUrl = "";
      let idCardUrl = "";

      // 1️⃣ Upload profilePic (Explorer only)
      if (userType === "explorer" && data.profilePic?.[0]) {
        const formData = new FormData();
        formData.append("file", data.profilePic[0]);
        formData.append("upload_preset", "unsigned_preset"); // replace!

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/dho2su984/image/upload", // replace!
          {
            method: "POST",
            body: formData,
          }
        );
        const uploaded = await cloudRes.json();
        profilePicUrl = uploaded.secure_url;
      }

      // 2️⃣ Upload idCard (Business only)
      if (userType === "business" && data.idCard?.[0]) {
        const formData = new FormData();
        formData.append("file", data.idCard[0]);
        formData.append("upload_preset", "unsigned_preset"); // replace!

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/dho2su984/image/upload", // replace!
          {
            method: "POST",
            body: formData,
          }
        );
        const uploaded = await cloudRes.json();
        idCardUrl = uploaded.secure_url;
      }

      // 3️⃣ Final payload
      const payload = {
        role: userType,
        name: data.name,
        email: data.email,
        password: data.password,

        // Explorer
        phone: data.phone || "",
        interests: data.interests || "",
        profilePic: profilePicUrl || "",

        // Business
        businessPhone: data.businessPhone || "",
        location: data.location || "",
        idCard: idCardUrl || "",
        businessDesc: data.businessDesc || "",
      };

      // 4️⃣ Send to backend
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        console.log("✅ Registered:", result);
        console.log("🔑 Token:", result.token);
        console.log("👤 User Info:", result.user);
        dispatch(
          loginUser({
            role: result.user.role,
            user: {
              id: result.user._id,
              name: result.user.name,
              email: result.user.email,
              role: result.user.role,
              profilePic: result.user.profilePic,
              businessPhone: result.user.businessPhone,
              location: result.user.location,
              businessDesc: result.user.businessDesc,
              idCard: result.user.idCard,
              phone: result.user.phone,
              interests: result.user.interests,
            },
            token: result.token,
          })
        );
        if (result.user.role === "explorer") {
          navigate("/discover");
        } else {
          navigate("/dashboard");
        }
        // Optional: show success toast or redirect
      } else {
        console.error("❌ Backend error:", result.msg);
      }
    } catch (err) {
      console.error("🔥 Something went wrong:", err.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Sign Up as {userType === "explorer" ? "Explorer" : "Business Owner"}
        </h2>

        {/* User type switch */}
        <div className="flex justify-center mb-6 gap-4">
          {["explorer", "business"].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                userType === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type === "explorer" ? "User" : "Business Owner"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Common Fields */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Name</label>
            <input
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
            />
            {errors.name && <p className="error">Name is required</p>}
          </div>

          <div className="mb-4">
            <label className="font-medium block mb-2">Email</label>
            <input
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
            />
            {errors.email && <p className="error">Email is required</p>}
          </div>

          <div className="mb-4">
            <label className="font-medium block mb-2">Confirm Email</label>
            <input
              placeholder="Enter your email again"
              {...register("confirmEmail", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
            />
            {errors.confirmEmail && (
              <p className="error">Please confirm your email</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium block mb-2">Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
            />
            {errors.password && <p className="error">Password is required</p>}
          </div>

          {/* Conditional Fields: Explorer */}
          {userType === "explorer" && (
            <>
              <div className="mb-4">
                <label className="font-medium block mb-2">Phone Number</label>
                <input
                  placeholder="Enter your phone number"
                  {...register("phone")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
                />
              </div>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Interests (optional)
                </label>
                <input
                  placeholder="Enter your interests"
                  {...register("interests")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
                />
              </div>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Profile Picture (optional)
                </label>
                <input
                  placeholder="Upload your profile picture"
                  type="file"
                  accept="image/*"
                  {...register("profilePic")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700"
                />
              </div>
            </>
          )}

          {/* Conditional Fields: Business Owner */}
          {userType === "business" && (
            <>
              <div className="mb-4">
                <label className="font-medium block mb-2">Business Phone</label>
                <input
                  placeholder="Enter your business phone"
                  {...register("businessPhone", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
                />
              </div>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Business Location
                </label>
                <input
                  placeholder="Enter your business location"
                  {...register("location", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
                />
              </div>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Identity Card (upload)
                </label>
                <input
                  placeholder="Upload your ID card"
                  type="file"
                  accept="image/*,.pdf"
                  {...register("idCard", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700"
                />
              </div>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Business Description
                </label>
                <textarea
                  placeholder="Enter your business description"
                  {...register("businessDesc")}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-800"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
