import React, { useState } from "react";
import "../styles/monuments.css";

const monuments = [
  {
    name: "India Gate",
    rating: 4.5,
    location: "New Delhi",
    pricing: "₹₹",
    thumbnail: "/assets/spicehub.jpg",
    timings: "10 AM - 11 PM",
    contact: "+91 98765 43210",
    reviews: ["Great food!", "Awesome ambiance."]
  },
  {
    name: "Qutub Minar",
    rating: 4.7,
    location: "Cyber Hub, Gurgaon",
    pricing: "₹₹₹",
    thumbnail: "/assets/sushicentral.jpg",
    timings: "12 PM - 11 PM",
    contact: "+91 99887 65432",
    reviews: ["Best sushi in town!", "A must-visit for Japanese food lovers."]
  }
];

function Monuments() {
  const [search, setSearch] = useState("");

  return (
    <div className="food-outlets-container">
      <h1 className="section-title">Monuments</h1>
      <input
        type="text"
        placeholder="Search by name, location, or cuisine..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="outlets-list">
        {monuments
          .filter((monuments) =>
            monuments.name.toLowerCase().includes(search) ||
            monuments.location.toLowerCase().includes(search) ||
            monuments.cuisine.toLowerCase().includes(search)
          )
          .map((monuments, index) => (
            <div key={index} className="outlet-card">
              <img src={monuments.thumbnail} alt={monuments.name} className="outlet-thumbnail" />
              <div className="outlet-details">
                <h3>{monuments.name}</h3>
                <p><strong>Rating:</strong> {monuments.rating} ⭐</p>
                <p><strong>Location:</strong> {monuments.location}</p>
                <p><strong>Timings:</strong> {monuments.timings}</p>
                <p><strong>Contact:</strong> {monuments.contact}</p>
                <p><strong>Reviews:</strong> {monuments.reviews.join(" | ")}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Monuments;
