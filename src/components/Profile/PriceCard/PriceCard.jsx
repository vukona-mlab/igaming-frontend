import React, { useState } from "react";
import "./PriceCard.css";

const PriceCard = ({
  type,
  price,
  features,
  bgColor,
  handleAddFeature,
  onClose,
}) => {
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);
  console.log(price);
  return (
    <div className="pricing-card">
      <button className="sla-close-button" onClick={onClose}>
        ×
      </button>
      <div className="plan-type" style={{ background: bgColor }}>
        {type}
      </div>
      <div className="price">{price}</div>
      <div className="features">
        {/* {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="checkmark">✓</span>
            <span>{feature}</span>
          </div>
        ))} */}
      </div>
      <div className="price-feature-input">
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>
      <button
        className="message-button"
        onClick={() => handleAddFeature({ type: type, features: arr })}
      >
        Add Benefit
      </button>
    </div>
  );
};

export default PriceCard;
