import React from 'react';
import PriceCard from './PriceCard';
import './PricingPlans.css';

const PricingPlans = ({ packages = {} }) => {
  const pricingData = [
    {
      type: "Basic",
      price: packages.basic ? `R${packages.basic}` : "N/A",
      features: [
        "10 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(158, 240, 26, 0.25)"
    },
    {
      type: "Standard",
      price: packages.standard ? `R${packages.standard}` : "N/A",
      features: [
        "20 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(131, 56, 236, 0.20)"
    },
    {
      type: "Premium",
      price: packages.premium ? `R${packages.premium}` : "N/A",
      features: [
        "30 days faster",
        "Free logo",
        "Free design"
      ],
      bgColor: "rgba(13, 153, 255, 0.20)"
    },
    {
      type: "Ultimate",
      price: packages.ultimate ? `R${packages.ultimate}` : "N/A",
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