import React from 'react';
import './PriceCard.css';

const PriceCard = ({ type, price, features, bgColor, handleMessageClick }) => {
  return (
    <div className="pricing-card">
      <div className="plan-type" style={{ background: bgColor }}>
        {type}
      </div>
      <div className="price">{price}</div>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="checkmark">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <button className="message-button" onClick={() => handleMessageClick(price)}>Message</button>
    </div>
  );
};

export default PriceCard;