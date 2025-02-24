import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FiArrowRight } from "react-icons/fi"; // Import the arrow icon
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import AuthForm from "../../../components/Auth/registration-input-form-client/AuthForm";
import "./ClientRegister.css";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";

export const validatePassword = (password) => {
  if (!password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/)) {
    return "Password must be at least 6 characters, with a number, one uppercase letter, and a special character";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
    return "Invalid email format";
  }
  return "";
};

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    jobInterest: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigation = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);

      // Get ID token
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const response = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.user.uid);
        localStorage.setItem("role", data.user.roles[0]);

        navigation("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error signing in: " + error.message);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    // Handle form submission logic here
  };

  const handleRegister = async () => {
    const emailError = validateEmail(formData.username);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ username: emailError, password: passwordError });
      return;
    }

    console.log({ formData });

    return new Promise(async (r) => {
      try {
        const res = await fetch(`http://localhost:8000/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.username,
            password: formData.password,
            jobInterest: formData.jobInterest,
            roles: ["client"],
          }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log({ data });
          alert(data.message);
          r(true);
        }
      } catch (err) {
        console.log(err);
        r(false);
      }
    });
  };

  return (
    <div className="client-register-container">
      {/* Left Section */}
      <div className="client-register-left">
        {/* Register Button */}
        <button
          className="client-register-btn"
          onClick={() => navigation("/client-signin")}
        >
          <b>
            Login <FiArrowRight className="client-register-arrow" />
          </b>
        </button>

        <div className="client-register-form">
          <h2 className="client-register-title">
            <span className="client-red-line"></span> WELCOME <br />
            SIGN UP AS A HIRE
          </h2>

          {/* AuthForm Component */}
          <AuthForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            errors={errors}
          />

          {/* Display validation errors */}
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          {/* Sign Up Button */}
          <LoadingButton onClick={handleRegister} text="Sign up" />

          {/* Google Sign-In Button */}
          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
        </div>
      </div>

      {/* Right Section */}
      <div className="client-register-right d-flex align-items-stretch">
        <img
          src="/public/images/ri-experts.jpg"
          alt="Woman with digital interface"
          className="img-fluid h-100"
        />
      </div>
    </div>
  );
};

export default ClientRegister;
