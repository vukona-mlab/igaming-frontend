import { useState } from "react";
import "./PaymentPlan.css"; // Import updated CSS
import { FaDollarSign } from "react-icons/fa"; // Only keep dollar sign

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("R1500");

  const plans = [
    { name: "Ultimate", price: "R2000", details: "All Features + Exclusive Perks" },
    { name: "Premium", price: "R1500", details: "Free Logo Design + 15% Discount + Free Advertisement" },
    { name: "Standard", price: "R1000", details: "Includes Basic Features + Some Premium Perks" },
    { name: "Basic", price: "R500", details: "Essential Features Only" }
  ];

  const currentPlan = plans.find(plan => plan.price === selectedPlan) || plans[1];

  return (
    <div className="payment-card">
      <h2 className="pricing-title">Pricing Plan</h2>

      {/* Plan Selector */}
      <div className="plan-selector">
        {plans.map((plan) => (
          <button
            key={plan.price}
            onClick={() => setSelectedPlan(plan.price)}
            className={`plan-button ${selectedPlan === plan.price ? "active" : ""}`}
          >
            {plan.price}
          </button>
        ))}
      </div>

      {/* Dynamic Plan Title */}
      <p className="plan-text">{currentPlan.name}</p>
      <p className="plan-details">{currentPlan.details}</p>

      {/* Delivery Days (Dropdown) */}
      <div className="delivery-section">
        <label className="delivery-label">Delivery Days</label>
        <select className="delivery-dropdown">
          <option>3 Days</option>
          <option>5 Days</option>
          <option>7 Days</option>
          <option>14 Days</option>
        </select>
      </div>

      {/* Features List */}
      <div className="feature-list">
        <p><strong>Creative</strong> <span>Unlimited</span></p>
        <p><strong>Free Logo Design</strong> <span>{selectedPlan === "R500" ? "Not Applied" : "Applied"}</span></p>
        <p><strong>15% Discount</strong> <span>{selectedPlan === "R500" || selectedPlan === "R1000" ? "Not Applied" : "Applied"}</span></p>
        <p><strong>Free Advertisement</strong> <span>{selectedPlan === "R2000" || selectedPlan === "R1500" ? "Applied" : "Not Applied"}</span></p>
      </div>

      {/* Pricing Details */}
      <div className="pricing-details">
        <p><strong>Project Name:</strong> <span>Aviator</span></p>
        <p><strong>Project Price:</strong> <span className="strikethrough">R30 000</span> <FaDollarSign /></p>
        <p><strong>Final Price:</strong> <span className="final-price">R27 000</span></p>
      </div>

      {/* Buttons */}
      <div className="buttons-container">
        <button className="cancel-button">Cancel</button>
        <button className="pay-button">R27 000</button>
      </div>
    </div>
  );
};

export default PaymentPlan;
