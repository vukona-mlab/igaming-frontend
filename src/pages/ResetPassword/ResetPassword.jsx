import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi"; // Import the arrow icon
import LoadingButton from "../../components/Common/ButtonLoader/LoadingButton";
import "./ResetPassword.css";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function forgotPassword() {
    if (email === "") {
      alert("Email cannot be empty");
      return;
    }

    return new Promise((r) =>
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Check your email");
          r(true);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
  return (
    <div className="reset-container">
      {/* Left Section */}
      <div className="reset-left">
        {/* Register Button */}
        <button className="register-btn">
          <b>
            Register <FiArrowRight className="register-arrow" />
          </b>
        </button>

        <div className="reset-form">
          <h2 className="reset-title">
            <span className="red-line"></span> WELCOME <br />
            RESET PASSWORD
          </h2>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          {/* Reset Button */}
          <LoadingButton onClick={forgotPassword} text="Reset" />
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
