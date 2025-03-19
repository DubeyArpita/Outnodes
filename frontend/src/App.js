import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Categories from "./pages/categories";
import UserDashboard from "./pages/user";
import OwnerDashboard from "./pages/owner";
import AdminPanel from "./pages/admin";
import FoodOutlets from "./categories/pages/FoodOutlets"; // Import Food Outlets Page

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if the current page is Home

  return (
    <>
      {/* Show Navbar on all pages EXCEPT Home */}
      {!isHomePage && <Navbar />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/food-outlets" element={<FoodOutlets />} /> {/* Add Food Outlets Route */}
      </Routes>
    </>
  );
}

export default App;
