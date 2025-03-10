import React from "react";
import "./TransactionHistory.css";

const TransactionHistory = ({ totalTransferAmount }) => {
  return (
    <div className="TransactionHistory">
      <div className="th-heading-value">
        <div className="th-heading">Total Transfer</div>
        <div className="th-value">ZAR R{totalTransferAmount}</div>
      </div>
      <div className="th-title">Transfer History</div>
      <div className="th-transactions-div"></div>
    </div>
  );
};

export default TransactionHistory;
