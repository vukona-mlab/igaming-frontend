import React, { useState } from "react";
import withProfileCheck from "../../../../components/Common/withProfileCheck";
import NavBar from "../../../../components/Common/Navbar/navbar";
import DocumentsHeader from "../../../../components/Documents/DocumentsHeader/DocumentsHeaderTabs";
import styles from "./DocumentsView.module.css";
import { useNavigate } from "react-router-dom";
import DocumentsTable from "../../../../components/Documents/DocumentsTable/DocumentsTable";

const PROFILE_REQUIREMENTS = ["name", "email", "profilePicture"];
const DocumentsView = (props) => {
  
  const [activeTab, setActiveTab] = useState("approved");  // Track active tab status
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-document");
  };

  const handleBack = () => {
    navigate("/profile");
  };

  // Handle tab change (set the status filter to lowercase)
  const handleTabChange = (tab) => {
    setActiveTab(tab.toLowerCase());  // Ensure it's lowercase
  };

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBack}>
            <img src="/images/arrow_back.png" alt="Back" className={styles.arrowIcon} />
            Documents
          </button>
          <button className={styles.uploadButton} onClick={handleClick}>Upload</button>
        </div>

        {/* Tabs Section */}
        <DocumentsHeader
          tabOne="Approved"
          tabTwo="Pending"
          tabThree="Declined"
          handleTabChange={handleTabChange}
        />

        {/* Documents Table with filter applied based on activeTab */}
        <DocumentsTable statusFilter={activeTab} />
      </div>
    </div>
  );
};

export default withProfileCheck(DocumentsView, PROFILE_REQUIREMENTS);
