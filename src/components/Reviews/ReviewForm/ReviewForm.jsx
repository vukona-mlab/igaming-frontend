import React, { useState } from "react"; 
import Swal from "sweetalert2";
import "./ReviewForm.css";

const ReviewForm = ({ onClose, onSubmit, initialRating = 0 }) => {
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(initialRating);

  const handleSubmit = async () => {
    if (!rating) {
      Swal.fire({
        icon: 'warning',
        title: 'Rating Required',
        text: 'Please select a rating by clicking on the stars',
      });
      return;
    }

    if (!review.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Review Required',
        text: 'Please write a review message',
      });
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(rating, review);
      // The onClose will be called by the parent component after successful submission
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: "Failed to submit review: " + (error.message || "Unknown error"),
      });
      setIsLoading(false);
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
              src={index < rating ? "/images/star.png" : "/images/sad-star.png"}
              alt={`${index + 1} star`}
              className={`rm-star-img ${index < rating ? "filled" : "unfilled"}`}
              onClick={() => setRating(index + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="review-textarea"
          rows={4}
        />
        <button 
          className="submitButn" 
          onClick={handleSubmit} 
          disabled={isLoading}
        >
          {isLoading ? <div className="loader"></div> : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
