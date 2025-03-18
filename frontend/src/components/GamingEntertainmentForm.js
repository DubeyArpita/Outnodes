import React, { useState } from "react";
import "../styles/form.css";

function GamingEntertainmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    entryFee: "",
    timings: "",
    contact: "",
    gamesActivities: [],
    ageRestriction: "",
    facilitiesAvailable: [],
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
    console.log("Gaming/Entertainment Details Submitted:", formData);
    // Add API call to save place details in the database
  };

  return (
    <form className="form add-gaming" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name of Venue/Game Zone"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description of Venue/Game Zone"
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="text"
        name="location"
        placeholder="Location Address"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="entryFee"
        placeholder="Entry Fee/Ticket Price (if any)"
        onChange={handleChange}
      />
      <input
        type="text"
        name="timings"
        placeholder="Timings (e.g., 10 AM - 10 PM)"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number for Inquiries"
        onChange={handleChange}
        required
      />
      <textarea
        name="gamesActivities"
        placeholder='Available Games/Activities (e.g., "Bowling", "VR Games")'
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="ageRestriction"
        placeholder="Age Restrictions (if any)"
        onChange={handleChange}
      />
      <textarea
        name="facilitiesAvailable"
        placeholder='Facilities Available (e.g., "Parking", "Food Court")'
        onChange={handleChange}
      ></textarea>
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

export default GamingEntertainmentForm;
