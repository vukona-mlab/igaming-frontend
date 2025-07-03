import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import BACKEND_URL from "../../../config/backend-config";

const ProjectHeading = ({ title }) => {
  return (
    <div className="th-title">
      {title}
    </div>
  )
}
const ProjectlistContainer = ({ children }) => {
  return (
    <div className="th-transactions-div">
      {children}
    </div>
  )
}
const CompletedProjects = ({ completedProjects, role }) => {
  return (
    <>
      <ProjectHeading title={role === "client" ? "Ongoing Projects" : "Earning History"} />
      <ProjectlistContainer>
        {
          completedProjects && completedProjects.length > 0 && completedProjects.map(project => {
            return <TransactionDetails
              title={project.title}
              price={project.budget}
              requirements={project.requirements}
              description={project.description}
              reference={`REF ${project.id}`}
              date={`${new Date(project.updatedAt._seconds * 1000).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}`}
              buttonText={`Release Funds`}
              showButton={false}
              func={() => handleReleaseFunds(project)}
              lg={"Deposit"}
              sm={"asdf"}
            />
          })
        }
        {
          !completedProjects && completedProjects.length === 0 && (
            <span className="no-projects">No Completed Projects Exist Yet</span>
          )
        }

      </ProjectlistContainer>
    </>

  )
}
const PendingProjects = ({ pendingProjects, role }) => {
  return (
    <>
      <ProjectHeading title={role === "client" ? "Projects Waiting for Funding" : "Earning"} />
      <ProjectlistContainer>
        {
          pendingProjects && pendingProjects.length > 0 && pendingProjects.map(project => {
            return <TransactionDetails
              key={project.id}
              title={project.title}
              price={project.budget}
              requirements={project.requirements}
              description={project.description}
              reference={`REF ${project.id}`}
              date={`${new Date(project.updatedAt._seconds * 1000).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}`}
              buttonText={`Deposit`}
              func={() => handleTransaction(
                project.clientId,
                project.freelancerId,
                project.budget,
                project.clientEmail,
                project.id
              )}
              showButton={true}
            />
          })
        }
        {
          !pendingProjects || pendingProjects.length === 0 && (
            // <span className="no-projects">No Projects Are Currently Pending</span>
            <TransactionDetails message={"No Projects Are Currently Pending"} />
          )
        }

      </ProjectlistContainer>
    </>
  )

}
const TransactionHistory = ({ totalAmount, isClient, project }) => {
  const role = localStorage.getItem("role");
  const clientId = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [completedProjects, setCompletedProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([])
  const [onGoingProjects, setOnGoingProjects] = useState([]);
  const fetchProjects = async () => {
    // setLoading(true);
    // console.log({ token, clientId, role });

    try {
      const response = await axios.get(`${BACKEND_URL}/api/projects/${clientId}`, {
        headers: {
          Authorization: token,
        },
      });

      console.log({ response: response.data.projects });
      const completedProjects = response.data.projects.filter((project) => project.paymentStatus === "completed")
      setCompletedProjects(completedProjects)
      const pendingProjects = response.data.projects.filter(project => project.status === 'approved' && project.paymentStatus === 'pending')
      console.log({ pendingProjects });
      setPendingProjects(pendingProjects)
    } catch (error) {
      console.error("Error fetching projects:", error);
      // setError(error.message);
      if (error.response?.status === 401) {
        navigate("/");
      }
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    console.log({ completedProjects });

  }, [completedProjects])
  const handleTransaction = async (
    clientId,
    freelancerId,
    amount,
    email,
    projectId
  ) => {
    console.log("PP", clientId, freelancerId, amount, email, projectId);
    try {
      const response = await fetch(`${BACKEND_URL}/api/transaction`, {
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
                  `${BACKEND_URL}/api/payment/verify`,
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
  const handleReleaseFunds = async (project) => {
    try {
      // console.log({ patch });

      // if (patch) {
      //   showPayStackModal()
      //   return
      // }
      const response = await fetch(
        `${BACKEND_URL}/api/transaction/release`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            clientId: project.clientId,
            freelancerId: project.freelancerId,
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
    fetchProjects()
  }, [navigate])
  return (
    <div className="TransactionHistory">
      {/* <div className="th-heading-value">
        <div className="th-heading">
          Total {role === "client" ? "Transfer" : "Earned"}
        </div>
        <div className="th-value">ZAR R{totalAmount}</div>
      </div> */}
      <PendingProjects pendingProjects={pendingProjects} role={role} />
      <CompletedProjects completedProjects={completedProjects} role={role} />
      {/* <div className="th-title">
        {role === "client" ? "Transfer" : "Earning"} History
      </div>
      <div className="th-transactions-div">
        {
          completedProjects && completedProjects.length > 0 && completedProjects.map(project => {
            return <TransactionDetails
              message={`You have released R${project.budget} to ${project.freelancerEmail} to conclude ${project.title}`}
              reference={`REF ${project.id}`}
              date={`${new Date(project.updatedAt._seconds * 1000).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}`}
            />
          })
        }

      </div> */}
    </div>
  );
};

export default TransactionHistory;
