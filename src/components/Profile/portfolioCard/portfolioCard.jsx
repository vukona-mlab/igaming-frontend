import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CiCamera } from "react-icons/ci"; // Import the camera icon
import "./PortfolioCard.css"; // Import CSS

const PortfolioCard = ({ speciality, image, handleImageChange }) => {
  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    // Update image when prop changes
    setCurrentImage(image);
  }, [image]);

  // Open file picker
  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <Card className="portfolio-card">
      {/* Image Container */}
      <div className="image-container">
        {currentImage ? (
          <img src={currentImage} alt="Portfolio" className="portfolio-image" />
        ) : (
          <div className="no-image">No Image</div>
        )}

        {/* Camera Icon Button */}
        <div className="camera-icon" onClick={handleFileUpload}>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <CiCamera size={20} color="black" />
        </div>
      </div>

      {/* Card Body */}
      <Card.Body>
        <Card.Text className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu fugiat
          nulla pariatur.
        </Card.Text>

        {/* Speciality Input */}
        <input className="text-input" type="text" value={speciality} readOnly />
      </Card.Body>
    </Card>
  );
};

export default PortfolioCard;
