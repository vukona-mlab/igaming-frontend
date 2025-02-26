import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "./AuthForm.css";
import { useNavigate } from "react-router";

const AuthForm = ({ formData, setFormData, onSubmit, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const jobInterests = [
    "Game Developer",
    "Design & Creative",
    "Quality Assurance",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.jobInterest)
      newErrors.jobInterest = "Job Interest is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <Form className="auth-form p-0" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}  // Apply the isInvalid property
            className={`form-control-grey ${errors.username ? 'is-invalid' : ''}`}  // Conditionally add 'is-invalid' class
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Password</Form.Label>
          <div className="input-group-wrapper">
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              className={`form-control-grey ${errors.password ? 'is-invalid' : ''}`} // Apply the isInvalid class
            />
            {!errors.password &&
            <Button
              variant="link"
              className="text-secondary p-0 border-0 btn-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
        }
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Job Interest</Form.Label>
          <div className="job-interest-options">
            {jobInterests.map((interest, index) => (
              <div
                key={index}
                className={`job-interest-option ${formData.jobInterest === interest ? "selected" : ""}`}
                onClick={() =>
                  setFormData({ ...formData, jobInterest: interest })
                }
              >
                {interest}
              </div>
            ))}
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.jobInterest}
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
};

export default AuthForm;
