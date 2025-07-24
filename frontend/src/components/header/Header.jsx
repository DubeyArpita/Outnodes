import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/userSlice";
import Button from "../Button";
import Logo from "../../../public/favicon.ico";

export default function Header() {
  const { isLoggedIn, role, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const userProfilePic = user?.profilePic || "/default-avatar.jpg"; // fallback avatar

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="flex items-center gap-4 cursor-pointer">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1
          className="text-3xl font-bold text-blue-600 tracking-wide cursor-pointer hover:text-indigo-700 transition-colors"
          onClick={() => navigate("/")}
        >
          Outnodes
        </h1>
      </div>
      <nav className="flex gap-4 items-center">
        {isLoggedIn && role === "explorer" && (
          <>
            <Button label="Categories" to="/discover" variant="ghost" />
            <Button label="Favorites" to="/favorites" variant="ghost" />
          </>
        )}
        {isLoggedIn && role === "business" && (
          <>
            <Button label="Dashboard" to="/dashboard" variant="ghost" />
            <Button label="List a Place" to="/submit-place" variant="primary" />
            <Button label="Pricing & Plans" to="/pricing" variant="primary" />
          </>
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <Button
              label="All Places"
              to="/all-places-admin"
              variant="primary"
            />
            <Button label="List a Place" to="/submit-place" variant="primary" />
          </>
        )}

        {!isLoggedIn && (
          <>
            <Button label="Login" to="/login" variant="primary" />
            <Button label="Register" to="/register" variant="outline" />
          </>
        )}
        {isLoggedIn && (
          <div className="relative">
            <img
              src={userProfilePic}
              alt="Profile"
              onClick={() => setOpenDropdown(!openDropdown)}
              className="w-10 h-10 rounded-full border border-blue-500 cursor-pointer"
            />

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-700 border rounded-lg shadow-lg text-sm z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpenDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpenDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
