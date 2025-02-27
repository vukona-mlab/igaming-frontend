import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CiCamera } from "react-icons/ci"; // Import the camera icon
import "./freelancerCardProject.css"; // Import CSS

const FreelancerProjectCards = ({ image, speciality }) => {
  return (
    <Card className="portfolio-card">
      {/* Image Container */}
      <div className="image-container">
        {image ? (
          <img src={image} alt="Freelancer" className="portfolio-image" />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      {/* Card Body */}
      <Card.Body>
        <Card.Text className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu fugiat
          nulla pariatur.
        </Card.Text>

        {/* Speciality */}
        <input className="text-input" type="text" value={speciality} readOnly />
      </Card.Body>
    </Card>
  );
};

export default FreelancerProjectCards;
