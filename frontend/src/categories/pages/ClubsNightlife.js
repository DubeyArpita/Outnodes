import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

function ClubsNightlife() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/places")
      .then((res) => {
        const filtered = res.data.filter(
          (place) => place.category === "Nightlife"
        );
        setPlaces(filtered);
      })
      .catch((err) => console.error("Error fetching places:", err));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Clubs & Nightlife</h2>
      <Row>
        {places.map((place) => (
          <Col md={4} key={place.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={place.image} height="200px" />
              <Card.Body>
                <Card.Title>{place.name}</Card.Title>
                <Card.Text><b>Location:</b> {place.location}</Card.Text>
                <Card.Text><b>Rating:</b> ⭐ {place.rating}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ClubsNightlife;
