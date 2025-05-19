import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectDetails.css";
import { io } from "socket.io-client";
import PaystackPop from "@paystack/inline-js";
import TermsModal from "../../Escrow/TermsModal";
import DocumentIcon from '../../../assets/document-icon.svg';
import DocumentSection from '../ProjectForm/DocumentSection/DocumentSection';

const ProjectDetails = ({ project, onClose, isClient }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const [clientId, setClientId] = useState(project?.clientId || null);
  const [freelancerId, setFreelancerId] = useState(
    project?.freelancerId || null
  );
  const [clientDetails, setClientDetails] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const token = localStorage.getItem("token");

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
      const clientResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/users/${project.clientId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const clientData = await clientResponse.json();
      setClientDetails(clientData.user);

      // Fetch freelancer details if available
      if (project.freelancerId) {
        const freelancerResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/users/${
            project.freelancerId
          }`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
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

      if (action === "reject" || action === "delete") {
        // Delete the project if rejected by client or deleted by freelancer
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects/${project.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.ok) {
          // Emit socket event for project deletion/rejection
          const socket = io(import.meta.env.VITE_API_URL);
          socket.emit("project-status-updated", {
            chatId: project.chatId,
            projectId: project.id,
            status: action === "reject" ? "rejected" : "deleted",
            message:
              action === "reject"
                ? "Project has been rejected"
                : "Project has been deleted",
          });
          onClose();
        }
      } else if (action === "approve") {
        // Update project status to approved
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects/${project.id}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ status: "approved" }),
          }
        );

        if (response.ok) {
          await handleTransaction();
          // Emit socket event for project approval
          const socket = io(import.meta.env.VITE_API_URL);
          socket.emit("project-status-updated", {
            chatId: project.chatId,
            projectId: project.id,
            status: "approved",
            message: "Project has been approved",
          });
          onClose();
        }
      }
    } catch (error) {
      console.error("Error handling project action:", error);
    }
  };

  const handleTransaction = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          clientId: clientId,
          freelancerId: freelancerId,
          amount: parseFloat(project.budget),
          clientEmail: clientDetails.email,
          projectId: project.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const popup = new PaystackPop();

        popup.resumeTransaction(data.accessCode, {
          onSuccess: async (transaction) => {
            console.log(transaction);
            if (transaction.status === "success") {
              try {
                const res = await fetch(
                  "http://localhost:8000/api/payment/verify",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: token,
                    },
                    body: JSON.stringify({
                      reference: transaction.reference,
                      clientId: clientId,
                      projectId: project.id,
                    }),
                  }
                );

                const verificationData = await res.json();
                if (res.ok) {
                  alert("Payment successful! Transaction has been verified.");
                  // Refresh the project details to show updated payment status
                  window.location.reload();
                } else {
                  alert(
                    `Payment verification failed: ${verificationData.error}`
                  );
                }
              } catch (verifyError) {
                alert("Error verifying payment. Please contact support.");
                console.error("Verification error:", verifyError);
              }
            }
          },

          onLoad: (response) => {
            console.log("onLoad: ", response);
          },

          onCancel: () => {
            alert("Transaction was cancelled");
          },

          onError: (error) => {
            alert(`Error during payment: ${error.message}`);
            console.error("Payment error:", error);
          },
        });
      } else {
        alert(`Failed to create transaction: ${data.error}`);
      }
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Error starting transaction. Please try again.");
    }
  };
  const showPayStackModal = () => {
    console.log('show modaol');
    const popup = new PaystackPop();
    popup.resumeTransaction('3mgtch2520mivz4')
  }
  const handleReleaseFunds = async ({ patch }) => {
    try {
      console.log({ patch });
      
      if(patch) {
        showPayStackModal()
        return
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transaction/release`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            clientId: clientId,
            freelancerId: freelancerId,
            transactionReference: project.payments[0].transactionId,
            projectId: project.id,
            clientApproval: true,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        if (data.needsBankAccount) {
          alert(
            "The freelancer needs to set up their bank account before funds can be released. Please ask them to update their payment details."
          );
        } else {
          alert(data.error || "Error releasing funds");
        }
      }
    } catch (error) {
      console.error("Release funds error:", error);
      alert("Error releasing funds. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      if (project.payments && project.payments.length > 0) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/transaction/${
              project.payments[0].transactionId
            }/status?clientId=${clientId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const data = await response.json();
          if (response.ok && data.status === "released") {
            // Update local state to reflect released status
            setProject((prev) => ({
              ...prev,
              paymentStatus: "released",
            }));
          }
        } catch (error) {
          console.error("Error fetching transaction status:", error);
        }
      }
    };

    fetchTransactionStatus();
  }, [project.payments, clientId, token]);

  console.log(project);
  return (
    <div className="project-details-modal-overlay">
      <div className="project-details-modal">
        <div className="project-details-header">
          <h2>Service Level Agreement</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="project-details-content">
          <div className="project-form-container">
            <div className="sla-section">
              
              <div className="form-group">
                <label>Title:</label>
                <p className="form-value">{project.title}</p>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <p className="form-value">{project.description}</p>
              </div>

              <div className="form-group">
                <label>Base Budget (R):</label>
                <p className="form-value">{project.budget}</p>
              </div>

              <div className="form-group">
                <label>Deadline (days):</label>
                <p className="form-value">{project.deadline}</p>
              </div>

              <div className="form-group">
                <label>Category:</label>
                <p className="form-value">{project.category}</p>
              </div>

              <div className="form-group">
                <label>Requirements:</label>
                <ul className="requirements-list">
                  {project.requirements && Array.isArray(project.requirements) ? (
                    project.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))
                  ) : (
                    <li>No requirements specified</li>
                  )}
                </ul>
              </div>

              {project.document && (
                <DocumentSection 
                  documentName={project.document.name}
                  documentIcon={DocumentIcon}
                />
              )}

              <div className="price-section">
                <div className="price-row">
                  <span>Price</span>
                  <span>R{project.budget > 0 ? project.budget : 1000}</span>
                </div>
              </div>

              <div className="button-group">
                {isClient && project.status === "pending" && (
                  <>
                    <button className="decline-btn" onClick={() => handleProjectAction("reject")}>
                      Decline SLA
                    </button>
                    <button className="accept-btn" onClick={() => handleProjectAction("approve")}>
                      Accept SLA
                    </button>
                  </>
                )}
                {isClient && project.status === "approved" && (
                  <div className="transaction-container">
                    {!project.payments || project.payments.length === 0 ? (
                      <button className="accept-btn" onClick={() => handleTransaction()}>
                        Pay Now
                      </button>
                    ) : (
                      <>
                        <div className="transaction-status">
                          <span className="status-label">Payment Status:</span>
                          <span className={`status-value ${project.paymentStatus}`}>
                            {project.paymentStatus.charAt(0).toUpperCase() + project.paymentStatus.slice(1)}
                          </span>
                        </div>
                        <button
                          className={`accept-btn ${project.paymentStatus === "released" ? "released" : ""}`}
                          onClick={() => handleReleaseFunds({ patch: true })}
                          disabled={project.paymentStatus === "released"}
                        >
                          {project.paymentStatus === "released" ? "Funds Released" : "Release funds"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <p className="disclaimer">By accepting the SLA, you are confirming that every information on SLA is correct and valid.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
