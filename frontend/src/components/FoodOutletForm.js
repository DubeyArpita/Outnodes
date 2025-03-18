import React, { useState } from "react";
import "../styles/form.css";

function FoodOutletForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    cuisine: "",
    timings: "",
    contact: "",
    veg: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: imageUrls });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Food Outlet Details Submitted:", formData);
    // Add API call to save place details in the database
  };

  return (
    <form className="form add-food-outlets" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Place Name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="text" name="cuisine" placeholder="Cuisine Type" onChange={handleChange} required />
      <input type="text" name="timings" placeholder="Timings (e.g., 9 AM - 11 PM)" onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
      
      {/* Veg/Non-Veg Selector */}
      <label>
        Veg/Non-Veg:
        <select name="veg" onChange={handleChange}>
          <option value={false}>Non-Veg</option>
          <option value={true}>Veg</option>
        </select>
      </label>

      {/* Image Upload */}
      <label>
        Upload Images:
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
      </label>

      {/* Image Preview */}
      {formData.images.length > 0 && (
        <div className="image-preview">
          {formData.images.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index + 1}`} />
          ))}
        </div>
      )}

      <button type="submit">Add Place</button>
    </form>
  );
}

export default FoodOutletForm;
