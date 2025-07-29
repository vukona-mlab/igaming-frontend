import React, { useEffect, useState } from "react";
import withProfileCheck from "../../../components/Common/withProfileCheck";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProjectCard from "../../../components/Profile/FreelancerProjects/ProjectCard";
import FreelancerProjectCards from "../../../components/Profile/freelancerCardsProjects/freelancerCardProjects";
import SectionHeader from "../../../components/Landing/section-header/SectionHeader";
import FreelancerProfileHeader from "../../../components/FreelancerProfileHeader/FreelancerProfileHeader";
import ReviewForm from "../../../components/Reviews/ReviewForm/ReviewForm";
import "./freelancerProjectPage.css";
import SectionContainer from "../../../components/SectionContainer";
import BACKEND_URL from "../../../config/backend-config";

const FreelancerProjects = (props) => {
  // const { freelancer_id } = useParams();
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsError, setReviewsError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [freelancerData, setFreelancerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState("Profile");
  const [bio, setBio] = useState("");
  const navigation = useNavigate();

  const location = useLocation();
  //console.log({ location });
  const freelancer_id = location.pathname.split("/")[2];
  //console.log({ id: freelancer_id });
  useEffect(() => {
    fetchProjects();
    fetchReviews();
    fetchFreelancerData();
  }, [freelancer_id]);
  const fetchProjects = async () => {
    if (freelancer_id) {
      //console.log({ freelancer_id });
      const response = await fetch(
        `${BACKEND_URL}/api/freelancers/projects/${freelancer_id}`
      );
      if (response.ok) {
        const data = await response.json();
        //console.log(console.log({ data: data }));
        setProjects(data.projects);
      }
    }
  };
  const fetchFreelancerData = async () => {
    if (freelancer_id) {
      const response = await fetch(
        `${BACKEND_URL}/api/freelancers/${freelancer_id}`
      );
      if (response.ok) {
        const freelanceData = await response.json();
        console.log({ freelancerData: freelanceData.freelancer.bio });
        setBio(freelanceData.freelancer.bio);
        setFreelancerData(freelanceData.freelancer);
      }
    }
  };
  const fetchReviews = async () => {
    if (freelancer_id) {
      try {
        let token = localStorage.getItem("token");
        if (!token) {
          console.log("No authentication token found");
          setLoading(false);
          return;
        }

        if (!token.startsWith("Bearer ")) {
          token = `Bearer ${token}`;
        }
        console.log("Fetching reviews for freelancer:", freelancer_id);
        const reviewsResponse = await fetch(
          `${BACKEND_URL}/api/reviews?freelancerId=${freelancer_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const reviewsData = await reviewsResponse.json();
        console.log("Reviews response:", reviewsData);

        if (reviewsResponse.ok) {
          const allReviews = reviewsData.reviews || [];
          const approvedReviews = allReviews.filter(
            (review) => review.status === "Approved"
          );
          setReviews(approvedReviews);
          setReviewsError(null);
          setLoading(false);
        } else {
          console.error("Reviews fetch failed:", reviewsData);
          setReviews([]);
          setReviewsError(
            reviewsData.error || "No approved reviews available at this time."
          );
          setLoading(false);
        }
      } catch (reviewError) {
        console.error("Error fetching reviews:", reviewError);
        setReviews([]);
        setReviewsError(
          "There was a problem loading the reviews. Please try refreshing the page."
        );
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    // fetchProjects()
    // return;
    if (!freelancer_id) {
      setError("Freelancer ID is missing.");
      setLoading(false);
      return;
    }

    console.log("Fetching freelancer projects and data..." + freelancerData) ;

    const fetchData = async () => {
      try {
        // Get authentication token
        let token = localStorage.getItem("token");
        if (!token) {
          console.log("No authentication token found");
          setLoading(false);
          return;
        }

        if (!token.startsWith("Bearer ")) {
          token = `Bearer ${token}`;
        }

        // Fetch freelancer data
        const response = await fetch(
          `${BACKEND_URL}/api/freelancers/projects/`
        );
        if (!response.ok) throw new Error("Failed to fetch freelancer data");
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (!data || !data.freelancers) {
          throw new Error("Freelancer not found");
        }

        const freelancer = data.freelancers.find(
          (f) => f.id.toString() === freelancer_id
        );
        if (!freelancer) {
          throw new Error("Freelancer not found");
        }

        setFreelancerData({
          displayName: freelancer.displayName || "",
          profilePicture:
            freelancer.profilePicture ||
            "https://www.example.com/default-image.jpg",
          specialities: freelancer.specialities || [],
          id: freelancer.id,
          packages: freelancer.packages || {},
        });

        // Transform projects data
        const transformedProjects = Array.isArray(freelancer.projects)
          ? freelancer.projects.map((project) => ({
              id: project.id,
              projectPicture: project.projectPicture || project.image,
              projectName: project.projectName || project.name,
              likes: project.likes || 0,
              authorName: freelancer.displayName,
            }))
          : [];

        setProjects(transformedProjects);

        // Fetch reviews for the freelancer with authentication
        try {
          console.log("Fetching reviews for freelancer:", freelancer_id);
          const reviewsResponse = await fetch(
            `${BACKEND_URL}/api/reviews?freelancerId=${freelancer_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const reviewsData = await reviewsResponse.json();
          console.log("Reviews response:", reviewsData);

          if (reviewsResponse.ok) {
            const allReviews = reviewsData.reviews || [];
            const approvedReviews = allReviews.filter(
              (review) => review.status === "Approved"
            );
            setReviews(approvedReviews);
            setReviewsError(null);
            setLoading(false);
          } else {
            console.error("Reviews fetch failed:", reviewsData);
            setReviews([]);
            setReviewsError(
              reviewsData.error || "No approved reviews available at this time."
            );
            setLoading(false);
          }
        } catch (reviewError) {
          console.error("Error fetching reviews:", reviewError);
          setReviews([]);
          setReviewsError(
            "There was a problem loading the reviews. Please try refreshing the page."
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [freelancer_id]);

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  const handleMessageClick = async (freelancerId, price) => {
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
        message: price
          ? `Hello! I'm interested in working with you, currently looking at the R${price} package.`
          : "Hello! I'm interested in working with you.",
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

      navigation(`/messaging-client/${data.chatId}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat. Please try again.");
    }
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const shouldShowSidebar = currentTab === "Profile";

  const handleReviewSubmit = async (stars, message) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "Please sign in to submit a review",
        });
        return;
      }

      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }

      const clientId = localStorage.getItem("uid");

      if (!clientId) {
        Swal.fire({
          icon: "error",
          title: "Client Login Required",
          text: "You must be logged in as a client to submit a review",
        });
        return;
      }

      const reviewData = {
        clientId,
        freelancerId: freelancer_id,
        stars,
        message,
      };

      console.log("Submitting review:", reviewData);

      // Show loading state
      Swal.fire({
        title: "Submitting Review",
        text: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      const responseData = await response.json();
      console.log("Review submitted successfully:", responseData);

      // Show success message with SweetAlert
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Your review has been submitted and is pending approval.",
        confirmButtonText: "Great!",
        confirmButtonColor: "#4CAF50",
      });

      // Refresh reviews after submission to show pending review
      try {
        const refreshedReviewsResponse = await fetch(
          `${BACKEND_URL}/api/reviews?freelancerId=${freelancer_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (refreshedReviewsResponse.ok) {
          const refreshedReviewsData = await refreshedReviewsResponse.json();
          const allReviews = refreshedReviewsData.reviews || [];
          // We can show all reviews including pending ones, or filter to approved only
          const approvedReviews = allReviews.filter(
            (review) => review.status === "Approved"
          );
          setReviews(approvedReviews);
          setReviewsError(null);
        }
      } catch (refreshError) {
        console.error("Error refreshing reviews:", refreshError);
      }
    } catch (error) {
      console.error("Error submitting review:", error);

      // Show error message with SweetAlert
      Swal.fire({
        icon: "error",
        title: "Review Submission Failed",
        text: error.message || "Failed to submit review. Please try again.",
      });
    }
  };
  useEffect(() => {
    console.log({ freelancerData });
  }, [freelancerData]);

  return (
    <>
      <Navbar />
      <SectionContainer padding={20}>
        <Container fluid className="main-container">
          <div className="content-wrapper">
            <div className="d-flex justify-content-between align-items-center my-4 name-free p-2">
              <h1 className="m-0">{freelancerData?.displayName}'s Profile</h1>
              <Button
                variant="dark"
                className="buttona-message"
                onClick={() => handleMessageClick(freelancerData?.id)}
              >
                Message
              </Button>
            </div>

            {loading && <Alert variant="info">Loading projects...</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
              <Row style={{ width: "100%", margin: "auto" }}>
                {shouldShowSidebar && (
                  <Col md={3} className="sidebar-col">
                    {freelancerData && (
                      <FreelancerProjectCards
                        image={freelancerData.profilePicture}
                        specialities={freelancerData.specialities}
                        bio={bio}
                      />
                    )}
                  </Col>
                )}

                <Col
                  md={shouldShowSidebar ? 9 : 12}
                  style={{ backgroundColor: "#0000" }}
                  he
                >
                  <FreelancerProfileHeader
                    searchTerm={freelancerData?.displayName}
                    onTabChange={handleTabChange}
                    projects={projects}
                    packages={freelancerData?.packages}
                    reviews={reviews}
                    reviewsError={reviewsError}
                    onReviewSubmit={handleReviewSubmit}
                    handleMessageClick={(price) =>
                      handleMessageClick(freelancerData?.id, price)
                    }
                  />
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </SectionContainer>
    </>
  );
};

export default withProfileCheck(FreelancerProjects);
