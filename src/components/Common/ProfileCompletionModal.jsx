// ProfileCompletionModal.js - Styled version
import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useProfileCompletionContext } from './ProfileCompletionContext';
import { useNavigate } from 'react-router-dom';
import './ProfileCompletionModal.css';

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
    loading,
    error
  } = useProfileCompletionContext();
  const navigate = useNavigate();

  const handleClose = () => {
    closeModal();
  };

  const handleUpdateProfile = () => {
    // If you want to navigate to profile, keep this:
    navigate('/profile');
    closeModal();
  };

  // Loading state
  if (loading) {
    return (
      <Modal show={isModalOpen} centered backdrop={true} onHide={handleClose} className="profile-completion-modal">
        <div className="loading-body">
          <div className="loading-container">
            <div className="custom-spinner">
              <div className="spinner-ring"></div>
            </div>
            <div>
              <p className="loading-text">Checking your profile...</p>
              <p className="loading-subtext">Please wait a moment.</p>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  // Error state
  if (error && isModalOpen) {
    return (
      <Modal show={isModalOpen} onHide={handleClose} centered className="profile-completion-modal error-modal">
        <div className="error-header">
          <span className="error-icon">⚠️</span>
          <span className="error-title">Error</span>
        </div>
        <div className="error-body">
          <p className="error-message">Failed to check profile completion.</p>
          <pre className="error-details">{error}</pre>
        </div>
        <div className="error-footer footer-actions">
          <Button className="btn-custom btn-secondary-custom" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      show={isModalOpen}
      onHide={handleClose}
      centered
      backdrop={true}
      keyboard={true}
      className="profile-completion-modal"
    >
      <div className="custom-header">
        <div className="header-content">
          <span className="header-icon">👤</span>
          <div className="header-text">
            <h2 className="custom-title">Complete Your Profile</h2>
            <p className="header-subtitle">Unlock all features and maximize your experience.</p>
          </div>
          <button className="custom-close-btn" onClick={handleClose} aria-label="Close">×</button>
        </div>
      </div>
      <div className="custom-body">
        <p className="main-description">
          Please complete your profile to access all features and maximize your experience.
        </p>
        {missingFields && missingFields.length > 0 && (
          <div className="missing-fields-section">
            <div className="missing-fields-title">
              <span>⚡</span>
              <span>Missing required information:</span>
            </div>
            <div className="missing-fields-list">
              {missingFields.map(field => (
                <div key={field} className="missing-field-item">
                  <span className="field-indicator">!</span>
                  <span className="field-name">{FIELD_LABELS[field] || field}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="benefits-section">
          <div className="benefits-title">Why complete your profile?</div>
          <div className="benefits-list">
            <div className="benefit-item">🔒 Access protected features</div>
            <div className="benefit-item">🚀 Get discovered by clients</div>
            <div className="benefit-item">💬 Enable messaging and transactions</div>
            <div className="benefit-item">🏆 Build trust and credibility</div>
          </div>
        </div>
      </div>
      <div className="custom-footer">
        <div className="footer-actions">
          <Button className="btn-custom btn-primary-custom" onClick={handleUpdateProfile}>
            Complete Profile
          </Button>
          <Button className="btn-custom btn-secondary-custom" onClick={handleClose}>
            Later
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileCompletionModal;