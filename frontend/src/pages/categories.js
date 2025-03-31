import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../styles/categories.css";

const categories = [
  {
    name: "Food Outlets",
    description: "Find the best restaurants and cafés around you.",
    route: "/FoodOutlets", // Route for Food Outlets
  },
  {
    name: "Monuments & Nature",
    description: "Explore peaceful parks and green spaces.",
    route: "/monuments-nature", // Route for Monuments & Nature
  },
  {
    name: "Clubs & Nightlife",
    description: "Discover exciting nightlife and party places.",
    route: "/clubs-nightlife", // Route for Clubs & Nightlife
  },
  {
    name: "Gaming & Entertainment",
    description: "Find gaming zones, arcades, and fun spots.",
    route: "/gaming-entertainment", // Route for Gaming & Entertainment
  },
];

function Categories() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleExploreClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Explore Categories</h1>
      <p className="categories-subtitle">Select a category to find places</p>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button
              className="btn"
              onClick={() => handleExploreClick(category.route)} // Navigate on click
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
