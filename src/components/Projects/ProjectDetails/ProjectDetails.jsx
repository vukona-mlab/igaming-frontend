import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

const ProjectDetails = ({ project, onClose }) => {
  return (
    <div className="project-details-modal-overlay">
      <div className="project-details-modal">
        <div className="project-details-header">
          <h2>Project Agreement</h2>
          <div className="header-actions">
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

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
            {/* {clientDetails && (
              <div className="detail-item">
                <span className="detail-label">Client:</span>
                <span className="detail-value">
                  {clientDetails.displayName || clientDetails.email}
                </span>
              </div>
            )}
            {freelancerDetails && (
              <div className="detail-item">
                <span className="detail-label">Freelancer:</span>
                <span className="detail-value">
                  {freelancerDetails.displayName || freelancerDetails.email}
                </span>
              </div>
            )} */}
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
      </div>
    </div>
  );
};

export default ProjectDetails;
