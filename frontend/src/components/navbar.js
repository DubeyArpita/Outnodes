import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">🚀 Outnodes</Link>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/owner">List Your Place</Link></li>
        <li><Link to="/user">User Dashboard</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>

      {/* Login & Signup Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up →</Link>
      </div>
    </nav>
  );
}

export default Navbar;
