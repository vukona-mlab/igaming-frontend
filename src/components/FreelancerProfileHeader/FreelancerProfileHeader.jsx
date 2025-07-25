import React, { useState, useEffect } from "react";
import DocumentTabs from "../DocumentsTabs/FreelancerTabs";
import PricingPlans from "../PriceCard/PricingPlans";
import ProjectCard from "../Project Card/ProjectCard";
import StarRating from "../Reviews/StarRating/StarRating";
import ReviewForm from "../Reviews/ReviewForm/ReviewForm";
import ReviewCard from "../Reviews/ReviewCard/ReviewCard";
import "./FreelancerProfileHeader.css";

const FreelancerProfileHeader = ({
  searchTerm,
  onTabChange,
  projects = [],
  packages,
  reviews = [],
  reviewsError = null,
  onReviewSubmit,
  handleMessageClick
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

  const handleSubmitReview = async (rating, review) => {
    if (onReviewSubmit) {
      await onReviewSubmit(rating, review);
    }
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
              {reviewsError ? (
                <div className="reviews-error">
                  <p>{reviewsError}</p>
                  <p className="reviews-error-subtext">Reviews will be displayed here once available.</p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))
              ) : (
                <div className="no-reviews">
                  <p>No reviews yet</p>
                  <p className="no-reviews-subtext">Be the first to review this freelancer!</p>
                </div>
              )}
            </div>
          </div>
        )}
        {selectedTab === "Pricing & Packages" && (
          <div className="pricing-container">
            <PricingPlans packages={packages} handleMessageClick={handleMessageClick} />
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
