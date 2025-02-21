import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct

const CategoryPreferences = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    categories: {
      graphicDesign: false,
      uiUxDesign: false,
      animation: false,
      imageEditing: false,
      gameArt: false,
      characterModeling: false,
      gameDesigners: false,
      typography: false,
    },
  });

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [name]: checked,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to parent component
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          {/* First Column */}
          <Col xs={12} md={6} className="mb-3">
            <h5 className="category-header">Categories Preferences</h5>
            {["graphicDesign", "uiUxDesign", "animation", "imageEditing"].map((category) => (
              <Form.Check 
                key={category} 
                type="checkbox" 
                label={category.replace(/([A-Z])/g, " $1")} 
                name={category} 
                className="custom-checkbox" 
                onChange={handleCheckboxChange} 
              />
            ))}
          </Col>

          {/* Second Column */}
          <Col xs={12} md={6} className="mb-3 mt-5">
            {["gameArt", "characterModeling", "gameDesigners", "typography"].map((category) => (
              <Form.Check 
                key={category} 
                type="checkbox" 
                label={category.replace(/([A-Z])/g, " $1")} 
                name={category} 
                className="custom-checkbox" 
                onChange={handleCheckboxChange} 
              />
            ))}
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="justify-content-end mt-4">
          <Col xs={12} className="text-right mt-5">
            <Button className="cancel-button me-4">Cancel</Button>
            <Button variant="dark" className="update-button" type="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CategoryPreferences;
