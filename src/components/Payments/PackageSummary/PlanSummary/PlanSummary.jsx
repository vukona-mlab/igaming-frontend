import React from 'react';
import checkIcon from '../../../../assets/check.svg';
import Control from '../../../../assets/Control.svg';
import './PlanSummary.css';

const PlanSummary = ({ planName, price, benefits }) => {
  return (
    <div className="plan-section">
      <h2>Chosen Plan</h2>
      <div className="plan-card">
        <div className="plan-header">
          <div className="check-circle">
            <img src={Control} alt="check" />
          </div>
          <div className="plan-info">
            <h3>{planName}</h3>
            <p>R{price}</p>
          </div>
        </div>

        <div className="benefits">
          <h3>Benefits</h3>
          <ul>
            {benefits.map((benefit, index) => (
              <li key={index}>
                <img src={checkIcon} alt="check" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary; 