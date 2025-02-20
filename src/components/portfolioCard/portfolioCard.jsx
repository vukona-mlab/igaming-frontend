import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CiCamera } from "react-icons/ci"; // Import the CiCamera icon for the camera
import './PortfolioCard.css'; // Import external CSS for text input styling

const PortfolioCard = ({ speciality, image }) => {
  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    // Update the image when the prop changes
    setCurrentImage(image);
  }, [image]);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCurrentImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Function to open the file picker
  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Card style={{ width: "250px", textAlign: "center", position: "relative", borderRadius: "10px", overflow: "hidden" }}>
      {/* Image Container */}
      <div style={{ width: "100%", height: "250px", backgroundColor: "#f0f0f0", position: "relative" }}>
        {currentImage ? (
          <img src={currentImage} alt="Portfolio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
            No Image
          </div>
        )}

        {/* Camera Icon Button (Bottom Right) */}
        <div style={{
          position: "absolute", bottom: "10px", right: "10px", background: "white", borderRadius: "50%",
          padding: "8px", cursor: "pointer", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)"
        }}>
          <input type="file" id="fileInput" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          <CiCamera size={20} color="black" onClick={handleFileUpload} />
        </div>
      </div>

      {/* Card Text below the image */}
      <Card.Body>
        <Card.Text>
          {/* Display the speciality */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed  eu fugiat nulla pariatur. 
        </Card.Text>

        {/* Text Input */}
        <input
          className="text-input"
          type="text"
          value={speciality}
          readOnly
        />
      </Card.Body>
    </Card>
  );
};

export default PortfolioCard;
