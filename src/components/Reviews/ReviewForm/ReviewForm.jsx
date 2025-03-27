import React, { useState } from "react"; 
import "./ReviewForm.css";

const ReviewForm = ({ onClose, onSubmit, initialRating = 0 }) => {
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (onSubmit) {
      setIsLoading(true);
      onSubmit(initialRating, review);

      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="rm-modal-overlay">
      <div className="rm-review-modal">
        <div className="rm-modal-header">
          <button className="rm-close-btn" onClick={onClose}>
            <img src="/images/close-btn.png" alt="Close" />
          </button>
        </div>

        <h3 className="rm-modal-title">Review Form</h3>
        <div className="rm-rate-text">
          <p>Rate the level</p>
        </div>
        <div className="rm-star-rating">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={initialRating === 0 ? "/images/sad-star.png" : index < initialRating ? "/images/star.png" : "/images/sad-star.png"}
              alt="Star"
              className={`rm-star-img ${index < initialRating ? "filled" : "unfilled"}`}
            />
          ))}
        </div>
        <textarea
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="submitButn" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <div className="loader"></div> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
