import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Transactions.css";
import FreelancerNavBar from "../../components/FreelancerNavBar/freelancerNavBar";
import TransactionsSection from "../../components/Payments/TransactionsSection/TransactionsSection";
import BankingDetailsSection from "../../components/Payments/BankingDetailsSection/BankingDetailsSection";
import TabsHeader from "../../components/Payments/TabsHeader/TabsHeader";

const Transactions = () => {
  const [tab, setTab] = useState("Bank Details");
  return (
    <div className="Transactions">
      <FreelancerNavBar />

      <div className="transaction-page-sections">
        <TabsHeader
          fieldOne="Bank Details"
          fieldTwo="Transactions"
          handleTabChange={setTab}
        />

        {tab === "Bank Details" ? (
          <BankingDetailsSection />
        ) : (
          <TransactionsSection />
        )}
      </div>
    </div>
  );
};

export default Transactions;
