import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./profileForm.css";

const UserForm = ({ formData, handleChange, handleSubmit }) => {
  console.log({ formData });
  return (
    <Form onSubmit={handleSubmit} className="profile-form">
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={6}>
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
        <Col xs={12} md={6}>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={6}>
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
        <Col xs={12} md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={6}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Label>Speciality</Form.Label>
          <Form.Control
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
