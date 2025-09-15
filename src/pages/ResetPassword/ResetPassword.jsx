import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FiArrowRight } from "react-icons/fi"; // Import the arrow icon
import LoadingButton from "../../components/Common/ButtonLoader/LoadingButton";
import "./ResetPassword.css";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const ResetPassword = () => {
  // State to manage form values and errors
  const [formData, setFormData] = useState({
    username: "",
  });

  const [errors, setErrors] = useState({
    username: "",
  });
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear errors when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form fields
  const handleValidation = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleReset = async () => {
    if (!handleValidation()) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.username);
      setLoading(false);
      alert("Password reset request submitted!");
      navigation("/freelancer-signin");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="reset-container">
      {/* Left Section */}
      <div className="reset-left">
        {/* Register Button */}
        <button
          className="register-btn"
          onClick={() => navigation("/freelancer-register")}
        >
          <b>
            Register <FiArrowRight className="register-arrow" />
          </b>
        </button>

        <div className="reset-form">
          <h2 className="reset-title">
            <span className="client-red-line"></span> WELCOME <br />
            RESET PASSWORD
          </h2>

          {/* Username Input */}
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          {/* Phone Input
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div> */}

          {/* Reset Button */}
          <LoadingButton
            onClick={handleReset}
            text="Reset"
            disabled={loading}
          />

        </div>
      </div>

      {/* Right Section */}
      <div className="reset-right">
        <img
          src="/images/ri-experts.jpg"
          alt="Woman with digital interface"
        />
      </div>
    </div>
  );
};

export default ResetPassword;