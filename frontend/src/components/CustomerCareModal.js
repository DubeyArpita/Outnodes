import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomerCareModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>Customer Care</Modal.Title>
            <Button variant="danger" onClick={handleClose} style={{ marginLeft: "auto" }}>
              Close ❌
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p><b>📞 Phone:</b> +1 234 567 890</p>
            <p><b>📧 Email:</b> support@outnodes.com</p>
            <p><b>📍 Address:</b> 123 Outnodes Street, Tech City</p>
          </Modal.Body>
        </Modal>
      );
}

export default CustomerCareModal;
