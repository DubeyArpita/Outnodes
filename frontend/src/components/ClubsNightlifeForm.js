import React, { useState } from "react";
import "../styles/form.css";

function ClubsNightlifeForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    entryFee: "",
    timings: "",
    contact: "",
    ageRestriction: "",
    musicType: "",
    specialFeatures: [],
    dressCode: "",
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
    console.log("Club/Nightlife Details Submitted:", formData);
  };

  return (
    <form className="form add-clubs" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name of Club/Bar" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="text" name="entryFee" placeholder="Entry Fee/Cover Charge (if any)" onChange={handleChange} />
      <input type="text" name="timings" placeholder="Timings (e.g., 7 PM - 3 AM)" onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required />
      <input type="text" name="ageRestriction" placeholder="Age Restrictions (if any)" onChange={handleChange} />
      <input type="text" name="musicType" placeholder="Music Type/Genre (e.g., EDM)" onChange={handleChange} />
      <textarea
        name="specialFeatures"
        placeholder="Special Features (e.g., Dance Floor)"
        onChange={handleChange}
      ></textarea>
      <input type="text" name="dressCode" placeholder="Dress Code (if applicable)" onChange={handleChange} />
      <label>
        Upload Images:
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
      </label>
      <button type="submit">Add Place</button>
    </form>
  );
}

export default ClubsNightlifeForm;
