import React, { useState, useRef } from "react";
import "./ProjectsTable.css";
import { SlOptionsVertical } from "react-icons/sl";
import ProjectDetails from "../../Projects/ProjectDetails/ProjectDetails";
import SLA from "../SLA/SLA";
import PaystackPop from "@paystack/inline-js";

const ProjectsTable = ({ type, projects }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState("");
  const [currProject, setCurrProject] = useState({});
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showSLA, setShowSLA] = useState(false);
  const [clientId, setClientId] = useState(currProject?.clientId || null);
  const [freelancerId, setFreelancerId] = useState(
    currProject?.freelancerId || null
  );
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleTransaction = async (
    clientId,
    freelancerId,
    amount,
    email,
    projectId
  ) => {
    console.log("PP", clientId, freelancerId, amount, email, projectId);
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
          amount: parseFloat(amount),
          clientEmail: email,
          projectId: projectId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const popup = new PaystackPop();

        popup.resumeTransaction(data.accessCode, {
          onSuccess: async (transaction) => {
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
                      projectId: projectId,
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
  return (
    <div className="ProjectsTable">
      {showProjectDetails && (
        <ProjectDetails
          project={currProject}
          onClose={() => setShowProjectDetails(false)}
        />
      )}
      {showSLA && (
        <SLA project={currProject} onClose={() => setShowSLA(false)} />
      )}
      <table className="pj-table-container">
        <tbody>
          <tr className="pj-table-heading">
            <th className="pj-t-heading">Project Name</th>
            <th className="pj-t-heading">Status</th>
            <th className="pj-t-heading">Project Ref</th>
            <th className="pj-t-heading">
              {type === "client" ? "Freelancer's Email" : "Client's Email"}
            </th>
            <th className="pj-t-heading">Due Date</th>
            <th className="pj-t-heading">Project Requirements</th>
            <th className="pj-t-heading">Actions</th>
          </tr>
          {projects &&
            projects.length > 0 &&
            projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td className="pj-t-data">
                    <div className="pj-project-name">{project.title}</div>
                  </td>
                  <td className="pj-t-data">
                    <div className="pj-project-status">{project.status}</div>
                  </td>
                  <td className="pj-t-data">
                    <span className="pj-project-ref">{project.id}</span>
                  </td>
                  <td className="pj-t-data">
                    <div className="pj-email">
                      {type === "client"
                        ? project.freelancerEmail !== ""
                          ? project.freelancerEmail
                          : "N/A"
                        : project.clientEmail !== ""
                        ? project.clientEmail
                        : "N/A"}
                    </div>
                  </td>

                  <td className="pj-t-data">
                    <div className="pj-deadline">{project.deadline}</div>
                  </td>
                  <td className="pj-t-data">
                    <div className="pj-project-requirements">
                      { project.requirements ? project.requirements[0] : 'N/A'}
                    </div>
                  </td>
                  <td className="pj-t-data pj-context-parent">
                    <div className="pj-action-buttons">
                      <button
                        className="pj-action-button"
                        onClick={() => {
                          setShowProjectDetails(true);
                          setCurrProject(project);
                        }}
                      >
                        View
                      </button>
                      <SlOptionsVertical
                        className="pj-options"
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setCurrent(project.id);
                        }}
                        ref={buttonRef}
                      />
                    </div>
                    {showMenu &&
                      current === project.id &&
                      (type === "freelancer" ? (
                        <div className="pj-context-menu" ref={menuRef}>
                          <div>Project Actions</div>
                          <button>Mark as complete</button>
                          <button>Edit SLA</button>
                          <button>Rate the service</button>
                        </div>
                      ) : (
                        <div className="pj-context-menu" ref={menuRef}>
                          <div>Project Actions</div>
                          <button
                            onClick={() => {
                              setShowSLA(true);
                              setCurrProject(project);
                            }}
                          >
                            View SLA
                          </button>
                          {project.status === "approved" &&
                            project.paymentStatus !== "completed" && (
                              <button
                                onClick={() =>
                                  handleTransaction(
                                    project.clientId,
                                    project.freelancerId,
                                    project.budget,
                                    project.clientEmail,
                                    project.id
                                  )
                                }
                              >
                                Pay project
                              </button>
                            )}
                          <button>Rate the service</button>
                        </div>
                      ))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
