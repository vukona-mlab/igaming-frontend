import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutConfirmationModal = ({ show, onConfirm, onCancel }) => (
  <Modal show={show} onHide={onCancel} centered backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>Confirm Logout</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to log out?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Logout
      </Button>
    </Modal.Footer>
  </Modal>
);

export default LogoutConfirmationModal;
