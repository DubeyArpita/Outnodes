import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.username,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (res.ok && result.user) {
        const userData = {
          id: result.user._id || result.user.id,
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
        };

        localStorage.setItem("token", result.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(
          loginUser({
            user: userData,
            role: userData.role,
            token: result.token,
          })
        );
        // dispatch(
        //   loginUser({
        //     role: result.user.role,
        //     user: {
        //       id: result.user._id || result.user.id, // handle both cases
        //       name: result.user.name || "Admin",
        //       email: result.user.email,
        //       role: result.user.role,
        //       profilePic: result.user.profilePic,
        //       businessPhone: result.user.businessPhone,
        //       location: result.user.location,
        //       businessDesc: result.user.businessDesc,
        //       idCard: result.user.idCard,
        //       phone: result.user.phone,
        //       interests: result.user.interests,
        //     },
        //     token: result.token,
        //   })
        // );

        if (result.user.role === "explorer") {
          setTimeout(() => navigate("/discover"), 0);
        } else if (result.user.role === "business") {
          setTimeout(() => navigate("/dashboard"), 0);
        } else if (result.user.role === "admin") {
          setTimeout(() => navigate("/all-places-admin"), 0);
        }
      } else {
        setLoginError(result.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setLoginError("Login failed — please try again later.");
    } finally {
      setLoading(false); // ✅ End loader
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
              type="email"
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
          {loginError && (
            <p className="text-sm text-red-600 bg-red-100 py-2 px-3 rounded-md">
              {loginError}
            </p>
          )}

          {/* Loader + Submit */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          {/* Submit
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Login
          </button> */}
        </form>
      </div>
    </section>
  );
}
