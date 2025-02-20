import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import './profileForm.css'

const UserForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "auto" }} className="profile-form">
      <Row className="mb-3">
        <Col>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
          />
        </Col>
      </Row>

      {/* New Speciality Field */}
      <Row className="mb-3">
        <Col>
          <Form.Label>Speciality</Form.Label>
          <Form.Control
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            style={{ maxWidth: "370px" }} // Set max width here
          />
        </Col>
      </Row>

     
    </Form>
  );
};

export default UserForm;
