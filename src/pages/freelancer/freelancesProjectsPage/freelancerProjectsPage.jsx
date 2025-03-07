import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProjectCard from "../../../components/Profile/FreelancerProjects/Project-Card";
import FreelancerProjectCards from "../../../components/Profile/freelancerCardsProjects/freelancerCardProjects";
import SectionHeader from '../../../components/Landing/section-header/SectionHeader';
import './freelancerProjectsPage.css';

const FreelancerProjects = () => {
  const { freelancerId } = useParams(); // Get freelancerId from URL
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [freelancerData, setFreelancerData] = useState({
    profilePicture: "https://www.example.com/default-image.jpg",
    specialities: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/freelancers/projects")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.freelancers && Array.isArray(data.freelancers)) {
          const freelancer = data.freelancers.find(
            (freelancer) => freelancer.id === freelancerId
          );

          if (freelancer) {
            setFreelancerData({
              profilePicture: freelancer.profilePicture || "https://www.example.com/default-image.jpg",
              specialities: freelancer.specialities || [],
            });

            const filteredProjects = freelancer.projects
              ? freelancer.projects.filter((project) => project.freelancerId === freelancerId)
              : [];

            setProjects(filteredProjects);
          } else {
            console.error("No freelancer found with the specified ID.");
            setProjects([]);
          }
        } else {
          console.error("Expected freelancers array but received:", data);
          setProjects([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setProjects([]);
      });
  }, [freelancerId]); // Ensure useEffect runs when freelancerId changes

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  const handleMessageClick = () => {
    navigate("/messages");
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="profile-edit d-flex justify-content-between align-items-center border-bottom mb-3">
          <div className="welcome-message">
            <h4 className="wellcome-user">{freelancerData.displayName || "User"}, Profile</h4>
          </div>
          <Button variant="dark" className="sms-btn" onClick={handleMessageClick}>
            Message
          </Button>
        </div>

        <Row>
          <Col md={3}>
            <FreelancerProjectCards
              image={freelancerData.profilePicture}
              specialities={freelancerData.specialities}
            />
          </Col>

          <Col md={9}>
            <Row className="g-2">
              <SectionHeader text="Projects" />
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FreelancerProjects;
