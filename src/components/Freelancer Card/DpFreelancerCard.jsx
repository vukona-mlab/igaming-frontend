import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Button from '../Button/MessageButton';
import './DpFreelancerCard.css';

const FreelancerCard = ({
  profilePicture,
  name,
  jobTitle,
  projectsCompleted,
  rating,
  messageIcon,
  onMessageClick,
  disabled
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full_${i}`} className="dp-star filled" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="dp-star filled" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AiOutlineStar key={`empty_${i}`} className="dp-star empty" />);
    }

    return stars;
  };  

  return (
    <div className="dp-freelancer-card">
      <div className="dp-freelancer-profile">
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="dp-profile-picture"
        />
      </div>
      <div className="dp-freelancer-info">
        <div className="dp-freelancer-details">
          <h3 className="dp-freelancer-name">{name}</h3>
          <p className="dp-freelancer-title">{jobTitle}</p>
          <div className="dp-freelancer-stats">
            <span className="dp-projects">{projectsCompleted} Projects Completed</span>
            <div className="dp-rating">
              {renderStars()}
            </div>
          </div>
        </div>
        {
          disabled ? (
            <button className="dp-message-button disabled">
              <img src={messageIcon} alt="Message" className="dp-message-icon" />
            </button>
          ) : (
            <button className="dp-message-button" onClick={onMessageClick}>
              <img src={messageIcon} alt="Message" className="dp-message-icon" />
            </button>
          )
        }
      </div>
    </div >
  );
};

export default FreelancerCard; 