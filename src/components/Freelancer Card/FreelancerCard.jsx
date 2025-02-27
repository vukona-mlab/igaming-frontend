import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./FreelancerCard.css"

const FreelancerCard = ({ 
  profilePicture, 
  name, 
  jobTitle, 
  projectsCompleted, 
  rating,
  onMessageClick 
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full_${i}`} className="star filled" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star filled" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<AiOutlineStar key={`empty_${i}`} className="star empty" />);
    }

    return stars;
  };
    // ths is jessy's card for landing page
  return (
    <Card className="freelancer-card">
      <Card.Img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <Card.Body>
        <Card.Title className="freelancer-name">{name}</Card.Title>
        <Card.Text className="freelancer-title">{jobTitle}</Card.Text>
        <Card.Text className="freelancer-stats">
          <span className="projects">{projectsCompleted} Projects Completed</span>
          <div className="freelancer-title">{renderStars()}</div>
        </Card.Text>
        <Button variant="dark" onClick={onMessageClick} className="message-btn">
          Message
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FreelancerCard;
