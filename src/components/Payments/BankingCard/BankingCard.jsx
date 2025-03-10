import React from "react";
import "./BankingCard.css";

const BankingCard = ({ bankName, accountNumber }) => {
  return (
    <div className="BankingCard">
      <div className="bc-header">
        <div className="bc-bank-name">{bankName}</div>
        <button className="bc-edit">Edit</button>
      </div>
      <div className="bc-acc-num">
        <div className="bc-acc-num-name">Account Number:</div>
        <div className="bc-acc-num-val">{accountNumber}</div>
      </div>
    </div>
  );
};

export default BankingCard;
