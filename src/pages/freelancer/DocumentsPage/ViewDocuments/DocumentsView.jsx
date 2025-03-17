import React, { useState } from "react";
import DocumentsHeader from "../../../../components/Documents/DocumentsHeader/DocumentsHeader";

import './DocumentsView.module.css'

const DocumentsView = () => {
  const [activeTab, setActiveTab] = useState("Approved");

  return (
    <div className="container mt-3">
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button className="btn btn-link text-dark fw-bold">
            &larr; Documents
          </button>
        </div>
        <button className="btn btn-dark px-4">Upload</button>
      </div>

      {/* Tabs Section */}
      <DocumentsHeader
        tabOne="Approved"
        tabTwo="Pending"
        tabThree="Declined"
        handleTabChange={setActiveTab}
      />

      {/* Content Below Tabs */}
      <div className="mt-4">
        {activeTab === "Approved" }
        {activeTab === "Pending" }
        {activeTab === "Declined" }
      </div>
    </div>
  );
};

export default DocumentsView;
