import React, { useState, useEffect } from "react";
import DocumentTabs from "../DocumentsTabs/FreelancerTabs";
import PricingPlans from "../PriceCard/PricingPlans";
import ProjectCard from "../Project Card/ProjectCard";
import "./FreelancerProfileHeader.css";

const FreelancerProfileHeader = ({ searchTerm, onTabChange, projects = [] }) => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  useEffect(() => {
    onTabChange(selectedTab);
  }, [selectedTab, onTabChange]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  const handleDemoClick = (projectId) => {
    // Handle demo click
    console.log("Demo clicked for project:", projectId);
  };

  const handleShareClick = (projectId) => {
    // Handle share click
    console.log("Share clicked for project:", projectId);
  };

  return (
    <div className="freelancer-profile-container">
      <DocumentTabs
        tabOne="Profile"
        tabTwo="Pricing & Packages"
        tabThree="Projects"
        handleTabChange={handleTabChange}
      />

      <div className="tab-content">
        {selectedTab === "Profile" && <div>Profile</div>}
        {selectedTab === "Pricing & Packages" && (
          <div className="pricing-container">
            <PricingPlans />
          </div>
        )}
        {selectedTab === "Projects" && (
          <div className="projects-container">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  projectPicture={project.projectPicture || "https://via.placeholder.com/350x300"}
                  projectName={project.projectName}
                  likes={project.likes || 0}
                  authorName={project.authorName}
                  onDemoClick={() => handleDemoClick(project.id)}
                  onShareClick={() => handleShareClick(project.id)}
                />
              ))
            ) : (
              <div className="no-projects">No projects available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfileHeader;