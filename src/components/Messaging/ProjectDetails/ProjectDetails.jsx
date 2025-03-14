import React from "react";
import "./ProjectDetails.css";
import { io } from "socket.io-client";

const ProjectDetails = ({ project, onClose, isClient }) => {
  const handleProjectAction = async (action) => {
    try {
      const token = localStorage.getItem("token");
      
      if (action === 'reject') {
        // Delete the project if rejected
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${project.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          // Emit socket event for project rejection
          const socket = io(import.meta.env.VITE_API_URL);
          socket.emit("project-status-updated", {
            chatId: project.chatId,
            projectId: project.id,
            status: "rejected",
            message: "Project has been rejected"
          });
          onClose();
        }
      } else if (action === 'approve') {
        // Update project status to approved
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${project.id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ status: 'approved' }),
        });

        if (response.ok) {
          // Emit socket event for project approval
          const socket = io(import.meta.env.VITE_API_URL);
          socket.emit("project-status-updated", {
            chatId: project.chatId,
            projectId: project.id,
            status: "approved",
            message: "Project has been approved"
          });
          onClose();
        }
      }
    } catch (error) {
      console.error("Error handling project action:", error);
    }
  };

  return (
    <div className="project-details-modal-overlay">
      <div className="project-details-modal">
        <div className="project-details-header">
          <h2>Project Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
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
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
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

          {/* Show action buttons only for clients and pending projects */}
          {isClient && project.status === 'pending' && (
            <div className="project-actions">
              <button 
                className="approve-button"
                onClick={() => handleProjectAction('approve')}
              >
                Approve Project
              </button>
              <button 
                className="reject-button"
                onClick={() => handleProjectAction('reject')}
              >
                Reject Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 