import React from "react";
import "../styles/outletCard.css";

function OutletCard({ outlet, onClick }) {
  return (
    <div className="outlet-card" onClick={onClick}>
      <img src={outlet.thumbnail} alt={outlet.name} className="thumbnail" />
      <h3>{outlet.name}</h3>
      <p>Rating: {outlet.rating} ⭐</p>
      <p>Location: {outlet.location}</p>
      <p>Cuisine: {outlet.cuisine}</p>
    </div>
  );
}

export default OutletCard;
