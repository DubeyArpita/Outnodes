import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.username, // assuming your backend uses "email"
            password: data.password,
            isLoggedIn: true, // optional, depending on your backend
          }),
        }
      );

      const result = await res.json();

      if (res.ok && result.user) {
        console.log("✅ Login success:", result);

        dispatch(
          loginUser({
            role: result.user.role,
            user: {
              id: result.user._id || result.user.id, // handle both cases
              name: result.user.name || "Admin",
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

        console.log("🔐 User logged in:", result.user.role);

        if (result.user.role === "explorer") {
          setTimeout(() => navigate("/discover"), 0);
        } else if (result.user.role === "business") {
          setTimeout(() => navigate("/dashboard"), 0);
        } else if (result.user.role === "admin") {
          setTimeout(() => navigate("/all-places-admin"), 0);
        } else {
          console.error("❌ Unknown role:", result.user.role);
        }
      } else {
        console.error("❌ Login failed:", result.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔥 Login error:", err.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login to Outnodes
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
              placeholder="e.g. arpita_dev"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
