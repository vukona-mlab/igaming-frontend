import React, { useState, useEffect } from "react";
import FreelancerCard from "../Freelancer Card/DpFreelancerCard";
import defaultProfile from "../../assets/clem.jpg";
import messageIcon from "../../assets/message.svg";
import "./FreelancerDiscovery.css";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../SectionContainer";
import BACKEND_URL from "../../config/backend-config";

const FreelancerDiscovery = ({ searchQuery, catergory }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const catergories = {
    GameDevelopment: ["gameart", "gamedesigners"],
    CreativeAndDesign: [
      "animation",
      "charactermodeling",
      "uiuxdesign",
      "imageediting",
    ],
    AudioAndMusic: [],
    QualityAssurance: [],
    ComplianceAndLegal: [],
    ContentAndMarketing: ["typography"],
  };
  const navigation = useNavigate();

  useEffect(() => {
    fetchFreelancers();
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [currentPage, pageSize]);

  const updateColumns = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Check for specific device dimensions first
    if (
      (width === 1920 && height === 1080) ||
      (width === 1366 && height === 768) ||
      (width === 1210 && height === 784)
    ) {
      setColumns(3); // Common laptop resolutions
    } else if (
      (width === 1440 && height === 970) ||
      (width === 1440 && height === 838)
    ) {
      setColumns(3); // 1440px width devices
    } else if (
      (width === 1280 && height === 800) ||
      (width === 1114 && height === 705)
    ) {
      setColumns(3); // MacBook Air and similar devices
    } else if (width === 800 && height === 1280) {
      setColumns(2); // 800x1280 devices
    } else if (width >= 820 && width <= 1180) {
      setColumns(2); // iPad Air
    } else if (width <= 600) {
      setColumns(1);
    } else if (width <= 900) {
      setColumns(2);
    } else if (width >= 768 && width <= 970) {
      setColumns(2); // Specific iPad/Tablet size
    } else if (width >= 971 && width <= 1024) {
      setColumns(3); // Laptop
    } else if (width <= 1200) {
      setColumns(3);
    } else {
      setColumns(4); // Default for larger screens
    }
  };

  const fetchFreelancers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/api/freelancers/projects?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch freelancers");
      }

      const data = await response.json();
      setFreelancers(data.freelancers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMessageClick = async (freelancerId) => {
    try {
      console.log("Freelancer data received:", { freelancerId });

      if (!freelancerId) {
        console.error("FreelancerId is missing");
        return;
      }

      let token = localStorage.getItem("token");
      if (!token) {
        alert("Please sign in to send messages");
        navigation("/client-signin");
        return;
      }

      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }

      const uid = localStorage.getItem("uid");

      const requestData = {
        freelancerId: freelancerId,
        clientId: uid,
        senderId: uid,
        message: "Hello! I'm interested in working with you.", // Add initial message
      };

      console.log("Sending chat request with data:", requestData);
      console.log("Using authorization token:", token);

      const response = await fetch(`${BACKEND_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const data = await response.json();
      console.log("Chat created successfully:", data);

      // Navigate to messaging page with the new chat ID
      navigation(`/messaging-client/${data.chatId}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat. Please try again.");
    }
  };

  const filteredFreelancers = freelancers.filter((freelancer) => {
    if (!searchQuery.trim() && catergory == "") return true; // Show all when no search query

    let searchBool = false;
    let filterBool = false;

    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      const displayName = (
        freelancer.displayName || "Anonymous Freelancer"
      ).toLowerCase();
      const jobTitle = (freelancer.jobTitle || "Freelancer").toLowerCase();

      // Check for multiple search terms
      const searchTerms = searchLower.split(" ");

      searchBool = searchTerms.every((term) => {
        // Check if searching for "anonymous" specifically
        if (term === "anonymous" && displayName.includes("anonymous")) {
          return true;
        }

        // Check if the term matches either name or job title
        return displayName.includes(term) || jobTitle.includes(term);
      });
    }
    if (catergory !== "") {
      const filterTerms = catergories[catergory.replace(/-/g, "")];
      const arr =
        freelancer.categories && freelancer.categories.length > 0
          ? freelancer.categories.map(function (item) {
              return item.toLowerCase();
            })
          : [];
      filterBool = filterTerms.every((term) => {
        // Check if the term matches either name or job title
        return arr.length > 0 ? arr.includes(term) : false;
      });
    }
    return !searchQuery.trim()
      ? filterBool
      : catergory == ""
      ? searchBool
      : searchBool && filterBool;
  });

  if (loading) {
    return <div className="freelancer-discovery-loading">Loading...</div>;
  }

  if (error) {
    return <div className="freelancer-discovery-error">Error: {error}</div>;
  }

  // Group freelancers into rows based on current column count
  const rows = [];
  for (let i = 0; i < filteredFreelancers.length; i += columns) {
    rows.push(filteredFreelancers.slice(i, i + columns));
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                    onClick={() => navigation(`/discovery/${freelancer.id}`)}
                  >
                    <FreelancerCard
                      profilePicture={
                        freelancer.profilePicture || defaultProfile
                      }
                      name={freelancer.displayName || "Anonymous Freelancer"}
                      jobTitle={freelancer.jobTitle || "Freelancer"}
                      projectsCompleted={freelancer.projects?.length || 0}
                      rating={4.5}
                      messageIcon={messageIcon}
                      onMessageClick={() => handleMessageClick(freelancer.id)}
                    />
                    {/* Hover message */}
                    <div className="hover-message">
                      Click image to view more
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No users found</div>
          )}
          {/* Pagination Controls */}
          {rows.length > 0 && (
            <div className="pagination">
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
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
