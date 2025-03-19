import React from "react";
import NavBar from "../../../../components/Common/Navbar/navbar";
import DocumentsHeader from "../../../../components/Documents/DocumentsHeader/DocumentsHeaderTabs";
import styles from "./DocumentsView.module.css";
import { useNavigate } from "react-router-dom";
import DocumentsTable from "../../../../components/Documents/DocumentsTable/DocumentsTable";

const DocumentsView = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-document");
  };

  const handleBack = () => {
    navigate("/profile");
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
          handleTabChange={() => {}}
        />

        {/* Documents Table */}
        <DocumentsTable />
      </div>
    </div>
  );
};

export default DocumentsView;
