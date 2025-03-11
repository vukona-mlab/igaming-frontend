import React, { useState } from "react";
import "./Transactions.css";
import Navbar from "../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../components/Profile/ProfileSubNav/ProfileSubNav";
import TransactionsSection from "../../components/Payments/TransactionsSection/TransactionsSection";
import TabsHeader from "../../components/Payments/TabsHeader/TabsHeader";
const Transactions = () => {
  const [tab, setTab] = useState("Bank Details");
  return (
    <div className="Transactions">
      <Navbar />
      <ProfileSubNav />
      <div className="transaction-page-sections">
        <TabsHeader
          fieldOne="Bank Details"
          fieldTwo="Transactions"
          handleTabChange={setTab}
        />
        {tab === "Bank Details" ? <div></div> : <TransactionsSection />}
      </div>
    </div>
  );
};

export default Transactions;
