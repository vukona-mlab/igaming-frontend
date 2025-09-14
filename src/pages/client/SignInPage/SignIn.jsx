import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import AuthForm from "../../../components/Auth/reusable-input-form/InputForm";
import "./signin.css";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { io } from "socket.io-client";
import BACKEND_URL from "../../../config/backend-config";
const url = BACKEND_URL;
const socket = io(url, { transports: ["websocket"] });


// Validation functions
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

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigation = useNavigate();

  const handleGoogleSignIn = async () => {
    const deviceToken = localStorage.getItem("rig-dev-token")
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken, deviceToken }),
      });

      const data = await response.json();
      if (response.ok) {
        socket.emit("active-status-update", {
          uid: data.user.uid,
          activeStatus: true,
        });

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
  };

  const handleLogin = async () => {
    const deviceToken = localStorage.getItem("rig-dev-token")
    const emailError = validateEmail(formData.username);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ username: emailError, password: passwordError });
      return;
    }

    console.log({ formData });

    return new Promise(async (r) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.username,
            password: formData.password,
            deviceToken: deviceToken
          }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log({ data });
          setSuccessMessage("Login successful! Redirecting...");
          setTimeout(() => {
            socket.emit("active-status-update", {
              uid: data.user.uid,
              activeStatus: true,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("uid", data.user.uid);
            localStorage.setItem("role", data.user.roles[0]);

            navigation("/profile");
          }, 2000);
          r(true);
        }
      } catch (err) {
        console.log(err);
        r(false);
      }
    });
  };

  return (
    <div className="client-login-container">
      <div className="client-register-left">
        <button
          className="client-login-btn"
          onClick={() => navigation("/client-register")}
        >
          <b>
            Register <FiArrowRight className="client-login-arrow" />
          </b>
        </button>

        <div className="client-login-form">
          <h2 className="client-login-title">
            <span className="client-red-line"></span> WELCOME BACK <br />
            SIGN IN
          </h2>

          {/* Pass handleFormDataChange to AuthForm */}
          <AuthForm
            formData={formData}
            handleFormDataChange={setFormData} // passing setFormData to InputForm
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

          {/* Display success message */}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}


          <div className="forgot-password-link">
            <span
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', fontSize: '15px', fontWeight: 500 }}
              onClick={() => navigation('/reset-password')}
            >
              Forgot password?
            </span>
          </div>

          <LoadingButton onClick={handleLogin} text="Continue with email" />
          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
        </div>
      </div>

      <div className="client-login-right d-flex align-items-stretch">
        <img
          src="/images/ri-experts.jpg"
          alt="Woman with digital interface"
          className="img-fluid h-100"
        />
      </div>
    </div>
  );
};

export default ClientLogin;
