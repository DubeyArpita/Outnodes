import React from "react";

function OutletDetails({ outlet }) {
  return (
    <div className="outlet-details">
      {/* Slideshow */}
      <div className="slideshow">
        {[1, 2, 3].map((_, idx) => (
          <img key={idx} src={`https://via.placeholder.com/300`} alt={`Slide ${idx + 1}`} />
        ))}
      </div>

      {/* Details */}
      <h2>{outlet.name}</h2>
      <p>Location: {outlet.location}</p>
      <p>Timings: {outlet.timings || "9 AM - 11 PM"}</p>
      <p>Contact: {outlet.contact || "+1234567890"}</p>

      {/* Menu */}
      <h3>Menu</h3>
      {/* Replace with dynamic menu */}
      {[{ name: "Pasta", price: "$12" }, { name: "Burger", price: "$8" }].map((item, idx) => (
        <p key={idx}>{item.name} - {item.price}</p>
      ))}

      {/* Reviews */}
      <h3>Reviews</h3>
      {[{ user: "John", comment: "Great place!" }].map((review, idx) => (
        <p key={idx}><strong>{review.user}:</strong> {review.comment}</p>
      ))}
    </div>
  );
}

export default OutletDetails;
