import React, { useState } from "react";
import NavBar from "../../../../components/Common/Navbar/navbar";
import DocumentsHeader from "../../../../components/Documents/DocumentsHeader/DocumentsHeaderTabs";
import styles from "./DocumentsView.module.css";

const DocumentsView = () => {
  const [activeTab, setActiveTab] = useState("Approved");

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <img src="/images/arrow_back.png" alt="Back" className={styles.arrowIcon} />
            Documents
          </button>
          <button className={styles.uploadButton}>Upload</button>
        </div>

        {/* Tabs Section */}
        <DocumentsHeader
          tabOne="Approved"
          tabTwo="Pending"
          tabThree="Declined"
          handleTabChange={setActiveTab}
        />

        {/* Content Below Tabs */}
        <div className={styles.content}>
          {activeTab === "Approved" && <p>Approved Documents</p>}
          {activeTab === "Pending" && <p>Pending Documents</p>}
          {activeTab === "Declined" && <p>Declined Documents</p>}
        </div>
      </div>
    </div>
  );
};

export default DocumentsView;
