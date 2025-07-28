import React, { useState } from "react";
import withProfileCheck from "../../components/Common/withProfileCheck";
import { Button } from "react-bootstrap";
import "./Transactions.css";
import Navbar from "../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../components/Profile/ProfileSubNav/ProfileSubNav";
import TransactionsSection from "../../components/Payments/TransactionsSection/TransactionsSection";
import BankingDetailsSection from "../../components/Payments/BankingDetailsSection/BankingDetailsSection"
import TabsHeader from "../../components/Payments/TabsHeader/TabsHeader";
import SectionContainer from "../../components/SectionContainer";
const PROFILE_REQUIREMENTS = ["name", "email", "profilePicture"];
const Transactions = (props) => {
  const [tab, setTab] = useState("Bank Details");
  const role = localStorage.getItem('role')
  return (
    <div className="Transactions">
      <Navbar />
      <ProfileSubNav />
      <SectionContainer>
        <div className="transaction-page-sections">
          {
            role === "freelancer" ? (
              <>
                <TabsHeader
                  fieldOne="Bank Details"
                />

                {tab === "Bank Details" && <BankingDetailsSection /> }
              </>

            ) : (
              <>
                <TabsHeader
                  fieldOne="Bank Details"
                  fieldTwo="Transactions"
                  handleTabChange={setTab}
                />

                {tab === "Bank Details" ? <BankingDetailsSection /> : <TransactionsSection />}
              </>

            )
          }
        </div>
      </SectionContainer >

    </div >
  );
};

export default withProfileCheck(Transactions, PROFILE_REQUIREMENTS);
