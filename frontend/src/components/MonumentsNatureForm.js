import React, { useState } from "react";
import "../styles/form.css";

function MonumentsNatureForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    entryFee: "",
    timings: "",
    contact: "",
    bestSeason: "",
    facilities: [],
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
    console.log("Monument/Nature Spot Details Submitted:", formData);
  };

  return (
    <form className="form add-monuments" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="text" name="entryFee" placeholder="Entry Fee (if any)" onChange={handleChange} />
      <input type="text" name="timings" placeholder="Timings (e.g., 9 AM - 5 PM)" onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
      <input type="text" name="bestSeason" placeholder="Best Season to Visit" onChange={handleChange} />
      <textarea
        name="facilities"
        placeholder="Facilities Available (e.g., Parking, Restrooms)"
        onChange={handleChange}
      ></textarea>
      <label>
        Upload Images:
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
      </label>
      <button type="submit">Add Place</button>
    </form>
  );
}

export default MonumentsNatureForm;
