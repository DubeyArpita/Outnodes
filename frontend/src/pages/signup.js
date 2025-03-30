import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/signup.css";

function Signup() {
  const [showNodeForm, setShowNodeForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Handlers for opening/closing modals
  const handleNodeFormOpen = () => setShowNodeForm(true);
  const handleNodeFormClose = () => setShowNodeForm(false);
  const handlePartnerFormOpen = () => setShowPartnerForm(true);
  const handlePartnerFormClose = () => setShowPartnerForm(false);

  // Handle Profile Picture Upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="signup-page container mt-5">
      <h1 className="text-center mb-4">Join Outnodes</h1>
      <p className="text-center mb-5">Become part of our community or partner with us to grow your business.</p>

      <div className="row">
        {/* Signup as Node */}
        <div className="col-md-6 mb-4">
          <div className="card signup-card">
            <div className="card-body text-center">
              <h3>Signup as a Node</h3>
              <p>At Outnodes, every customer is a node connecting with people and exploring places.</p>
              <Button variant="primary" onClick={handleNodeFormOpen}>
                Signup as Node
              </Button>
            </div>
          </div>
        </div>

        {/* Partner with Us */}
        <div className="col-md-6 mb-4">
          <div className="card signup-card">
            <div className="card-body text-center">
              <h3>Partner with Us</h3>
              <p>Register your place on our app and connect with thousands of customers.</p>
              <Button variant="success" onClick={handlePartnerFormOpen}>
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Node Signup Form */}
      <Modal show={showNodeForm} onHide={handleNodeFormClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup as a Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Profile Picture Upload */}
            <div className="profile-pic-container">
              <div className="profile-pic-preview">{profilePic ? <img src={profilePic} alt="Profile" width="100" height="100" style={{ borderRadius: '50%' }} /> : "Upload Profile Pic"}</div>
              <Form.Control type="file" onChange={handleProfilePicChange} accept="image/*" />
            </div>

            <Form.Group controlId="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="nodeEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="nodePhone" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" required />
            </Form.Group>

            <Form.Group controlId="nodeLocation" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter your city or area" required />
            </Form.Group>

            <Form.Group controlId="nodeInterests" className="mt-3">
              <Form.Label>Interests</Form.Label>
              <Form.Control type="text" placeholder="What are your interests?" />
            </Form.Group>

            <Form.Group controlId="socialLinks" className="mt-3">
              <Form.Label>Social Media Links (Optional)</Form.Label>
              <Form.Control type="text" placeholder="Enter your Instagram, Twitter, etc." />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-btn mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Partner Signup Form */}
      <Modal show={showPartnerForm} onHide={handlePartnerFormClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Partner with Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Profile Picture Upload */}
            <div className="profile-pic-container">
              <div className="profile-pic-preview">{profilePic ? <img src={profilePic} alt="Profile" width="100" height="100" style={{ borderRadius: '50%' }} /> : "Upload Profile Pic"}</div>
              <Form.Control type="file" onChange={handleProfilePicChange} accept="image/*" />
            </div>

            <Form.Group controlId="ownerName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="businessName" className="mt-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your business name" required />
            </Form.Group>

            <Form.Group controlId="ownerEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="businessPhone" className="mt-3">
              <Form.Label>Business Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter business phone number" required />
            </Form.Group>

            <Form.Group controlId="businessLocation" className="mt-3">
              <Form.Label>Business Location</Form.Label>
              <Form.Control type="text" placeholder="Enter city, area, or address" required />
            </Form.Group>

            <Form.Group controlId="identityCard" className="mt-3">
              <Form.Label>Upload Identity Card</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>

            <Form.Group controlId="businessDetails" className="mt-3">
              <Form.Label>Business Details</Form.Label>
              <textarea className="form-control" rows={3} placeholder="Provide details about your business" required></textarea>
            </Form.Group>

            <Button variant="success" type="submit" className="submit-btn mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Signup;
