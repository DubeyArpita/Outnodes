import React from "react";

function CategorySelector({ setSelectedCategory }) {
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <select onChange={handleChange} className="category-selector">
      <option value="">Select Category</option>
      <option value="Food Outlets">Food Outlets</option>
      <option value="Monuments & Nature">Monuments & Nature</option>
      <option value="Clubs & Nightlife">Clubs & Nightlife</option>
      <option value="Gaming & Entertainment">Gaming & Entertainment</option>
    </select>
  );
}

export default CategorySelector;
