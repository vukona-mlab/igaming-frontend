import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const CategoryPreferences = () => {
  const [prices, setPrices] = useState({
    threeDays: "",
    fiveDays: "",
    sevenDays: "",
    fourteenDays: "",
  });

  const handlePriceChange = (e) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      <Row className="mb-4">
        {/* First Column */}
        <Col>
          <h5>Categories Preferences</h5>
          <Form.Check type="checkbox" label="Graphic/Logo Design" />
          <Form.Check type="checkbox" label="UI/UX Design" />
          <Form.Check type="checkbox" label="Animation & Illustration" />
          <Form.Check type="checkbox" label="Image Editing" />
        </Col>

        {/* Middle Column */}
        <Col style={{paddingTop:"10px"}}>
          
          <Form.Check type="checkbox" label="3D Game Art" />
          <Form.Check type="checkbox" label="Character Modeling" />
          <Form.Check type="checkbox" label="Game Designers" />
          <Form.Check type="checkbox" label="Font & Typography" />
        </Col>

        {/* Third Column */}
        <Col>
  <h5>How much extra to speed up project</h5>
  
  {/* 3 Days */}
  <Row className="mb-3">
    <Col xs={6}>
      <Form.Check type="checkbox" label="3 Days" />
    </Col>
    <Col xs={6}>
      <Form.Control
      
        type="text"
        placeholder="Enter price"
        name="threeDays"
        value={prices.threeDays}
        onChange={handlePriceChange}
        style={{ border: "none", borderBottom: "2px solid #000" }} // Dark border for input box
      />
    </Col>
  </Row>

  {/* 5 Days */}
  <Row className="mb-3">
    <Col xs={6}>
      <Form.Check type="checkbox" label="5 Days" />
    </Col>
    <Col xs={6}>
      <Form.Control
        type="text"
        placeholder="Enter price"
        name="fiveDays"
        value={prices.fiveDays}
        onChange={handlePriceChange}
        style={{ border: "none", borderBottom: "2px solid #000" }} // Dark border for input box
      />
    </Col>
  </Row>

  {/* 7 Days */}
  <Row className="mb-3">
    <Col xs={6}>
      <Form.Check type="checkbox" label="7 Days" />
    </Col>
    <Col xs={6}>
      <Form.Control
        type="text"
        placeholder="Enter price"
        name="sevenDays"
        value={prices.sevenDays}
        onChange={handlePriceChange}
        style={{ border: "none", borderBottom: "2px solid #000" }} // Dark border for input box
      />
    </Col>
  </Row>

  {/* 14 Days */}
  <Row className="mb-3">
    <Col xs={6}>
      <Form.Check type="checkbox" label="14 Days" />
    </Col>
    <Col xs={6}>
      <Form.Control
        type="text"
        placeholder="Enter price"
        name="fourteenDays"
        value={prices.fourteenDays}
        onChange={handlePriceChange}
        style={{ border: "none", borderBottom: "2px solid #000" }} // Dark border for input box
      />
    </Col>
  </Row>
</Col>

      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CategoryPreferences;
