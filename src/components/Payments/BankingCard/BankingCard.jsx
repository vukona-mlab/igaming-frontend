import React from "react";
import "./BankingCard.css";

const BankingCard = ({ bankName, accountNumber, func }) => {
  return (
    <div className="BankingCard" onClick={func}>
      <div className="bc-header">
        <div className="bc-bank-name">{bankName}</div>
        <button className="bc-edit">Edit</button>
      </div>
      <div className="bc-acc-num">
        <div className="bc-acc-num-name">Account Number:</div>
        <div className="bc-acc-num-val">
          {accountNumber.replace(/^.{12}/g, "************")}
        </div>
      </div>
    </div>
  );
};

export default BankingCard;
