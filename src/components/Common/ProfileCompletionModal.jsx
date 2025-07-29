import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useProfileCompletionContext } from './ProfileCompletionContext';
import { useNavigate } from 'react-router-dom';

const FIELD_LABELS = {
  name: 'Full Name',
  email: 'Email Address',
  profilePicture: 'Profile Picture',
  bio: 'Bio/Description'
};

const ProfileCompletionModal = () => {
  const {
    isModalOpen,
    closeModal,
    missingFields,
    userProfile,
    loading
  } = useProfileCompletionContext();
  const navigate = useNavigate();

  // Only allow navigation to profile, not dismiss, if missingFields exist
  const mustUpdate = missingFields && missingFields.length > 0;

  const handleUpdateProfile = () => {
    closeModal();
    navigate('/profile');
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Modal show={isModalOpen} centered backdrop="static">
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Checking your profile...</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal
      show={isModalOpen}
      onHide={mustUpdate ? undefined : closeModal}
      centered
      backdrop="static"
      keyboard={!mustUpdate}
    >
      <Modal.Header closeButton={!mustUpdate}>
        <Modal.Title>Complete Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please complete your profile to access all features and maximize your experience.</p>
        {missingFields && missingFields.length > 0 && (
          <div className="mt-3">
            <p className="mb-2"><strong>Missing required information:</strong></p>
            <ul className="list-unstyled">
              {missingFields.map(field => (
                <li key={field} className="text-danger">
                  • {FIELD_LABELS[field] || field}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdateProfile}>
          Complete Profile
        </Button>
        {!mustUpdate && (
          <Button variant="secondary" onClick={closeModal}>
            Later
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileCompletionModal;
