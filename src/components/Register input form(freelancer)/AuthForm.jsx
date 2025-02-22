import React, { useState, useEffect } from "react"; 
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import './AuthForm.css';

const AuthForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    email: "", 
    password: "",
    jobTitle: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
    onChange(updatedFormData); 
  };

  useEffect(() => {
    onChange(formData); 
  }, []);

  return (
    <Form className="p-3 auth-form rounded shadow-sm">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter username"
          value={formData.email}
          onChange={handleChange}
          className="form-control-grey"
        />
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
            className="form-control-grey"
          />
          <button
            type="button"
            className="btn btn-link text-secondary p-0 border-0"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </button>
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
          className="form-control-grey"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Years of Experience</Form.Label>
        <Form.Control
          type="number"
          name="experience"
          placeholder="Enter years of experience"
          value={formData.experience}
          onChange={handleChange}
          className="form-control-grey"
        />
      </Form.Group>
    </Form>
  );
};

export default AuthForm;
