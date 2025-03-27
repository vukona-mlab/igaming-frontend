import React, { useState } from 'react';
import './ReviewCard.css';
import StarIcon from '../../../assets/Star_duotone.svg';

const ReviewCard = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp._seconds) {
            return 'Date unavailable';
        }
        const date = new Date(timestamp._seconds * 1000); 
        return date.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short' 
        }).split(' ').reverse().join(' ');
    };

    const renderStars = () => {
        return [...Array(review.stars)].map((_, index) => (
            <img 
                key={index} 
                src={StarIcon} 
                alt="star"
                className="star"
            />
        ));
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="left-content">
                    <img 
                        src={review.clientProfilePic || "https://via.placeholder.com/40"} 
                        alt={`${review.clientDisplayName}'s profile`} 
                        className="profile-image"
                    />
                    <span className="username">{review.clientDisplayName}</span>
                    <span className="dot-separator">•</span>
                    <span className="review-date">{formatDate(review.createdAt)}</span>
                    {review.status === "Approved" && (
                        <span className="approval-badge">Approved</span>
                    )}
                </div>
                <div className="star-rating">
                    {renderStars()}
                </div>
            </div>
            <div className="review-content">
                <p className={`review-text ${isExpanded ? 'expanded' : ''}`}>
                    {review.message}
                </p>
                <button 
                    className="read-more-btn" 
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Show Less' : 'Read More'}
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
