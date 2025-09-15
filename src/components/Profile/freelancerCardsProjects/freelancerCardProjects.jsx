import React from "react";
import { Card } from "react-bootstrap";
import "./freelancerCardProject.css";

const FreelancerProjectCards = ({ image, specialities, bio }) => {
  return (
    <Card className="portfolio-card">
      {/* Image Container */}
      <div className="fcp-image-container">
        {image ? (
          <img src={image} alt="Portfolio" className="portfolio-image" />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      {/* Card Body */}
      <Card.Body>
        <Card.Text className="card-text">
          {bio || "No bio available for this freelancer."}
        </Card.Text>

        {/* Speciality Tag */}
        <div className="text-input">{specialities || "Creative and Design"}</div> 
      </Card.Body>
    </Card>
  );
};

export default FreelancerProjectCards;
