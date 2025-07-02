import React, { useState } from "react";
import "./ProjectsTabsHeader.css";
import SectionContainer from '../../SectionContainer'

const ProjectsTabsHeader = ({ handleTabChange }) => {
  const [currentTab, setCurrentTab] = useState("All");
  return (
    <SectionContainer>
      <div className="ProjectsTabsHeader">
        <div
          className={currentTab === "All" ? "tbh-tab currentTab" : "tbh-tab"}
          onClick={() => {
            setCurrentTab("All");
            handleTabChange("All");
          }}
        >
          All Projects
        </div>
        <div
          className={
            currentTab === "Completed" ? "tbh-tab currentTab" : "tbh-tab"
          }
          onClick={() => {
            setCurrentTab("Completed");
            handleTabChange("Completed");
          }}
        >
          Completed
        </div>
        <div
          className={currentTab === "Pending" ? "tbh-tab currentTab" : "tbh-tab"}
          onClick={() => {
            setCurrentTab("Pending");
            handleTabChange("Pending");
          }}
        >
          Pending
        </div>
        <div
          className={
            currentTab === "Cancelled" ? "tbh-tab currentTab" : "tbh-tab"
          }
          onClick={() => {
            setCurrentTab("Cancelled");
            handleTabChange("Cancelled");
          }}
        >
          Cancelled
        </div>
      </div>
    </SectionContainer>

  );
};

export default ProjectsTabsHeader;
