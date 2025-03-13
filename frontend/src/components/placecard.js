import React from "react";

function PlaceCard({ name, category, image, location }) {
  return (
    <div className="card shadow-lg border-0 rounded">
      <img src={image} className="card-img-top rounded-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        <p className="card-text"><strong>Category:</strong> {category}</p>
        <p className="card-text"><strong>Location:</strong> {location}</p>
        <button className="btn btn-sm btn-primary w-100">View Details</button>
      </div>
    </div>
  );
}

export default PlaceCard;
