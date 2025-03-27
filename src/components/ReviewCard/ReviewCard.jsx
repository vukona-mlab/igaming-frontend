import React, { useState } from 'react';
import './ReviewCard.css';
import StarIcon from '../../assets/Star_duotone.svg';

const ReviewCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const dummyData = {
        profileImage: "https://i.pinimg.com/736x/1a/44/d8/1a44d80778cc4d6078b56e7a54792b95.jpg",
        username: "KaiB",
        date: "22 Jul",
        isApproved: true,
        rating: 5,
        content: "KaiB was amazing with our cats!! ⭐️⭐️⭐️ This was our first time using a pet-sitting service, so we were naturally quite anxious. We took a chance on Kai and completely lucked out! We booked Kai to come twice a day for three days. Kai spent a considerable amount of time playing and engaging with our cats. She also sent us very funny and detailed reports at the end of each session. She truly gave us peace of mind while on holiday, knowing our furbabies were in good hands. We also kept looking forward to her cute updates! You can tell she's a natural with animals..."
    };

    const renderStars = () => {
        return [...Array(dummyData.rating)].map((_, index) => (
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
                        src={dummyData.profileImage} 
                        alt={`${dummyData.username}'s profile`} 
                        className="profile-image"
                    />
                    <span className="username">{dummyData.username}</span>
                    <span className="dot-separator">•</span>
                    <span className="review-date">{dummyData.date}</span>
                    {dummyData.isApproved && (
                        <span className="approval-badge">Approved</span>
                    )}
                </div>
                <div className="star-rating">
                    {renderStars()}
                </div>
            </div>
            <div className="review-content">
                <p className={`review-text ${isExpanded ? 'expanded' : ''}`}>
                    {dummyData.content}
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
