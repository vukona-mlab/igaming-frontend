import React, { useState } from "react"; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import './InputForm.css';

const InputForm = ({ formData, handleFormDataChange, label1, label2 }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    handleFormDataChange({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form className="p-3 auth-form rounded shadow-sm">
      <Form.Group className="mb-3">
        <Form.Label>{label1}</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder={`Enter value for ${label1}`}
          value={formData.username || ""}
          onChange={handleChange}
          className="form-control-grey"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{label2}</Form.Label>
        <div className="input-group-wrapper">
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={`Enter value for ${label2}`}
            value={formData.password || ""}
            onChange={handleChange}
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
      </Form.Group>
    </Form>
  );
};

export default InputForm;