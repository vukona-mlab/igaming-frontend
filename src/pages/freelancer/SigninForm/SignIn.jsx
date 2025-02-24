import React, { useState } from "react";
import "./signin.css";
import InputForm from "../../../components/Auth/reusable-input-form/InputForm";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import LoginRegisterButton from "../../../components/Auth/LoginRegisterButton/LoginRegisterButton";
import { useNavigate } from "react-router";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { validateEmail, validatePassword } from "../../../utils/validation"; // Import validation functions

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigation = useNavigate();

  function handleFormDataChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate input
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    }
  }

  const handleSubmit = async () => {
    // Check for errors before submitting
    if (errors.email || errors.password || !formData.email || !formData.password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.user.uid);
        localStorage.setItem("role", data.user.roles[0]);
        navigation("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  return (
    <>
      <div className="container">
        <div className="left-side">
          <LoginRegisterButton text="Register" func={() => navigation("/clientRegister")} />
          <div className="welcome-box">
            <div className="red-line"></div>
            <div className="welcome-text">
              <h1>WELCOME BACK <br /> SIGN IN</h1>
            </div>
          </div>

          <InputForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            label1={"email"}
            label2={"password"}
            errors={errors} // Pass errors as props to display messages
          />

          {errors.email && <p className="error-message">{errors.email}</p>}
          {errors.password && <p className="error-message">{errors.password}</p>}

          <div className="loading-btn">
            <LoadingButton onClick={handleSubmit} text="Continue with email" />
          </div>

          <div className="google-signin">
            <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>

        <div className="right-side">
          <img src="/public/images/ri-experts.jpg" alt="logo" className="image" />
        </div>
      </div>
    </>
  );
}
