import React, { useState } from "react";
import "./ProjectsTabsHeader.css";

const ProjectsTabsHeader = ({ handleTabChange }) => {
  const [currentTab, setCurrentTab] = useState("All");
  return (
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
  );
};

export default ProjectsTabsHeader;
