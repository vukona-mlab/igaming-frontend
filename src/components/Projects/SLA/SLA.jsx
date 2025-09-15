import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SLA.css";

const SLA = ({ project, onClose }) => {
  return (
    <div className="sla-project-details-modal-overlay">
      <div className="sla-project-details-modal">
        <div className="sla-project-details-header">
          <h2>Service Level Agreement</h2>
          <div className="header-actions">
            <button className="sla-close-button" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        <div className="sla-project-details-content">
          <div className="detail-group">
            <div className="detail-item">
              <span className="sla-detail-label">Project's name:</span>
              <span className="detail-value">{project.title}</span>
            </div>
            <div className="detail-item">
              <span className="sla-detail-label">Project Description:</span>
              <span className="detail-value">{project.description}</span>
            </div>
            <div className="detail-item">
              <span className="sla-detail-label">Date of completion:</span>
              <span className="detail-value">{project.deadline} days</span>
            </div>
            <div className="detail-item">
              <span className="sla-detail-label">Project's price:</span>
              <span className="detail-value">R{project.budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLA;
