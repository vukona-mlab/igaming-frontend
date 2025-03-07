import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProjectCard from "../../../components/Profile/FreelancerProjects/ProjectCard";
import FreelancerProjectCards from "../../../components/Profile/freelancerCardsProjects/freelancerCardProjects";

const FreelancerProjects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6); // Show 6 projects initially
  const [freelancerData, setFreelancerData] = useState({
    profilePicture: "https://www.example.com/default-image.jpg", // Default Image
    specialities: [],
  });
  const { freelancer_id } = useParams();
  const freelancerIdToShow = freelancer_id || "5Ei0TkC4TUblQ0NVHN46PupY3w83"; // Hardcoded freelancer ID

  useEffect(() => {
    fetch("http://localhost:8000/api/freelancers/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);

        if (data && data.freelancers && Array.isArray(data.freelancers)) {
          const freelancer = data.freelancers.find(
            (freelancer) => freelancer.id === freelancerIdToShow
          );

          if (freelancer) {
            setFreelancerData({
              profilePicture:
                freelancer.profilePicture ||
                "https://www.example.com/default-image.jpg",
              specialities: freelancer.specialities || [],
            });

            const filteredProjects = Array.isArray(freelancer.projects)
              ? freelancer.projects.filter(
                  (project) => project.freelancerId === freelancerIdToShow
                )
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
  }, []);

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <>
      <Navbar />
      {projects.length === 0 ? (
        <div className="text-center my-4">
          <h3>Oops! Freelancer currently does not have projects to display.</h3>
        </div>
      ) : (
        <Container>
          <h1 className="text-center my-4">Freelancer</h1>
          <Row>
            {/* Freelancer Profile Section - Always on Top */}
            <Col md={3}>
              <FreelancerProjectCards
                image={freelancerData.profilePicture}
                specialities={freelancerData.specialities}
              />
            </Col>

            {/* Projects Section - Below Profile on Small Screens */}
            <Col md={9}>
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
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default FreelancerProjects;
