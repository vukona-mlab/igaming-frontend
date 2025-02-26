import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../../config/firebase';
import './LogoutButton.css';

const LogoutButton = ({ className, customStyle }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      navigate('/client-signin');
    }
  };

  return (
    <button 
      className={`logout-button ${className || ''}`}
      style={customStyle}
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton; 