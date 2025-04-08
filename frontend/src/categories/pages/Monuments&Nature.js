import React, { useState } from "react";
import "../styles/monuments.css";

const monuments = [
  {
    name: "India Gate",
    location: "New Delhi",
    pricing: "₹₹",
    thumbnail: "/assets/india gate.jpeg",
    timings: "10 AM - 11 PM",
    contact: "+91 98765 43210",
    reviews: ["Great food!", "Awesome ambiance."]
  },
  {
    name: "Qutub Minar",
    location: "Delhi",
    pricing: "₹₹₹",
    thumbnail: "/assets/sushicentral.jpg",
    timings: "12 PM - 11 PM",
    contact: "+91 99887 65432",
    reviews: ["Best sushi in town!", "A must-visit for Japanese food lovers."]
  },
  {
    name: "Lotus Temple",
    location: "Delhi",
    pricing: "₹₹₹",
    thumbnail: "/assets/sushicentral.jpg",
    timings: "12 PM - 11 PM",
    contact: "+91 99887 65432",
    reviews: ["Best sushi in town!", "A must-visit for Japanese food lovers."]
  }
];

const green = [
  {
    name: "Lodhi Garden",
    location: "New Delhi",
    pricing: "₹₹",
    thumbnail: "/assets/india gate.jpeg",
    timings: "10 AM - 11 PM",
    contact: "+91 98765 43210",
    reviews: ["Great food!", "Awesome ambiance."]
  },
  {
    name: "Sanjay Van",
    location: "Hauz Khas, Delhi",
    pricing: "₹₹₹",
    thumbnail: "/assets/sushicentral.jpg",
    timings: "12 PM - 11 PM",
    contact: "+91 99887 65432",
    reviews: ["Best sushi in town!", "A must-visit for Japanese food lovers."]
  },
  {
    name: "Central Park",
    location: "Connaught Place, Delhi",
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
    <div className="page">
      <div className="monument-container">
      <h1 className="section-title">Monuments & Heritage</h1>
      <input
        type="text"
        placeholder="Search by name or location..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="monuments-grid">
        {monuments
          .filter((monument) =>
            monument.name.toLowerCase().includes(search) ||
            monument.location.toLowerCase().includes(search) ||
            monument.cuisine.toLowerCase().includes(search)
          )
          .map((monument, index) => (
            <div key={index} className="monument-card">
              <img src={monument.thumbnail} alt={monument.name} className="monument-thumbnail" />
              <div className="monument-details">
                <div className="monument-header">
                  <div className="monument-name">
                    <h2 id="name">{monument.name}</h2> 
                  </div>
                </div>
                <div className="monument-header">
                  <div className="monument-cuisine">
                    {monument.cuisine}
                  </div>
                </div>
                <div className="monument-header">
                  <div className="monument-location">
                    {monument.location}
                  </div>
                </div>
                {/* <a href={monument.menu} target="_blank" rel="noopener noreferrer" className="menu-link">View Menu</a> */}
              </div>
            </div>
          ))}
      </div>
      </div>
      <div className="monument-container">
      <h1 className="section-title">Green Spaces</h1>
      <input
        type="text"
        placeholder="Search by name or location..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="monuments-grid">
        {green
          .filter((monument) =>
            monument.name.toLowerCase().includes(search) ||
            monument.location.toLowerCase().includes(search) ||
            monument.cuisine.toLowerCase().includes(search)
          )
          .map((monument, index) => (
            <div key={index} className="monument-card">
              <img src={monument.thumbnail} alt={monument.name} className="monument-thumbnail" />
              <div className="monument-details">
                <div className="monument-header">
                  <div className="monument-name">
                    <h2 id="name">{monument.name}</h2> 
                  </div>
                </div>
                <div className="monument-header">
                  <div className="monument-cuisine">
                    {monument.cuisine}
                  </div>
                </div>
                <div className="monument-header">
                  <div className="monument-location">
                    {monument.location}
                  </div>
                </div>
                {/* <a href={monument.menu} target="_blank" rel="noopener noreferrer" className="menu-link">View Menu</a> */}
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
    
  );
}

export default Monuments;
