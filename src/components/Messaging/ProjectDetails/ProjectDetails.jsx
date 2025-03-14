import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectDetails.css";
import { io } from "socket.io-client";
import EscrowForm from "../../Escrow/EscrowForm";

const ProjectDetails = ({ project, onClose, isClient }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const [showEscrowForm, setShowEscrowForm] = useState(false);
  const [clientId, setClientId] = useState(project?.clientId || null);
  const [freelancerId, setFreelancerId] = useState(project?.freelancerId || null);
  const [clientDetails, setClientDetails] = useState(null);
  const [freelancerDetails, setFreelancerDetails] = useState(null);

  useEffect(() => {
    if (project) {
      setClientId(project.clientId);
      setFreelancerId(project.freelancerId);
      fetchUserDetails();
    }
  }, [project]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch client details using the correct endpoint
      const clientResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${project.clientId}`, {
        headers: {
          Authorization: token
        }
      });
      const clientData = await clientResponse.json();
      setClientDetails(clientData.user);

      // Fetch freelancer details if available
      if (project.freelancerId) {
        const freelancerResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${project.freelancerId}`, {
          headers: {
            Authorization: token
          }
        });
        const freelancerData = await freelancerResponse.json();
        setFreelancerDetails(freelancerData.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleProjectAction = async (action) => {
    try {
      const token = localStorage.getItem("token");
      
      if (action === 'reject' || action === 'delete') {
        // Delete the project if rejected by client or deleted by freelancer
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${project.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          // Emit socket event for project deletion/rejection
          const socket = io(import.meta.env.VITE_API_URL);
          socket.emit("project-status-updated", {
            chatId: project.chatId,
            projectId: project.id,
            status: action === 'reject' ? "rejected" : "deleted",
            message: action === 'reject' ? "Project has been rejected" : "Project has been deleted"
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

  const handleEscrow = () => {
    if (project.escrowId) {
      setShowEscrowForm(true);
    } else {
      navigate(`/escrow/create`, {
        state: {
          projectId: project.id,
          clientId: clientId,
          freelancerId: freelancerId,
          project: {
            ...project,
            clientName: clientDetails?.displayName || clientDetails?.email,
            freelancerName: freelancerDetails?.displayName || freelancerDetails?.email,
            clientEmail: clientDetails?.email,
            freelancerEmail: freelancerDetails?.email
          }
        }
      });
    }
  };

  const handleEscrowSubmit = async (escrowData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/escrow/${project.escrowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          ...escrowData,
          clientId,
          freelancerId,
        }),
      });

      if (response.ok) {
        setShowEscrowForm(false);
        onClose();
      }
    } catch (error) {
      console.error("Error submitting escrow:", error);
    }
  };

  const handleEscrowAction = async (action) => {
    try {
      const token = localStorage.getItem("token");
      
      if (action === 'fund') {
        // Navigate to escrow funding
        navigate(`/escrow/${project.escrowId}/fund`, {
          state: {
            projectId: project.id,
            clientId: clientId,
            freelancerId: freelancerId,
            amount: project.budget,
            project: {
              ...project,
              clientName: clientDetails?.displayName || clientDetails?.email,
              freelancerName: freelancerDetails?.displayName || freelancerDetails?.email,
              clientEmail: clientDetails?.email,
              freelancerEmail: freelancerDetails?.email
            }
          }
        });
      }
    } catch (error) {
      console.error("Error handling escrow action:", error);
    }
  };

  return (
    <div className="project-details-modal-overlay">
      <div className="project-details-modal">
        <div className="project-details-header">
          <h2>{showEscrowForm ? "Update Escrow Agreement" : "Project Details"}</h2>
          <div className="header-actions">
            {project.escrowId && (
              <button 
                className="view-escrow-button"
                onClick={() => setShowEscrowForm(true)}
              >
                View Escrow
              </button>
            )}
            <button 
              className="close-button"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {showEscrowForm ? (
          <EscrowForm
            onSubmit={handleEscrowSubmit}
            freelancerId={freelancerId}
            clientId={clientId}
            existingEscrow={project.escrowId}
            project={{
              ...project,
              id: project.id,
              description: project.description,
              clientName: clientDetails?.displayName || clientDetails?.email,
              freelancerName: freelancerDetails?.displayName || freelancerDetails?.email,
              clientEmail: clientDetails?.email,
              freelancerEmail: freelancerDetails?.email,
              budget: project.budget
            }}
            isModal={true}
            onClose={() => setShowEscrowForm(false)}
          />
        ) : (
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
              <h3>Participants</h3>
              {clientDetails && (
                <div className="detail-item">
                  <span className="detail-label">Client:</span>
                  <span className="detail-value">{clientDetails.displayName || clientDetails.email}</span>
                </div>
              )}
              {freelancerDetails && (
                <div className="detail-item">
                  <span className="detail-label">Freelancer:</span>
                  <span className="detail-value">{freelancerDetails.displayName || freelancerDetails.email}</span>
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

            <div className="project-actions">
              {isClient && project.status === 'pending' && (
                <>
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
                </>
              )}
              {userRole === "freelancer" && project.status === 'approved' && (
                <button 
                  className="create-escrow-button"
                  onClick={handleEscrow}
                >
                  {project.escrowId ? 'Update Escrow' : 'Create Escrow'}
                </button>
              )}
            </div>

            <div className="detail-group">
              {userRole === "client" && project.escrowId && (
                <div className="escrow-actions">
                  <h3>Escrow Actions</h3>
                  {project.escrowStatus === 'pending' && (
                    <button 
                      className="fund-escrow-button"
                      onClick={() => handleEscrowAction('fund')}
                    >
                      Fund Escrow
                    </button>
                  )}
                  {project.escrowStatus === 'funded' && (
                    <button 
                      className="release-escrow-button"
                      onClick={() => handleEscrowAction('release')}
                    >
                      Release Funds
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails; 