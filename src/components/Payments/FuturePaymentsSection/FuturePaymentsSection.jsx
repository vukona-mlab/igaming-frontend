import React from "react";
import "./FuturePaymentsSection.css";

const FuturePaymentsSection = ({ futurePayments }) => {
  return (
    <div className="FuturePaymentsSection">
      <div className="fps-title">Future payments</div>
      <div className="fps-value-div">
        <div className="fps-value">ZAR R{futurePayments}</div>
      </div>
    </div>
  );
};

export default FuturePaymentsSection;
