import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Button from '../Button/MessageButton';
import './ServicesCard.css';

const ServicesCard = ({ 
  profilePicture, 
  name, 
  jobTitle, 
  projectsCompleted, 
  likes,
  onMessageClick 
}) => {
    const formatLikes = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

  return (
    <div className="freelancer-card">
      <div className="freelancer-profile">
        <img 
          src={profilePicture} 
          alt={`${name}'s profile`} 
          className="profile-picture"
        />
      </div>
      <div className="freelancer-info">
        <div className="freelancer-details">
          <h3 className="freelancer-name">{name}</h3>
          <p className="freelancer-title">{jobTitle}</p>
          <div className="freelancer-stats">
          <p className="project-likes">{formatLikes(likes)} likes</p>
            <span className="projects">{projectsCompleted} Projects</span>
            
          </div>
        </div>
        <Button 
          onClick={onMessageClick}
          className="message-btn"
        >
          Explore
        </Button>
      </div>
    </div>
  );
};

export default ServicesCard; 