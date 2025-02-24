import React from 'react';
import Button from '../Button/MessageButton';
import './ProfileHeader.css';

const ProfileHeader = ({ 
  name,
  onMessageClick 
}) => {
  return (
    <div className="profile-header">
      <div className="header-content">
        <p className="profile-title">{name}'s Profile</p>
        <Button 
          onClick={onMessageClick}
          className="header-message-btn"
        >
          Message
        </Button>
      </div>
      <div className="header-divider"></div>
    </div>
  );
};

export default ProfileHeader; 