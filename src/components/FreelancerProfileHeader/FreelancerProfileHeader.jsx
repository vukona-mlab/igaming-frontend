import React, { useState, useEffect } from "react";
import DocumentTabs from "../DocumentsTabs/FreelancerTabs";
import PricingPlans from "../PriceCard/PricingPlans";
import ProjectCard from "../Project Card/ProjectCard";
import StarRating from "../StarRating/StarRating";
import ReviewForm from "../Reviews/ReviewForm/ReviewForm";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./FreelancerProfileHeader.css";

const FreelancerProfileHeader = ({
  searchTerm,
  onTabChange,
  projects = [],
  packages,
}) => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    onTabChange(selectedTab);
  }, [selectedTab, onTabChange]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  const handleRatingChange = (rating) => {
    console.log("Rating changed:", rating);
  };

  const handleReviewClick = (rating) => {
    setReviewRating(rating);
    setIsReviewFormOpen(true);
  };

  const handleCloseReviewForm = () => {
    setIsReviewFormOpen(false);
  };

  const handleSubmitReview = (rating, review) => {
    console.log("Review Submitted:", { rating, review });
    setIsReviewFormOpen(false);
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
                  projectPicture={
                    project.projectPicture ||
                    "https://via.placeholder.com/350x300"
                  }
                  projectName={project.projectName}
                  likes={project.likes || 0}
                  authorName={project.authorName}
                  onDemoClick={() =>
                    console.log("Demo clicked for project:", project.id)
                  }
                  onShareClick={() =>
                    console.log("Share clicked for project:", project.id)
                  }
                />
              ))
            ) : (
              <div className="no-projects">No projects available</div>
            )}
          </div>
        )}
      </div>

      {isReviewFormOpen && (
        <ReviewForm
          onClose={handleCloseReviewForm}
          onSubmit={handleSubmitReview}
          initialRating={reviewRating}
        />
      )}
    </div>
  );
};

export default FreelancerProfileHeader;
