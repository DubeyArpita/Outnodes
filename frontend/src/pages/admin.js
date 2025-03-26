import React, { useState } from "react";
import "../styles/admin.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FoodOutletForm from "../components/FoodOutletForm";
import MonumentsNatureForm from "../components/MonumentsNatureForm";
import ClubsNightlifeForm from "../components/ClubsNightlifeForm";
import GamingEntertainmentForm from "../components/GamingEntertainmentForm";

const dummyUsers = [
  { id: 1, name: "John Doe", role: "Owner" },
  { id: 2, name: "Alice Smith", role: "User" }
];

const dummyPlaces = [
  { id: 1, name: "Sunset Café", category: "Food", location: "Uptown", owner: "John Doe" }
];

const dummyReviews = [
  { id: 1, place: "Sunset Café", user: "Alice Smith", content: "Great place!" }
];

function AdminPanel() {
  const [users, setUsers] = useState(dummyUsers);
  const [places, setPlaces] = useState(dummyPlaces);
  const [reviews, setReviews] = useState(dummyReviews);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Delete a User
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Delete a Place
  const handleDeletePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  // Delete a Review
  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  // Handle Modal Opening
  const handleOpenModal = () => {
    if (selectedCategory) {
      setShowModal(true);
    }
  };

  // Handle Modal Closing
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory("");
  };

  // Render the form based on selected category
  const renderForm = () => {
    switch (selectedCategory) {
      case "Food Outlets":
        return <FoodOutletForm />;
      case "Monuments & Nature":
        return <MonumentsNatureForm />;
      case "Clubs & Nightlife":
        return <ClubsNightlifeForm />;
      case "Gaming & Entertainment":
        return <GamingEntertainmentForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      {/* Manage Users */}
      <div className="card p-3 mb-4">
        <h5>Manage Users</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Places */}
      <div className="card p-3 mb-4">
        <h5>Manage Places</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {places.map(place => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.category}</td>
                <td>{place.location}</td>
                <td>{place.owner}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDeletePlace(place.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Reviews */}
      <div className="card p-3 mb-4">
        <h5>Manage Reviews</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Place</th>
              <th>User</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id}>
                <td>{review.place}</td>
                <td>{review.user}</td>
                <td>{review.content}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteReview(review.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Place Section */}
      <div className="add-place-section">
        <h5>Add New Place</h5>
        <select className="category-select" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food Outlets">Food Outlets</option>
          <option value="Monuments & Nature">Monuments & Nature</option>
          <option value="Clubs & Nightlife">Clubs & Nightlife</option>
          <option value="Gaming & Entertainment">Gaming & Entertainment</option>
        </select>
        <button className="btn-add-place" onClick={handleOpenModal}>Add Place</button>
      </div>

      {/* Modal for Adding Place */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add {selectedCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPanel;
