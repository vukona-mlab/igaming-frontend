import React, { useState, useEffect } from "react";
import DocumentTabs from "../DocumentsTabs/FreelancerTabs";
import PricingPlans from "../PriceCard/PricingPlans";
import ProjectCard from "../Project Card/ProjectCard";
import StarRating from "../StarRating/StarRating";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./FreelancerProfileHeader.css";

const FreelancerProfileHeader = ({ searchTerm, onTabChange, projects = [], packages }) => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  useEffect(() => {
    onTabChange(selectedTab);
  }, [selectedTab, onTabChange]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  const handleRatingChange = (rating) => {
    console.log("Rating changed:", rating);
    // Handle rating change
  };

  const handleReviewClick = (rating) => {
    console.log("Review clicked with rating:", rating);
    // Handle review click
  };

  const handleDemoClick = (projectId) => {
    console.log("Demo clicked for project:", projectId);
  };

  const handleShareClick = (projectId) => {
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
        {selectedTab === "Profile" && (
          <div className="profile-content">
            <div className="section-header">
              <h2 className="section-title">Reviews and Rating</h2>
            </div>
            <StarRating
              onRatingChange={handleRatingChange}
              onReviewClick={handleReviewClick}
              showReviewButton={true}
            />
            <div className="reviews-section">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>
          </div>
        )}
        {selectedTab === "Pricing & Packages" && (
          <div className="pricing-container">
            <PricingPlans packages={packages} />
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