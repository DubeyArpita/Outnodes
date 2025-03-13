import React from "react";
import "../styles/categories.css";
import food from "../assets/food.jpg";
import club from "../assets/club.jpg";
import monu from "../assets/monuments.jpg";
import ent from "../assets/entertainment.jpg";

const categories = [
  { name: "Food Outlets", description: "Find the best restaurants and cafés around you." },
  { name: "Monuments & Nature", description: "Explore peaceful parks and green spaces." },
  { name: "Clubs & Nightlife", description: "Discover exciting nightlife and party places." },
  { name: "Gaming & Entertainment", description: "Find gaming zones, arcades, and fun spots." }
];

function Categories() {
  return (
    <div className="categories-container">
      <h1 className="categories-title">Explore Categories</h1>
      <p className="categories-subtitle">Select a category to find places</p>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button className="btn">Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
