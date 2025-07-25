import React from 'react';
import PriceCard from './PriceCard';
import './PricingPlans.css';

const PricingPlans = ({ packages = [], handleMessageClick }) => {
  const filteredPackages = packages.filter(pkg => pkg.price > 0)
  const pricingData = filteredPackages.map(pkg => ({
    type: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
    price: `R${pkg.price}`,
    features: pkg.benefits || [
      "10 days faster",
      "Free logo",
      "Free design"
    ],
    bgColor: getBgColor(pkg.name.toLowerCase())
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
          handleMessageClick={handleMessageClick}
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
    ultimate: "rgba(26, 240, 226, 0.2)",
  };
  return colors[type] || "rgba(158, 240, 26, 0.25)";
};

export default PricingPlans; 