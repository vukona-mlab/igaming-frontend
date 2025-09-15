import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Button from "../Button/MessageButton";
import "./FreelancerCard.css";

const FreelancerCard = ({
  profilePicture,
  name,
  jobTitle,
  projectsCompleted,
  rating,
  onMessageClick,
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

  return (
    <div className="freelancer-card">
      <div className="freelancer-profile">
        <img
          src={
            profilePicture !== ""
              ? profilePicture
              : "../../../public/images/profile.png"
          }
          alt={`${name}'s profile`}
          className="profile-picture"
        />
      </div>
      <div className="freelancer-info">
        <div className="freelancer-details">
          <h3 className="freelancer-name">{name}</h3>
          <p className="freelancer-title">{jobTitle}</p>
          <div className="freelancer-stats">
            <span className="projects">
              {projectsCompleted} Projects Completed
            </span>
            <div className="rating">{renderStars()}</div>
          </div>
        </div>
        <Button onClick={onMessageClick} className="message-btn">
          Message
        </Button>
      </div>
    </div>
  );
};

export default FreelancerCard;
