import React from "react";
import { Card } from "react-bootstrap";
import "./freelancerCardProject.css";

const FreelancerProjectCards = ({ image, speciality }) => {
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam metus, volutpat nec congue in
        </Card.Text>

        {/* Speciality Tag */}
        <div className="text-input">
          {speciality || "Creative and Design"}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FreelancerProjectCards;
