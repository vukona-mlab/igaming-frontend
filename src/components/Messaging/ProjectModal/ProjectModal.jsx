import React, { useState } from "react";
import "./ProjectModal.css";
import EscrowForm from "../../Escrow/EscrowForm";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:8000", { transports: ["websocket"] });

const ProjectModal = ({ isOpen, onClose, projectData, chatId, isClientView }) => {
  const [createdProject, setCreatedProject] = useState(null);
  const [showEscrow, setShowEscrow] = useState(false);
  
  const categories = [
    "Game Development",
    "Creative & Design",
    "Audio & Music",
    "Content & Marketing",
    "Quality Assurance",
    "Compliance & Legal",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: categories[0],
    requirements: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...formData,
          clientId: projectData.clientId,
          freelancerId: projectData.freelancerId,
          requirements: formData.requirements.split(',').map(req => req.trim()),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedProject(data.project);

        // Create a more detailed project notification message
        const projectMessage = {
          chatId: chatId,
          senderId: projectData.freelancerId,
          text: `🎮 New Project Created!\n\n` +
                `Title: ${formData.title}\n` +
                `Budget: $${formData.budget}\n` +
                `Deadline: ${new Date(formData.deadline).toLocaleDateString()}\n` +
                `Category: ${formData.category}\n\n` +
                `Click here to view details: /projects/${data.project.id}`,
          type: 'project_creation',
          timestamp: new Date(),
        };

        // Send message through the chat API endpoint
        await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(projectMessage),
        });

        // Emit the message through socket for real-time update
        socket.emit('send-message', {
          ...projectMessage,
          receiverId: projectData.clientId
        });

      } else {
        const error = await response.json();
        alert(error.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    }
  };

  const handleEscrowSubmit = async (escrowFormData) => {
    try {
      // Handle escrow creation here
      console.log("Escrow data:", escrowFormData);
      // After successful escrow creation
      onClose();
    } catch (error) {
      console.error("Error creating escrow:", error);
      alert("Failed to create escrow");
    }
  };

  const handleAccept = async () => {
    try {
      // Implement project acceptance logic here
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectData.id}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Error accepting project:', error);
    }
  };

  const renderStep = () => {
    if (showEscrow) {
      return (
        <div className="escrow-step">
          <h2>Create Escrow Agreement</h2>
          <EscrowForm 
            onSubmit={handleEscrowSubmit}
            freelancerId={projectData.freelancerId}
            clientId={projectData.clientId}
            projectDetails={createdProject}
          />
          <div className="modal-actions">
            <button type="button" onClick={() => setShowEscrow(false)}>Back to Details</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      );
    }

    if (createdProject) {
      return (
        <div className="project-details">
          <h2>Project Created Successfully!</h2>
          <div className="details-container">
            <div className="detail-item">
              <label>Title:</label>
              <p>{createdProject.title}</p>
            </div>
            <div className="detail-item">
              <label>Description:</label>
              <p>{createdProject.description}</p>
            </div>
            <div className="detail-item">
              <label>Budget:</label>
              <p>${createdProject.budget}</p>
            </div>
            <div className="detail-item">
              <label>Deadline:</label>
              <p>{new Date(createdProject.deadline).toLocaleDateString()}</p>
            </div>
            <div className="detail-item">
              <label>Category:</label>
              <p>{createdProject.category}</p>
            </div>
            <div className="detail-item">
              <label>Requirements:</label>
              <ul>
                {createdProject.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={() => setShowEscrow(true)} className="primary-button">
              Proceed to Escrow
            </button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </div>
      );
    }

    return (
      <>
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Budget</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Requirements (comma-separated)</label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              placeholder="e.g., Responsive design, Cross-browser compatibility, Mobile-first approach"
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Create Project</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="project-modal-overlay">
      <div className="project-modal">
        <div className="project-modal-header">
          <h2>{isClientView ? 'New Project Proposal' : 'Creating Project'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="project-modal-content">
          {projectData && (
            <>
              <div className="project-detail">
                <label>Project Title:</label>
                <p>{projectData.title}</p>
              </div>
              <div className="project-detail">
                <label>Description:</label>
                <p>{projectData.description}</p>
              </div>
              <div className="project-detail">
                <label>Budget:</label>
                <p>${projectData.budget}</p>
              </div>
              <div className="project-detail">
                <label>Timeline:</label>
                <p>{projectData.timeline} days</p>
              </div>
            </>
          )}
        </div>

        <div className="project-modal-footer">
          {isClientView && (
            <>
              <button className="accept-button" onClick={handleAccept}>
                Accept Project
              </button>
              <button className="reject-button" onClick={onClose}>
                Reject
              </button>
            </>
          )}
          {!isClientView && (
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 