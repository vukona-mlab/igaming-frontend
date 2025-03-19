import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProjectCard from "../../../components/Profile/FreelancerProjects/ProjectCard";
import FreelancerProjectCards from "../../../components/Profile/freelancerCardsProjects/freelancerCardProjects";
import SectionHeader from "../../../components/Landing/section-header/SectionHeader";
import './freelancerProjectPage.css'
const FreelancerProjects = () => {
  const { freelancer_id } = useParams();
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [freelancerData, setFreelancerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!freelancer_id) {
      setError("Freelancer ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/freelancers/projects/");

        if (!response.ok) throw new Error("Failed to fetch freelancer data");

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (!data || !data.freelancers) {
          throw new Error("Freelancer not found");
        }

        // Filter projects based on freelancer_id
        const freelancer = data.freelancers.find(f => f.id.toString() === freelancer_id);

        if (!freelancer) {
          throw new Error("Freelancer not found");
        }

        setFreelancerData({
          displayName:freelancer.displayName || "",
          profilePicture: freelancer.profilePicture || "https://www.example.com/default-image.jpg",
          specialities: freelancer.specialities || [],
        });

        setProjects(Array.isArray(freelancer.projects) ? freelancer.projects : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [freelancer_id]);

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + 6);
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

      const response = await fetch("http://localhost:8000/api/create-chat", {
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

  console.log(projects);

  return (
    <>
      <Navbar />
      <Container>
      <div className="d-flex justify-content-between align-items-center my-4 name-free">
  <h1 className="m-0">{freelancerData?.displayName}'s Profile</h1>
  <Button variant="dark" className="buttona-message" onClick={() => handleMessageClick(freelancerData.id)}>Message</Button>
</div>

        {loading && <Alert variant="info">Loading projects...</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Row>
            <Col md={3}>
              {freelancerData && (
                <FreelancerProjectCards
                  image={freelancerData.profilePicture}
                  specialities={freelancerData.specialities}
                />
              )}
            </Col>

            <Col md={9}>
              <SectionHeader text="Projects" />
              {projects.length === 0 ? (
                <div className="text-center my-4">
                  <h3>Oops! Freelancer currently does not have projects to display.</h3>
                </div>
              ) : (
                <>
                  <Row className="g-2">
                    {projects.slice(0, visibleProjects).map((project) => (
                      <Col key={project.id} md={4}>
                        <ProjectCard
                          projectPicture={project.projectPicture}
                          projectName={project.projectName}
                          likes={project.likes}
                          authorName={project.author}
                          onDemoClick={() => window.open(project.demoLink, "_blank")}
                          onShareClick={() => alert(`Sharing ${project.projectName}`)}
                        />
                      </Col>
                    ))}
                  </Row>

                  {visibleProjects < projects.length && (
                    <div className="text-center mt-4">
                      <Button variant="dark" onClick={handleSeeMore}>
                        See More
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default FreelancerProjects;