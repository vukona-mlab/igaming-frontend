import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

const ProjectDetails = ({ project, onClose }) => {
  const [currentTab, setCurrentTab] = useState("Details");
  return (
    <div className="project-details-modal-overlay">
      <div className="project-details-modal">
        <div className="project-details-header">
          <h2>Project Details</h2>
          <div className="header-actions">
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <div className="pjd-tabs">
          <div
            className={
              currentTab === "Details" ? "pjd-tab currentTab" : "pjd-tab"
            }
            onClick={() => {
              setCurrentTab("Details");
            }}
          >
            Details
          </div>
          <div
            className={
              currentTab === "Images" ? "pjd-tab currentTab" : "pjd-tab"
            }
            onClick={() => {
              setCurrentTab("Images");
            }}
          >
            Images
          </div>
          <div
            className={
              currentTab === "Documents" ? "pjd-tab currentTab" : "pjd-tab"
            }
            onClick={() => {
              setCurrentTab("Documents");
            }}
          >
            Documents
          </div>
        </div>
        {currentTab === "Details" && (
          <div className="project-details-content">
            <div className="detail-group">
              <h3>Basic Information</h3>
              <div className="detail-item">
                <span className="detail-label">Title:</span>
                <span className="detail-value">{project.title}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status ${project.status}`}>
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Budget:</span>
                <span className="detail-value">R{project.budget}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{project.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Deadline:</span>
                <span className="detail-value">{project.deadline} days</span>
              </div>
            </div>

            <div className="detail-group">
              <h3>Participants</h3>
              {project && (
                <div className="detail-item">
                  <span className="detail-label">Client:</span>
                  <span className="detail-value">
                    {project.clientEmail || "N/A"}
                  </span>
                </div>
              )}
              {project && (
                <div className="detail-item">
                  <span className="detail-label">Freelancer:</span>
                  <span className="detail-value">
                    {project.freelancerEmail || "N/A"}
                  </span>
                </div>
              )}
            </div>

            <div className="detail-group">
              <h3>Description</h3>
              <p className="project-description">{project.description}</p>
            </div>

            <div className="detail-group">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {project.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {/* <TermsModal
            show={showTermsModal}
            onHide={() => setShowTermsModal(false)}
            onAccept={setAcceptedTerms}
            accepted={acceptedTerms}
          /> */}
          </div>
        )}
        {currentTab === "Images" && (
          <div className="project-details-content"></div>
        )}
        {currentTab === "Documents" && (
          <div className="project-details-content"></div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
