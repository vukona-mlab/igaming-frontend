import React, { useState, useEffect } from "react";
import "./ProjectModal.css";
import { io } from "socket.io-client";
import DocumentIcon from '../../../assets/document-icon.svg';
import PlanOptions from '../ProjectForm/PlanOptions/PlanOptions';
import ProjectDescription from '../ProjectForm/ProjectDescription/ProjectDescription';
import DocumentSection from '../ProjectForm/DocumentSection/DocumentSection';

const ProjectModal = ({
  isOpen,
  onClose,
  chatId,
  isClientView,
  projectData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "Game Development",
    requirements: "",
  });
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [totalBudget, setTotalBudget] = useState(0);
  const [freelancerPackages, setFreelancerPackages] = useState([]);

  // Fetch freelancer's packages when component mounts
  useEffect(() => {
    const fetchFreelancerPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/users/${projectData.freelancerId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFreelancerPackages(data.user.packages || []);
        }
      } catch (error) {
        console.error("Error fetching freelancer packages:", error);
      }
    };

    if (projectData?.freelancerId) {
      fetchFreelancerPackages();
    }
  }, [projectData?.freelancerId]);

  const hasPackages = freelancerPackages && Array.isArray(freelancerPackages) && freelancerPackages.length > 0;

  const getSelectedPlanPrice = () => {
    const selectedPackage = freelancerPackages.find(pkg => pkg.type === selectedPlan);
    return selectedPackage ? parseInt(selectedPackage.price) : 0;
  };

  useEffect(() => {
    const baseBudget = parseInt(formData.budget) || 0;
    const planAmount = hasPackages ? getSelectedPlanPrice() : 0;
    
    setFormData(prev => ({
      ...prev,
      budget: (baseBudget + planAmount).toString()
    }));
  }, [selectedPlan, freelancerPackages, hasPackages]);

  const categories = [
    "Game Development",
    "Creative & Design",
    "Audio & Music",
    "Content & Marketing",
    "Quality Assurance",
    "Compliance & Legal",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!projectData.clientId || !projectData.freelancerId) {
        console.error("Missing required IDs:", { projectData });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...formData,
            budget: totalBudget.toString(), // Use the total budget including plan amount
            clientId: projectData.clientId,
            freelancerId: projectData.freelancerId,
            requirements: formData.requirements
              .split(",")
              .map((req) => req.trim()),
            deadline: parseInt(formData.deadline),
            chatId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const socket = io(import.meta.env.VITE_API_URL);
        socket.emit("project-created", {
          chatId,
          projectData: {
            ...data.project,
            clientId: projectData.clientId,
            freelancerId: projectData.freelancerId,
          },
        });
        onClose();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectData.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            status: "approved",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to approve project");
      }

      const socket = io(import.meta.env.VITE_API_URL);
      socket.emit("project-status-update", {
        chatId,
        projectId: projectData.id,
        status: "approved",
      });

      onClose();
    } catch (error) {
      console.error("Error approving project:", error);
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectData.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            status: "rejected",
          }),
        }
      );

      if (response.ok) {
        const socket = io(import.meta.env.VITE_API_URL);
        socket.emit("project-status-updated", {
          chatId,
          projectId: projectData.id,
          status: "rejected",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error rejecting project:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="project-modal-overlay">
      <div className="project-modal">
        <div className="project-modal-header">
          <h2>{isClientView ? "Service Level Agreement Details" : "Service Level Agreement"}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="project-modal-content">
          {isClientView ? (
            <div className="project-form-container">
              <div className="sla-section">
                <ProjectDescription />

                <DocumentSection 
                  documentName="777SpiningGameRequirements.PDF"
                  documentIcon={DocumentIcon}
                />

                <div className="price-section">
                  <div className="price-row">
                    <span>Price</span>
                    <span>R{projectData.budget > 0 ? projectData.budget : 1000}</span>

                  </div>
                  {hasPackages && (
                    <div className="price-row">
                      <span>Checkout price</span>
                      <span>R{parseInt(projectData.budget) + getSelectedPlanPrice()}</span>
                    </div>
                  )}
                </div>

                <div className="button-group">
                  <button className="decline-btn" onClick={handleReject}>Decline SLA</button>
                  <button className="accept-btn" onClick={handleApprove}>Accept SLA</button>
                </div>

                <p className="disclaimer">By accepting the SLA, you are confirming that every information on SLA is correct and valid.</p>
              </div>

              <div className="pricing-section">
                <PlanOptions 
                  selectedPlan={selectedPlan}
                  onPlanChange={setSelectedPlan}
                  planPrices={freelancerPackages}
                />
                {hasPackages && (
                  <div className="total-budget-section">
                    <div className="total-budget-row">
                      <span>Base Budget:</span>
                      <span>R{(parseInt(formData.budget) - getSelectedPlanPrice()) || '0'}</span>
                    </div>
                    <div className="total-budget-row">
                      <span>Plan Amount:</span>
                      <span>R{getSelectedPlanPrice()}</span>
                    </div>
                    <div className="total-budget-row total">
                      <span>Total Budget:</span>
                      <span>R{formData.budget || '0'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="project-form-container">
              <div className="sla-section">
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 777 Spinning Game Development"
                  />
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project in detail. Include key features, objectives, and any specific requirements."
                  />
                </div>

                <div className="form-group">
                  <label>Base Budget (R):</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Enter the base amount for the project"
                  />
                </div>

                <div className="form-group">
                  <label>Deadline (days):</label>
                  <input
                    type="number"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Number of days to complete the project"
                  />
                </div>

                <div className="form-group">
                  <label>Category:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Requirements (comma-separated):</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="e.g., Responsive design, SEO optimization, Mobile-friendly, Cross-browser compatibility"
                    required
                  />
                </div>

                <div className="button-group">
                  <button type="button" className="decline-btn" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="accept-btn">
                    Create Project
                  </button>
                </div>
              </div>

              <div className="pricing-section">
                <PlanOptions 
                  selectedPlan={selectedPlan}
                  onPlanChange={setSelectedPlan}
                  planPrices={freelancerPackages}
                />
                {hasPackages && (
                  <div className="total-budget-section">
                    <div className="total-budget-row">
                      <span>Base Budget:</span>
                      <span>R{(parseInt(formData.budget) - getSelectedPlanPrice()) || '0'}</span>
                    </div>
                    <div className="total-budget-row">
                      <span>Plan Amount:</span>
                      <span>R{getSelectedPlanPrice()}</span>
                    </div>
                    <div className="total-budget-row total">
                      <span>Total Budget:</span>
                      <span>R{formData.budget || '0'}</span>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
