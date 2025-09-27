import React, { useState, useEffect } from "react";
import FreelancerCard from "../Freelancer Card/DpFreelancerCard";
import defaultProfile from "../../assets/clem.jpg";
import messageIcon from "../../assets/message.svg";
import "./FreelancerDiscovery.css";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../SectionContainer";
import BACKEND_URL from "../../config/backend-config";
import Swal from "sweetalert2";

const FreelancerDiscovery = ({ searchQuery, category, disabled }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFreelancers();
  }, [searchQuery, category, currentPage]);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const showError = (message) => {
    Swal.fire({
      title: "Oops...",
      text: message,
      icon: "error",
    });
  };

  const updateColumns = () => {
    const width = window.innerWidth;
    if (width <= 600) setColumns(1);
    else if (width <= 900) setColumns(2);
    else if (width <= 1200) setColumns(3);
    else setColumns(4);
  };

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/api/freelancers?category=${category}&search=${searchQuery}&page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch freelancers");

      const data = await response.json();
      setFreelancers(data.freelancers);
      setTotalPages(Math.ceil(data.totalCount / pageSize) || 1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showError(err.message || "Failed to load freelancers");
    }
  };

  const handleMessageClick = async (freelancerId) => {
    try {
      if (!freelancerId) return;

      let token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Sign In Required",
          text: "Please sign in to send messages",
        });
        navigate("/client-signin");
        return;
      }

      if (!token.startsWith("Bearer ")) token = `Bearer ${token}`;
      const uid = localStorage.getItem("uid");

      if (uid === freelancerId) {
        showError("Cannot send message to yourself.");
        return;
      }

      const requestData = {
        freelancerId,
        clientId: uid,
        senderId: uid,
        message: "Hello! I'm interested in working with you.",
      };

      const response = await fetch(`${BACKEND_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to create chat");

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Chat Created",
        text: "You can now chat with this freelancer.",
      }).then(() => {
        navigate(`/messaging-client/${data.chatId}`);
      });
    } catch (err) {
      showError(err.message || "Failed to create chat.");
    }
  };

  if (loading) {
    return (
      <div className="freelancer-discovery-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="freelancer-discovery-error">Error: {error}</div>;
  }

  // Group freelancers into rows based on columns
  const rows = [];
  for (let i = 0; i < freelancers.length; i += columns) {
    rows.push(freelancers.slice(i, i + columns));
  }

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <SectionContainer>
      <div style={{ padding: "20px" }}>
        <div className="freelancer-discovery">
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <div key={rowIndex} className="freelancer-row">
                {row.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="freelancer-card-wrapper"
                    onClick={() => navigate(`/discovery/${freelancer.id}`)}
                  >
                    <FreelancerCard
                      profilePicture={freelancer.profilePicture || defaultProfile}
                      name={freelancer.displayName || "Anonymous Freelancer"}
                      jobTitle={freelancer.jobTitle || "Freelancer"}
                      projectsCompleted={freelancer.projects?.length || 0}
                      rating={4.5}
                      messageIcon={messageIcon}
                      onMessageClick={() => handleMessageClick(freelancer.id)}
                      disabled={disabled}
                    />
                    <div className="hover-message">Click image to view more</div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No users found</div>
          )}

          {rows.length > 0 && (
            <div className="pagination">
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FreelancerDiscovery;
