import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./EscrowForm.css";
import Modal from 'react-bootstrap/Modal';
import TermsModal from './TermsModal';

const EscrowForm = ({ 
  onSubmit, 
  freelancerId, 
  clientId, 
  existingEscrow, 
  project,
  isModal = false,
  onClose
}) => {
  console.log('Project data received:', project);
  const [description, setDescription] = useState("");
  const [milestoneList, setMilestoneList] = useState([
    { description: '', dueDate: '' }
  ]);
  const [paymentMethod, setPaymentMethod] = useState("wire");
  const [clientEmail, setClientEmail] = useState("");
  const [freelancerEmail, setFreelancerEmail] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Fetch user emails when component mounts or IDs change
  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch client details using the correct endpoint
        const clientResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${clientId}`, {
          headers: {
            Authorization: token
          }
        });
        const clientData = await clientResponse.json();
        setClientEmail(clientData.user.email);

        // Fetch freelancer details using the correct endpoint
        const freelancerResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${freelancerId}`, {
          headers: {
            Authorization: token
          }
        });
        const freelancerData = await freelancerResponse.json();
        setFreelancerEmail(freelancerData.user.email);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (clientId && freelancerId) {
      fetchUserEmails();
    }
  }, [clientId, freelancerId]);

  useEffect(() => {
    if (existingEscrow) {
      setDescription(existingEscrow.description || "");
      setMilestoneList(existingEscrow.milestones || [{ description: '', dueDate: '' }]);
    } else if (project) {
      if (project?.description) {
        console.log('Setting description:', project.description);
        setDescription(project.description);
      }
      // Convert project requirements to milestone format with equal distribution
      const initialMilestones = project.requirements
        ? project.requirements.map((req) => ({
            description: req,
            dueDate: ''
          }))
        : [{ description: '', dueDate: '' }];
      setMilestoneList(initialMilestones);
    }
  }, [existingEscrow, project]);

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestoneList];
    newMilestones[index][field] = value;
    setMilestoneList(newMilestones);
  };

  const addMilestone = () => {
    setMilestoneList([...milestoneList, { description: '', dueDate: '' }]);
  };

  const removeMilestone = (index) => {
    if (milestoneList.length > 1) {
      const newMilestones = milestoneList.filter((_, i) => i !== index);
      setMilestoneList(newMilestones);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Please accept the Terms and Conditions to proceed");
      return;
    }

    try {
      // Use project budget directly for escrow amount
      const escrowData = {
        projectId: project.id,
        clientId,
        freelancerId,
        amount: parseFloat(project.budget),
        status: 'pending',
        description,
        milestones: milestoneList.map(milestone => ({
          ...milestone,
          amount: (parseFloat(project.budget) / milestoneList.length).toFixed(2)
        })),
        payment_method: paymentMethod,
        buyer: {
          email: clientEmail,
          id: clientId
        },
        seller: {
          email: freelancerEmail,
          id: freelancerId
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: []
      };

      onSubmit(escrowData);
    } catch (error) {
      console.error("Error creating escrow transaction:", error);
    }
  };

  return (
    <div className="project-details-content">
      <Form onSubmit={handleSubmit}>
        <div className="detail-group">
          <h3>Project Information</h3>
          <div className="detail-item">
            <span className="detail-label">Client:</span>
            <span className="detail-value">{project?.clientName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Freelancer:</span>
            <span className="detail-value">{project?.freelancerName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Budget:</span>
            <span className="detail-value total-amount">R {parseFloat(project?.budget).toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Description:</span>
            <textarea
              className="form-control"
              value={description || project?.description || ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the project deliverables and terms..."
              required
              readOnly={true}
            />
          </div>
        </div>

        <div className="detail-group">
          <h3>Milestone Schedule</h3>
          <div className="milestone-list">
            {milestoneList.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <div className="milestone-header">
                  <h4>Milestone {index + 1}</h4>
                  {milestoneList.length > 1 && (
                    <button 
                      type="button" 
                      className="close-button"
                      onClick={() => removeMilestone(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Description:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={milestone.description}
                    onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                    placeholder="What needs to be delivered?"
                    required
                  />
                </div>

                <div className="detail-item">
                  <span className="detail-label">Due Date:</span>
                  <input
                    type="date"
                    className="form-control"
                    value={milestone.dueDate}
                    onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-milestone"
              onClick={addMilestone}
            >
              + Add Another Milestone
            </button>
          </div>
        </div>

        <div className="detail-group">
          <h3>Terms and Conditions</h3>
          <button 
            type="button"
            className="view-terms-button"
            onClick={() => setShowTermsModal(true)}
          >
            View Complete Terms & Conditions
          </button>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`detail-value ${acceptedTerms ? 'status approved' : 'status pending'}`}>
              {acceptedTerms ? '✓ Terms & Conditions Accepted' : '* Review and accept the Terms & Conditions to proceed'}
            </span>
          </div>
        </div>

        <div className="project-actions">
          <button 
            type="button" 
            className="reject-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="approve-button"
            disabled={!acceptedTerms}
          >
            {existingEscrow ? 'Update Agreement' : 'Create Agreement'}
          </button>
        </div>
      </Form>

      <TermsModal
        show={showTermsModal}
        onHide={() => setShowTermsModal(false)}
        onAccept={setAcceptedTerms}
        accepted={acceptedTerms}
      />
    </div>
  );
};

export default EscrowForm;
