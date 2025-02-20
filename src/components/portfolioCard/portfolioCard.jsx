import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CiCamera } from "react-icons/ci"; // Import the CiCamera icon for the camera
import './PortfolioCard.css'; // Import external CSS for text input styling

const PortfolioCard = () => {
  const [image, setImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
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
        {image ? (
          <img src={image} alt="Portfolio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
          <CiCamera size={20} color="black" onClick={handleFileUpload} /> {/* Black camera icon */}
        </div>
      </div>

      {/* Card Text below the image */}
      <Card.Body>
        <Card.Text>
        Lorem ipsum  nisl id viverra facilisis, orci felis euismod ligula, et elementum odio est non orci. Curabitur suscipit volutpat nisi,
         ac auctor dui venenatis a.
          

        </Card.Text>

        {/* Text Input */}
        <input
          className="text-input"
          type="text"
          value="Game Developer"
          readOnly
        />
      </Card.Body>
    </Card>
  );
};

export default PortfolioCard;
