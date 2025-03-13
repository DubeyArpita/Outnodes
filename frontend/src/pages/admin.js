import React, { useState } from "react";

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

    </div>
  );
}

export default AdminPanel;
