import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProjectCard from "../../../components/Project Card/ProjectCard";

const FreelancerProjects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6); // Show 6 projects initially
  const freelancerIdToShow = "5Ei0TkC4TUblQ0NVHN46PupY3w83"; // Hardcoded freelancer ID

  useEffect(() => {
    fetch("http://localhost:8000/api/freelancers/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data

        if (data && data.freelancers && Array.isArray(data.freelancers)) {
          // Find the freelancer by their ID
          const freelancer = data.freelancers.find(
            (freelancer) => freelancer.id === freelancerIdToShow
          );

          if (freelancer) {
            // If the freelancer exists, filter their projects
            const filteredProjects = Array.isArray(freelancer.projects)
              ? freelancer.projects.filter(
                  (project) => project.freelancerId === freelancerIdToShow
                )
              : []; // If no projects array exists, return an empty array

            // Update state with filtered projects (even if empty)
            setProjects(filteredProjects);
          } else {
            console.error("No freelancer found with the specified ID.");
            setProjects([]); // In case no freelancer is found, return an empty array
          }
        } else {
          console.error("Expected freelancers array but received:", data);
          setProjects([]); // If data.freelancers is not an array, set an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setProjects([]); // If there's an error, set an empty array
      });
  }, []);

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + 6); // Increase the visible projects by 6
  };

  return (
    <>
      <Navbar />
      <Container>
        <h1 className="text-center my-4">Freelancer Projects</h1>
        <Row>
          <Col xs={12}>
            <Row className="g-4">
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
                <Button variant="darck" onClick={handleSeeMore}>See More</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FreelancerProjects;
