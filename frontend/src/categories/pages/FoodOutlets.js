import React, { useState } from "react";
import "../styles/foodOutlets.css";

const foodOutlets = [
  {
    name: "Spice Hub",
    rating: 4.5,
    location: "Connaught Place, Delhi",
    cuisine: "Indian, Mughlai",
    pricing: "₹₹",
    thumbnail: "/assets/spicehub.jpg",
    timings: "10 AM - 11 PM",
    contact: "+91 98765 43210",
    menu: "/assets/menu_spicehub.pdf",
    reviews: ["Great food!", "Awesome ambiance."]
  },
  {
    name: "Sushi Central",
    rating: 4.7,
    location: "Cyber Hub, Gurgaon",
    cuisine: "Japanese, Sushi",
    pricing: "₹₹₹",
    thumbnail: "/assets/sushicentral.jpg",
    timings: "12 PM - 11 PM",
    contact: "+91 99887 65432",
    menu: "/assets/menu_sushicentral.pdf",
    reviews: ["Best sushi in town!", "A must-visit for Japanese food lovers."]
  }
];

function FoodOutlets() {
  const [search, setSearch] = useState("");

  return (
    <div className="food-outlets-container">
      <h1 className="section-title">Food Outlets</h1>
      <input
        type="text"
        placeholder="Search by name, location, or cuisine..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="outlets-list">
        {foodOutlets
          .filter((outlet) =>
            outlet.name.toLowerCase().includes(search) ||
            outlet.location.toLowerCase().includes(search) ||
            outlet.cuisine.toLowerCase().includes(search)
          )
          .map((outlet, index) => (
            <div key={index} className="outlet-card">
              <img src={outlet.thumbnail} alt={outlet.name} className="outlet-thumbnail" />
              <div className="outlet-details">
                <h3>{outlet.name}</h3>
                <p><strong>Rating:</strong> {outlet.rating} ⭐</p>
                <p><strong>Location:</strong> {outlet.location}</p>
                <p><strong>Cuisine:</strong> {outlet.cuisine}</p>
                <p><strong>Timings:</strong> {outlet.timings}</p>
                <p><strong>Contact:</strong> {outlet.contact}</p>
                <a href={outlet.menu} target="_blank" rel="noopener noreferrer" className="menu-link">View Menu</a>
                <p><strong>Reviews:</strong> {outlet.reviews.join(" | ")}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FoodOutlets;
