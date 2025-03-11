import React from "react";
import "./TransactionHistory.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
const TransactionHistory = ({ totalAmount }) => {
  const role = localStorage.getItem("role");
  return (
    <div className="TransactionHistory">
      <div className="th-heading-value">
        <div className="th-heading">
          Total {role === "client" ? "Transfer" : "Earned"}
        </div>
        <div className="th-value">ZAR R{totalAmount}</div>
      </div>
      <div className="th-title">
        {role === "client" ? "Transfer" : "Earning"} History
      </div>
      <div className="th-transactions-div">
        <TransactionDetails
          message="You have transferred R70 000 to Ri Experts for Roulette Game from STANDARD BANK account *********5564;
"
          reference="REF 123F45568776UJ"
          date="31 January 2024"
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
