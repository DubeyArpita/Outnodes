import React from "react";

function SortingOptions() {
  return (
    <select className="sorting-options">
      <option value="price">Sort by Pricing</option>
      <option value="rating">Sort by Rating</option>
      <option value="popularity">Sort by Popularity</option>
    </select>
  );
}

export default SortingOptions;
