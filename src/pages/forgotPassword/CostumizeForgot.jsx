import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import LoadingButton from "../../components/ButtonLoader/LoadingButton";
import "./CostumizeForgot.css";

const CostumizeForgot = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    // Basic email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendMail = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      // Trigger the email reset process here
      console.log("Reset email sent to:", email);
    }
  };

  return (
    <div className="reset-container">
      {/* Left Section */}
      <div className="reset-left">
        {/* Register Button */}
        <button className="register-btn">
          <b>Register <FiArrowRight className="register-arrow" /></b>
        </button>

        <div className="reset-form">
          <h2 className="reset-title">
            <span className="red-line"></span> WELCOME <br />
            FORGOT PASSWORD
          </h2>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          {/* Reset Button */}
          <LoadingButton text="Send Mail" onClick={handleSendMail} />
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

export default CostumizeForgot;
