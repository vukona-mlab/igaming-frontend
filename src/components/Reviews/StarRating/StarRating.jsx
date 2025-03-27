import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ 
  title = "Rate this Freelancer and tell others what you think",
  onRatingChange,
  onReviewClick,
  initialRating = 0,
  showReviewButton = true,
  reviewButtonText = "Write A Review"
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleReviewClick = () => {
    if (onReviewClick) {
      onReviewClick(rating);
    }
  };

  return (
    <div className="rating-container">
      {title && <h3 className="rating-title">{title}</h3>}
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-button ${star <= (hover || rating) ? 'star-filled' : 'star-empty'}`}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill={star <= (hover || rating) ? 'currentColor' : 'none'}
              />
            </svg>
          </button>
        ))}
      </div>
      {showReviewButton && (
        <button className="write-review-btn" onClick={handleReviewClick}>
          {reviewButtonText}
        </button>
      )}
    </div>
  );
};

export default StarRating; 