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
    prices: {
      threeDays: "",
      fiveDays: "",
      sevenDays: "",
      fourteenDays: "",
    },
    speedUp: {
      threeDays: false,
      fiveDays: false,
      sevenDays: false,
      fourteenDays: false,
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
      speedUp: {
        ...prev.speedUp,
        [name]: checked,
      },
    }));
  };

  // Handle input change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [name]: value,
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
          <Col xs={12} md={4} className="mb-3">
            <h5 className="category-header">Categories Preferences</h5>
            {["graphicDesign", "uiUxDesign", "animation", "imageEditing"].map(
              (category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  label={category.replace(/([A-Z])/g, " $1")}
                  name={category}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange}
                />
              )
            )}
          </Col>

          {/* Middle Column */}
          <Col xs={12} md={4} className="mb-3 mt-5">
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
              />
            ))}
          </Col>

          {/* Third Column */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="category-header">
              How much do extra amount speed up projects
            </h5>
            {[
              { name: "threeDays", label: "3 Days" },
              { name: "fiveDays", label: "5 Days" },
              { name: "sevenDays", label: "7 Days" },
              { name: "fourteenDays", label: "14 Days" },
            ].map((speed) => (
              <Row className="mb-3" key={speed.name}>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label={speed.label}
                    name={speed.name}
                    className="custom-checkbox"
                    onChange={handleCheckboxChange}
                  />
                </Col>
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name={speed.name}
                    value={formData.prices[speed.name]}
                    onChange={handlePriceChange}
                    className="custom-input"
                    disabled={!formData.speedUp[speed.name]} // Disable input if checkbox is not selected
                  />
                </Col>
              </Row>
            ))}
          </Col>
        </Row>

        {/* Buttons */}
        {/* <Row className="justify-content-end mt-4">
          <Col xs={12} className="text-right">
            <Button className="cancel-button me-4">Cancel</Button>
            <Button variant="dark" className="update-button" type="submit">
              Update
            </Button>
          </Col>
        </Row> */}
      </Form>
    </Container>
  );
};

export default CategoryPreferences;
