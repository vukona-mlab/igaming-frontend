import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useProfileCompletionContext } from './ProfileCompletionContext';
import { useNavigate } from 'react-router-dom';

const FIELD_LABELS = {
  name: 'Name',
  surname: 'Surname',
  bio: 'Bio',
  phoneNumber: 'Phone Number',
  categories: 'Categories',
  profilePicture: 'Profile Picture',
};

const REQUIRED_FIELDS = ['name', 'surname', 'bio', 'phoneNumber', 'categories', 'profilePicture'];

const ProfileCompletionModal = ({ uid, token, BACKEND_URL }) => {
  const { isModalOpen, closeModal } = useProfileCompletionContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [missingFields, setMissingFields] = useState([]);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/users/${uid}`, {
        method: "GET",
        headers: { Authorization: token },
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
        // Check if profile is complete
        const isProfileComplete = data.user.profileCompleted;
        // Check required fields
        const missing = REQUIRED_FIELDS.filter(field => {
          const value = data.user[field];
          if (field === 'categories' || field === 'profilePicture') {
            return !value || (Array.isArray(value) && value.length === 0);
          }
          return !value || (typeof value === 'string' && value.trim() === '');
        });
        setMissingFields(missing);
        setShouldShowModal(!isProfileComplete || missing.length > 0);
      } else {
        setShouldShowModal(false);
      }
      setLoading(false);
    } catch (error) {
      setShouldShowModal(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen && uid && token && BACKEND_URL) {
      getProfile();
    }
  }, [isModalOpen, uid, token, BACKEND_URL]);

  const mustUpdate = missingFields && missingFields.length > 0;
  const handleUpdateProfile = () => {
    closeModal();
    navigate('/profile');
  };

  if (loading || !shouldShowModal) {
    return null;
  }

  return (
    <Modal show={isModalOpen && shouldShowModal} onHide={mustUpdate ? undefined : closeModal} centered backdrop="static" keyboard={true}>
      <Modal.Header closeButton={!mustUpdate} onHide={mustUpdate ? undefined : closeModal}>
        <Modal.Title>Complete Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please complete your profile to maximize your browsing experience.</p>
        {missingFields && missingFields.length > 0 && (
          <ul>
            {missingFields.map((field) => (
              <li key={field}>{FIELD_LABELS[field] || field}</li>
            ))}
          </ul>
        )}
        {userProfile && !userProfile.profileCompleted && (
          <p className="text-muted">
            Your profile is currently incomplete. Completing it will help you get better matches and opportunities.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {mustUpdate ? (
          <Button variant="primary" onClick={handleUpdateProfile}>
            Go to Profile
          </Button>
        ) : (
          <Button variant="secondary" onClick={closeModal}>
            Dismiss
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileCompletionModal;
