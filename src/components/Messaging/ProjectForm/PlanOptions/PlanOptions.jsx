import React from "react";
import "./PlanOptions.css";
import checkIcon from "../../../../assets/check.svg";

const PlanOptions = ({ selectedPlan, onPlanChange, planPrices, setBudget }) => {
  const hasPackages =
    planPrices && Array.isArray(planPrices) && planPrices.length > 0;
  console.log({ planPrices });
  const plans = hasPackages
    ? planPrices.map((pkg) => ({
        id: pkg.name,
        name: `${pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1)} plan`,
        price: pkg.price,
        features: pkg.features || [],
      }))
    : [];

    console.log({ planPrices });
      const benefits = planPrices?.find(pkg => pkg.name === selectedPlan)?.benefits ?? []
      
  console.log({ benefits });

  return (
    <div className="pricing-section">
      <h2>Pricing & Packages</h2>

      {hasPackages ? (
        <>
          <div className="package-options">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`package-card ${
                  selectedPlan === plan.id ? "selected" : ""
                }`}
                onClick={() => { onPlanChange(plan.id); setBudget(plan.price) }}
              >
                <div className="radio-group">
                  <input
                    type="radio"
                    id={plan.id}
                    name="plan"
                    checked={selectedPlan === plan.id}
                    
                  />

                  <div className="label-price-group">
                    <label htmlFor={plan.id}>{plan.name}</label>
                    <span className="price">R{plan.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="benefits-section">
            <h3>Benefits</h3>
            <ul>
              {benefits && benefits.length > 0 && benefits.map((benefit, index) => (
                <li key={index}>
                  <img src={checkIcon} alt="check" /> {benefit}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="no-packages">
          <p>No packages available</p>
          <p className="sub-text">
            Please contact the freelancer for pricing details
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanOptions;
