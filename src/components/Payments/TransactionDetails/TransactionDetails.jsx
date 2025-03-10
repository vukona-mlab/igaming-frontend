import React from "react";
import "./TransactionDetails.css";

const TransactionDetails = ({ message, reference, date, func }) => {
  return (
    <div className="TransactionDetails">
      <div className="td-message">{message}</div>
      <div className="td-ref">{reference}</div>
      <div className="td-date-delete">
        <div className="td-date">{date}</div>
        <button className="td-delete-btn" onClick={func}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
