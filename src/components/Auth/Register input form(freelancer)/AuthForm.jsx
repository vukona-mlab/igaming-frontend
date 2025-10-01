import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "./AuthForm.css"; // Make sure to add the required CSS for error state
import { useNavigate } from "react-router";
import ErrorSpan from "../../Common/error-span/ErrorSpan";

const AuthForm = ({ formData, setFormData, onSubmit, errors, validateEmail, validatePassword, validateJobTitle, validateExperience }) => {
  useEffect(() => {
    const eyeIcon = document.getElementById('f-eye-icon')
    if (errors.password) {
      eyeIcon.classList.add('eye-margin')
    } else {
      eyeIcon.classList.remove('eye-margin')
    }
  }, [errors.password])
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form className="auth-form p-0" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="john.doe@gmail.com"
            value={formData.username}
            onChange={(ev) => { handleChange(ev); validateEmail(ev.target.value)}}
            isInvalid={!!errors.username}
            className={`form-control-grey ${errors.username ? "error-border" : ""
              }`} // Fix this line
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
          <ErrorSpan error={errors.username} />
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
              onChange={(ev) => { handleChange(ev); validatePassword(ev.target.value)}}
              isInvalid={!!errors.password}
              className={`form-control-grey ${errors.password ? "error-border" : ""
                }`} // Fix this line
            />
            <Button
              id="f-eye-icon"
              variant="link"
              className="text-secondary p-0 border-0 btn-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>

          </div>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          <ErrorSpan error={errors.password} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={(ev) => { handleChange(ev); validateJobTitle(ev.target.value)}}
            isInvalid={!!errors.jobTitle}
            className={`form-control-grey ${errors.jobTitle ? "error-border" : ""
              }`} // Fix this line
          />
          <Form.Control.Feedback type="invalid">
            {errors.jobTitle}
          </Form.Control.Feedback>
          <ErrorSpan error={errors.jobTitle} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Label>Years of Experience</Form.Label>
          <Form.Control
            type="number"
            name="experience"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={(ev) => { handleChange(ev); validateExperience(ev.target.value) } }
            isInvalid={!!errors.experience}
            className={`form-control-grey ${errors.experience ? "error-border" : ""
              }`} // Fix this line
          />
          <Form.Control.Feedback type="invalid">
            {errors.experience}
          </Form.Control.Feedback>
          <ErrorSpan error={errors.experience} />
        </Col>
      </Row>
    </Form>
  );
};

export default AuthForm;
