import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FoodOutletForm from "../components/FoodOutletForm";
import MonumentsNatureForm from "../components/MonumentsNatureForm";
import ClubsNightlifeForm from "../components/ClubsNightlifeForm";
import GamingEntertainmentForm from "../components/GamingEntertainmentForm";
import Chart from "chart.js/auto"; // Import Chart.js
import "../styles/owner.css";

const places = [
  { id: 1, name: "Cafe Mocha", category: "Food Outlets", location: "Downtown, City Center", rating: 4.5 },
  { id: 2, name: "Green Valley Park", category: "Monuments & Nature", location: "Uptown Area", rating: 4.8 },
];

function OwnerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [currentIndex, setCurrentIndex] = useState(0); // Track carousel index

  // Handle opening the modal with the selected category
  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedCategory("");
    setShowModal(false);
  };

  // Render the appropriate form based on the selected category
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

  // Handle Carousel Navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % places.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + places.length) % places.length);
  };

  // Initialize Analytics Graph
  useEffect(() => {
    const ctx = document.getElementById("analytics-graph").getContext("2d");
  
    // Destroy previous instance of Chart before creating a new one
    let existingChart = Chart.getChart("analytics-graph"); 
    if (existingChart) {
      existingChart.destroy();
    }
  
    const analyticsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Places", "Avg Rating", "Reviews"],
        datasets: [{
          label: "Owner Stats",
          data: [5, 4.3, 23], // Example data
          backgroundColor: ["#ff9800", "#8e44ad", "#e91e63"],
        }]
      }
    });
  
    // Cleanup function to destroy the chart when component unmounts
    return () => {
      analyticsChart.destroy();
    };
  }, []);
  

  return (
    <div className="owner-dashboard">
      <h1>Owner Dashboard</h1>

      {/* Add Place Section */}
      <div className="add-place-section">
        <h2>Add Your Place</h2>
        <div className="category-buttons">
          <Button variant="primary" onClick={() => handleOpenModal("Food Outlets")}>
            Add Food Outlet
          </Button>
          <Button variant="primary" onClick={() => handleOpenModal("Monuments & Nature")}>
            Add Monument/Nature Spot
          </Button>
          <Button variant="primary" onClick={() => handleOpenModal("Clubs & Nightlife")}>
            Add Club/Nightlife Spot
          </Button>
          <Button variant="primary" onClick={() => handleOpenModal("Gaming & Entertainment")}>
            Add Gaming/Entertainment Venue
          </Button>
        </div>
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

      {/* Places List - Sliding Carousel */}
      <div className="places-carousel">
        <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
        <div className="places-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {places.map((place, index) => (
            <div key={place.id} className="place-card">
              <h3>{place.name}</h3>
              <p><b>Category:</b> {place.category}</p>
              <p><b>Location:</b> {place.location}</p>
              <p><b>Rating:</b> {place.rating} ⭐</p>
              <div className="actions">
                <Button variant="success">Edit</Button>
                <Button variant="danger">Delete</Button>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn next" onClick={nextSlide}>❯</button>
      </div>

      {/* Analytics Section with Graph */}
      <div className="analytics-section">
        <h2>Analytics</h2>
        <canvas id="analytics-graph"></canvas>
      </div>
    </div>
  );
}

export default OwnerDashboard;
