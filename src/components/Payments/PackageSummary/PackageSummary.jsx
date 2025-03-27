import React, { useState } from 'react';
import './PackageSummary.css';
import PlanSummary from './PlanSummary/PlanSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const PackageSummary = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const planDetails = {
    planName: 'Standard plan',
    price: '999',
    benefits: [
      '20 days faster',
      'Free Logo',
      'Free design'
    ]
  };

  return (
    <div className="package-summary-container">
      <div className="payment-section">
        <h1>Proceed to pay for your project</h1>
        
        <div className="checkbox-container">
          <input type="checkbox" id="primary-card" />
          <label htmlFor="primary-card">Tick this box to pay using your primary card</label>
        </div>

        <CheckoutForm 
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          cvv={cvv}
          projectRef="YH55458980000"
          onCardNumberChange={handleCardNumberChange}
          onExpiryDateChange={(e) => setExpiryDate(e.target.value)}
          onCvvChange={(e) => setCvv(e.target.value)}
        />

        <div className="checkout-row">
          <span className="checkout-label">Checkout Price</span>
          <span className="checkout-price">R30 999</span>
        </div>

        <button className="pay-button">Pay</button>

        <p className="terms-text">
          By providing your card information, you allow us to charge your card for future payments in
          accordance with their terms.
        </p>
      </div>

      <PlanSummary {...planDetails} />
    </div>
  );
};

export default PackageSummary;
