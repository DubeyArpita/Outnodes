import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">OutNodes</Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {userRole === "node" && (
          <>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/user">Dashboard</Link></li>
          </>
        )}

        {userRole === "owner" && (
          <>
            <li><Link to="/owner">List Your Place</Link></li>
          </>
        )}

        {userRole === "admin" && (
          <>
            <li><Link to="/admin">Admin Panel</Link></li>
          </>
        )}

        {userRole ? (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
