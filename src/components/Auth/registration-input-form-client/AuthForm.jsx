import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import "./AuthForm.css";
import { useNavigate } from "react-router";
import ErrorSpan from "../../Common/error-span/ErrorSpan";

const AuthForm = ({ formData, setFormData, onSubmit, errors, validateEmail, validatePassword }) => {
  useEffect(() => {
    const eyeIcon = document.getElementById('c-eye-icon')
    if (errors.password) {
      eyeIcon.classList.add('eye-margin')
    } else {
      eyeIcon.classList.remove('eye-margin')
    }
  }, [errors.password])
  const [showPassword, setShowPassword] = useState(false);

  const jobInterests = [
    "Game Developer",
    "Design & Creative",
    "Quality Assurance",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateForm()
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
            placeholder="Enter username"
            value={formData.username}
            onChange={(ev) => { handleChange(ev); validateEmail(ev.target.value) }}
            isInvalid={!!errors.username} // Apply the isInvalid property
            className={`form-control-grey ${errors.username ? "is-invalid" : ""
              }`} // Conditionally add 'is-invalid' class
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
              onChange={(ev) => { handleChange(ev); validatePassword(ev.target.value) }}
              isInvalid={!!errors.password}
              className={`form-control-grey ${errors.password ? "is-invalid" : ""
                }`} // Apply the isInvalid class
            />
            <Button
              id="c-eye-icon"
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
          <Form.Label>Job Interest</Form.Label>
          <div className="job-interest-options">
            {jobInterests.map((interest, index) => (
              <div
                key={index}
                className={`job-interest-option ${formData.jobInterest === interest ? "selected" : ""
                  }`}
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
          <ErrorSpan error={errors.jobInterest} />
        </Col>
      </Row>
    </Form>
  );
};

export default AuthForm;
