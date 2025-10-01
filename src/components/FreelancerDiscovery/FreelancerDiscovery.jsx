import React, { useState, useEffect, useRef } from "react";
import FreelancerCard from "../Freelancer Card/DpFreelancerCard";
import defaultProfile from "../../assets/clem.jpg";
import messageIcon from "../../assets/message.svg";
import "./FreelancerDiscovery.css";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../SectionContainer";
import BACKEND_URL from "../../config/backend-config";
import Swal from "sweetalert2";

const FreelancerDiscovery = ({ searchQuery, category, disabled }) => {
  const [freelancers, setFreelancers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(4);
  const [reviews, setReviews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [categories, setCategories] = useState([]);
  const cacheRef = useRef({}); // cache API responses
  const navigate = useNavigate();

  // Dynamically fetch freelancers whenever searchQuery or category changes
  useEffect(() => {
    const key = `${category || "all"}-${searchQuery || ""}`;

    // If cached, use cache
    if (cacheRef.current[key]) {
      setFreelancers(cacheRef.current[key]);
      setCategories([
        ...new Set(cacheRef.current[key].map(f => f.category).filter(Boolean)),
      ]);
      setLoading(false);
      return;
    }

    fetchFreelancers(key);
  }, [searchQuery, category]);

  // Initial fetch on mount
  useEffect(() => {
    fetchFreelancers();
  }, []);

  // Adjust columns for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) setColumns(1);
      else if (width <= 900) setColumns(2);
      else if (width <= 1200) setColumns(3);
      else setColumns(4);
    };

    handleResize(); // initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showError = (message) => {
    Swal.fire({
      title: "Oops...",
      text: message,
      icon: "error",
    });
  };

  // Fetch freelancers from API with optional search & category filtering
  const fetchFreelancers = async (cacheKey) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/api/freelancers?search=${searchQuery || ""}&category=${category || ""}`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      if (!response.ok) throw new Error("Failed to fetch freelancers");

      const data = await response.json();
      console.log("Fetched freelancers data", data);

      setFreelancers(data.freelancers);
      setCategories([...new Set(data.freelancers.map(f => f.category).filter(Boolean))]);
      setTotalPages(Math.ceil(data.freelancers.length / pageSize));
      setCurrentPage(1);

      // Cache the fetched data
      if (cacheKey) cacheRef.current[cacheKey] = data.freelancers;

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showError(err.message || "Failed to load freelancers");
    }
  };

  // Fetch reviews for each freelancer
  const fetchReviews = async (freelancerId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews/${freelancerId}`);
      const data = await res.json();
      setReviews(prev => ({ ...prev, [freelancerId]: data.averageRating }));
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  // Handle sending a message to a freelancer
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
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to create chat");

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Chat Created",
        text: "You can now chat with this freelancer.",
      }).then(() => navigate(`/messaging-client/${data.chatId}`));
    } catch (err) {
      showError(err.message || "Failed to create chat.");
    }
  };

  if (loading) return <div className="freelancer-discovery-loading"><div className="spinner"></div></div>;
  if (error) return <div className="freelancer-discovery-error">Error: {error}</div>;

  // Calculate paginated rows
  const rows = [];
  for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize && i < freelancers.length; i += columns) {
    rows.push(freelancers.slice(i, i + columns));
  }

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <SectionContainer>
      <div style={{ padding: "20px" }}>
        <div className="category-suggestions">
          {categories.map((c) => (
            <span
              key={c}
              className={`category-tag ${category === c ? "active" : ""}`}
              onClick={() => {
                const newCategory = category === c ? "" : c;
                fetchFreelancers(); // refetch on category click
              }}
            >
              {c}
            </span>
          ))}
        </div>

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
                      rating={reviews[freelancer.id] || 0} 
                      messageIcon={messageIcon}
                      onMessageClick={() => handleMessageClick(freelancer.id)}
                      disabled={disabled}
                    />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No users found</div>
          )}

          {rows.length > 0 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
            </Pagination>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FreelancerDiscovery;
