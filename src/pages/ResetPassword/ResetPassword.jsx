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
    phone: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    phone: "",
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

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
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
      // Simulate API call (wait for 2 seconds)

      return new Promise((r) =>
        sendPasswordResetEmail(auth, formData.username)
          .then(() => {
            setLoading(false);

            alert("Password reset request submitted!");
            r(true);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    } finally {
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
            <span className="red-line"></span> WELCOME <br />
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

          {/* Phone Input */}
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
          </div>

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
          src="/public/images/ri-experts.jpg"
          alt="Woman with digital interface"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
