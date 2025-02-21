import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
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
    <Form onSubmit={handleSubmit}>
      <Row className="mb-4">
        {/* First Column */}
        <Col>
          <h5>Categories Preferences</h5>
          <Form.Check type="checkbox" label="Graphic/Logo Design" name="graphicDesign" className="custom-checkbox" onChange={handleCheckboxChange} />
          <Form.Check type="checkbox" label="UI/UX Design" name="uiUxDesign" className="custom-checkbox" onChange={handleCheckboxChange} />
          <Form.Check type="checkbox" label="Animation & Illustration" name="animation" className="custom-checkbox" onChange={handleCheckboxChange} />
          <Form.Check type="checkbox" label="Image Editing" name="imageEditing" className="custom-checkbox" onChange={handleCheckboxChange} />
        </Col>

        {/* Middle Column */}
        <Col style={{ paddingTop: "30px",border:"1px solid pink" }}>
          <Form.Check type="checkbox" label="3D Game Art" name="gameArt" className="custom-checkbox" onChange={handleCheckboxChange} />
          <Form.Check type="checkbox" label="Character Modeling" name="characterModeling" className="custom-checkbox" onChange={handleCheckboxChange} />
          <Form.Check type="checkbox" label="Game Designers" name="gameDesigners" className="custom-checkbox" onChange={handleCheckboxChange} />
          <Form.Check type="checkbox" label="Font & Typography" name="typography" className="custom-checkbox" onChange={handleCheckboxChange} />
        </Col>

        {/* Third Column */}
        <Col className="" style={{border:"1px solid yellow"}}>
          <h5>How much extra to speed up project</h5>

          {[
            { key: "threeDays", label: "3 Days" },
            { key: "fiveDays", label: "5 Days" },
            { key: "sevenDays", label: "7 Days" },
            { key: "fourteenDays", label: "14 Days" },
          ].map(({ key, label }) => (

            <Row className="mb-3" key={key}>
              <Col xs={3} style={{border:"2px solid black"}}>
                <Form.Check type="checkbox" label={label} name={key} className="custom-checkbox" onChange={handleCheckboxChange} />
              </Col>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  name={key}
                  value={formData.prices[key]}
                  onChange={handlePriceChange}
                  style={{ border: "none", borderBottom: "2px solid #000" }} // Dark border for input box
                  disabled={!formData.speedUp[key]} // Disable input if checkbox is not selected
                />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>

     
    </Form>
  );
};

export default CategoryPreferences;
