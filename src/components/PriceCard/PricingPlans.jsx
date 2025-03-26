import React from 'react';
import PriceCard from './PriceCard';
import './PricingPlans.css';

const PricingPlans = () => {
  const pricingData = [
    {
      type: "Basic",
      price: "R499",
      features: [
        "10 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(158, 240, 26, 0.25)"
    },
    {
      type: "Standard",
      price: "R999",
      features: [
        "20 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(131, 56, 236, 0.20)"
    },
    {
      type: "Premium",
      price: "R1,499",
      features: [
        "30 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(13, 153, 255, 0.20)"
    },
    {
      type: "Ultimate",
      price: "R1,999",
      features: [
        "50 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(26, 240, 226, 0.2)"
    }
  ];

  return (
    <div className="pricing-plans-container">
      {pricingData.map((plan, index) => (
        <PriceCard
          key={index}
          type={plan.type}
          price={plan.price}
          features={plan.features}
          bgColor={plan.bgColor}
        />
      ))}
    </div>
  );
};

export default PricingPlans; 