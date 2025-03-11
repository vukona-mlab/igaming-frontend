import React from "react";
import "./TransactionsSection.css";
import FuturePaymentsSection from "../FuturePaymentsSection/FuturePaymentsSection";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
const TransactionsSection = ({}) => {
  return (
    <div className="TransactionsSection">
      <div className="tss-header">
        <div className="tss-title">Transactions</div>
        <button className="deposit-btn">Deposit</button>
      </div>
      <FuturePaymentsSection futurePayments="0.00" />
      <TransactionHistory totalAmount="0.00" />
    </div>
  );
};

export default TransactionsSection;
