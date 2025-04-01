import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function FeedbackModal({ show, handleClose }) {
  const [feedback, setFeedback] = useState({
    experience: "",
    usability: "",
    improvement: "",
    additionalComments: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", feedback);
    alert("Thank you for your feedback!"); // Temporary alert
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Give Your Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>How was your overall experience?</Form.Label>
            <Form.Select name="experience" onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Was the website easy to use?</Form.Label>
            <Form.Select name="usability" onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="Very Easy">Very Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>What would you like to see improved?</Form.Label>
            <Form.Control type="text" name="improvement" placeholder="Type here..." onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Any additional comments?</Form.Label>
            <Form.Control as="textarea" name="additionalComments" rows={3} placeholder="Share your thoughts..." onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">Submit Feedback</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FeedbackModal;
