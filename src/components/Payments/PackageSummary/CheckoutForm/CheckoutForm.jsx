import React from 'react';
import './CheckoutForm.css';
import masterCardIcon from '../../../../assets/mastercard.svg';

const CheckoutForm = ({ 
  cardNumber, 
  expiryDate, 
  cvv, 
  projectRef,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange 
}) => {
  return (
    <div className="form-fields">
      <div className="form-group">
        <label>Project ref</label>
        <input type="text" value={projectRef} disabled className="project-ref" />
      </div>

      <div className="form-group">
        <label>Card Number</label>
        <div className="card-input-container">
          <input
            type="text"
            value={cardNumber}
            onChange={onCardNumberChange}
            placeholder="3460 1954 9652 0480"
            maxLength="19"
          />
          <img src={masterCardIcon} alt="Mastercard" className="card-icon" />
        </div>
      </div>

      <div className="card-details-row">
        <div className="form-group expiry">
          <label>Expiration Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={onExpiryDateChange}
            maxLength="5"
          />
        </div>

        <div className="form-group cvv">
          <label>CVV</label>
          <input
            type="text"
            placeholder="837"
            value={cvv}
            onChange={onCvvChange}
            maxLength="3"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 