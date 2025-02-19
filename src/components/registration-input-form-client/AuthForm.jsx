import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import './AuthForm.css';

const AuthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    jobInterest: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const jobInterests = ["Game Developer", "Design & Creative", "Quality Assurance"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.jobInterest) newErrors.jobInterest = "Job Interest is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 auth-form rounded shadow-sm">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!errors.username}
          className="form-control-grey"
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="input-group-wrapper">
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            className="form-control-grey"
          />
          <Button
            variant="link"
            className="text-secondary p-0 border-0 btn-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Job Interest</Form.Label>
        <div className="job-interest-options">
          {jobInterests.map((interest, index) => (
            <div
              key={index}
              className={`job-interest-option ${formData.jobInterest === interest ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, jobInterest: interest })}
            >
              {interest}
            </div>
          ))}
        </div>
        <Form.Control.Feedback type="invalid">{errors.jobInterest}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AuthForm;
