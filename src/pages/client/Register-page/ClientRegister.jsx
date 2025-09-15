import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FiArrowRight } from "react-icons/fi"; // Import the arrow icon
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import AuthForm from "../../../components/Auth/registration-input-form-client/AuthForm";
import "./ClientRegister.css";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import BACKEND_URL from "../../../config/backend-config";
import ErrorSpan from "../../../components/Common/error-span/ErrorSpan";

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
  const [submissionError, setSubmissionError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const validateEmail = (email) => {
    setErrors((errors) => {
      return {
        ...errors, username: !email
          ? "Email is required"
          : !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
            ? "Invalid email format"
            : ""
      }
    })
  }
  const validatePassword = (password) => {
    setErrors((errors) => {
      return {
        ...errors, password: !password
          ? "Password is required"
          : !password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/)
            ? "Password must be at least 6 characters, with a number, one uppercase letter, and a special character"
            : ""
      }
    })
  }
  const navigation = useNavigate();
  // const url = BACKEND_URL;

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);

      // Get ID token
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
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
      console.log();
      
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
    if(formData.username.trim() === "") setErrors((e) => ({ ...e, username: "Email is required"}))
    if(formData.password.trim() === "") setErrors(e => ({ ...e, password: "Password is required" }))

    if ((errors.username || !formData.username.trim() || errors.password || !formData.password.trim())) {
      return;
    }
    setIsLoading(true)
    console.log({ formData });

    return new Promise(async (r) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
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
          setIsLoading(false)
          navigation("/client-signin");
          r(true);
        } else {
          setSubmissionError(data.error)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err);
        setSubmissionError(err.error)
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
            validateEmail={validateEmail}
            validatePassword={validatePassword}
            errors={errors}
          />

          <ErrorSpan error={submissionError} />
          {/* Sign Up Button */}
          <LoadingButton onClick={handleRegister} text="Continue with email" isLoading={isLoading} />

          {/* Google Sign-In Button */}
          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
        </div>
      </div>

      {/* Right Section */}
      <div className="client-register-right d-flex align-items-stretch">
        <img
          src="/images/ri-experts.jpg"
          alt="Woman with digital interface"
          className="img-fluid h-100"
        />
      </div>
    </div>
  );
};

export default ClientRegister;
