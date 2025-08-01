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
import ProfileCompletionModal from "../../components/Common/ProfileCompletionModal";
import { useProfileCompletionContext } from "../../components/Common/ProfileCompletionContext";

const Transactions = (props) => {
  const [tab, setTab] = useState("Bank Details");
  const { isProfileComplete, isModalOpen } = useProfileCompletionContext();
  const role = localStorage.getItem('role')
  return (
    <div className="Transactions" style={{ position: 'relative' }}>
      <Navbar />
      <ProfileSubNav />
      {/* Banner if profile is incomplete */}
      {!isProfileComplete && (
        <div style={{
          background: '#f3f4f6',
          color: '#92400e',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '1rem'
        }}>
          Transactions are disabled until your profile is complete.
        </div>
      )}
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
      <ProfileCompletionModal />
      {/* Grey-out effect for main content */}
      <div style={!isProfileComplete ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
        {/* Existing content, e.g. SectionContainer, transaction UI... */}
      </div>
    </div >
  );
};

export default withProfileCheck(Transactions);
