import React from 'react';
import PriceCard from './PriceCard';
import './PricingPlans.css';

const PricingPlans = ({ packages = [] }) => {
  const pricingData = packages.map(pkg => ({
    type: pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1),
    price: `R${pkg.price}`,
    features: pkg.features || [
      "10 days faster",
      "Free logo",
      "Free design"
    ],
    bgColor: getBgColor(pkg.type)
  }));

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

const getBgColor = (type) => {
  const colors = {
    basic: "rgba(158, 240, 26, 0.25)",
    standard: "rgba(131, 56, 236, 0.20)",
    premium: "rgba(13, 153, 255, 0.20)",
    ultimate: "rgba(26, 240, 226, 0.2)"
  };
  return colors[type] || "rgba(158, 240, 26, 0.25)";
};

export default PricingPlans; 