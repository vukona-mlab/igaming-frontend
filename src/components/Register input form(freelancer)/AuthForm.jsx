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
    jobTitle: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    
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
        <InputGroup>
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
            className="text-secondary p-0 border-0"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          name="jobTitle"
          placeholder="Enter job title"
          value={formData.jobTitle}
          onChange={handleChange}
          isInvalid={!!errors.jobTitle}
          className="form-control-grey"
        />
        <Form.Control.Feedback type="invalid">{errors.jobTitle}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Years of Experience</Form.Label>
        <Form.Control
          type="number"
          name="experience"
          placeholder="Enter years of experience"
          value={formData.experience}
          onChange={handleChange}
          isInvalid={!!errors.experience}
          className="form-control-grey"
        />
        <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AuthForm;
