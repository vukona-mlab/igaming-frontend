import React, { useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import "./categoryPrefarances.css"; // Ensure this path is correct

const CategoryPreferences = ({ onSubmit, isUpdate }) => {
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

  return (
    <Container>
      <Form>
        <Row className="mb-4">
          {/* First Column */}
          <Col xs={12} md={6} className="mb-3">
            <h5 className="category-header">Category Preferences</h5>
            {["graphicDesign", "uiUxDesign", "animation", "imageEditing"].map(
              (category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  label={category.replace(/([A-Z])/g, " $1")}
                  name={category}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange}
                  disabled={!isUpdate}
                />
              )
            )}
          </Col>

          {/* Second Column */}
          <Col xs={12} md={6} className="mb-3 mt-5">
            {[
              "gameArt",
              "characterModeling",
              "gameDesigners",
              "typography",
            ].map((category) => (
              <Form.Check
                key={category}
                type="checkbox"
                label={category.replace(/([A-Z])/g, " $1")}
                name={category}
                className="custom-checkbox"
                onChange={handleCheckboxChange}
                disabled={!isUpdate}
              />
            ))}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CategoryPreferences;
