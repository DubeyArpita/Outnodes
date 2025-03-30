import React from "react";
import "../styles/user.css"; // Updated CSS
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const dummyFavoritedPlaces = [
  { name: "City Park", category: "Garden", location: "Downtown", image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" },
  { name: "Sunset Café", category: "Food", location: "Uptown", image: "https://source.unsplash.com/400x300/?restaurant" },
];

const dummyReviewedPlaces = [
  { name: "Blue Lagoon", review: "Amazing ambiance and great food!", category: "Restaurant", location: "Beachside", image: "https://source.unsplash.com/400x300/?beach" },
  { name: "Green Valley", review: "A peaceful place to relax.", category: "Park", location: "Countryside", image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" },
];

function UserDashboard() {
  const userProfile = {
    profilePic: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
    username: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    rating: 4.7,
    status: "Customer",
  };

  return (
    <Container className="user-dashboard">
      {/* User Profile Section */}
      <div className="user-profile">
        <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          <h2>{userProfile.username}</h2>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone}</p>
          <p>Rating: {userProfile.rating} ⭐</p>
          <p>Status: {userProfile.status}</p>
        </div>
      </div>

      {/* Favorited Places Section */}
      <div className="favorited-places">
        <h3>Favorited Places</h3>
        <Row>
          {dummyFavoritedPlaces.map((place, index) => (
            <Col md={6} key={index}>
              <Card>
                <Card.Img variant="top" src={place.image} />
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  <Card.Text><b>Category:</b> {place.category}</Card.Text>
                  <Card.Text><b>Location:</b> {place.location}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Reviewed Places Section */}
      <div className="reviewed-places">
        <br></br>
        <h3>Places Reviewed</h3>
        <ul className="review-list">
          {dummyReviewedPlaces.map((place, index) => (
            <li key={index}>
              <img src={place.image} alt={place.name} />
              <div className="review-details">
                <h4>{place.name}</h4>
                <p><b>Review:</b> "{place.review}"</p>
                <p><b>Category:</b> {place.category}</p>
                <p><b>Location:</b> {place.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <Button variant="primary">Send Feedback</Button>
        <Button variant="secondary">Customer Care</Button>
      </footer>
    </Container>
  );
}

export default UserDashboard;
