import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import LoadingButton from "../../components/Common/ButtonLoader/LoadingButton";
import Swal from "sweetalert2";
import "./ResetPassword.css";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ username: "" });
  const [errors, setErrors] = useState({ username: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "freelancer";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

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

  const handleReset = async () => {
    if (!handleValidation()) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.username);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Password Reset",
        text: "Password reset email sent successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(role === "client" ? "/client-signin" : "/freelancer-signin");
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-left">
        <button
          className="register-btn"
          onClick={() =>
            navigate(role === "client" ? "/client-register" : "/freelancer-register")
          }
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

          <LoadingButton
            onClick={handleReset}
            text={loading ? "Processing..." : "Reset"}
            disabled={loading}
          />
        </div>
      </div>

      <div className="reset-right">
        <img src="/images/ri-experts.jpg" alt="Woman with digital interface" />
      </div>
    </div>
  );
};

export default ResetPassword;
