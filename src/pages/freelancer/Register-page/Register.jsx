import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import AuthForm from "../../../components/Auth/Register input form(freelancer)/AuthForm";
import "./Register.css";
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

export const validateJobTitle = (jobTitle) => {
  if (!jobTitle.trim()) {
    return "Job title is required";
  }
  return "";
};

export const validateExperience = (experience) => {
  if (!experience || isNaN(experience) || experience < 0) {
    return "Experience must be a positive number";
  }
  return "";
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    jobTitle: "",
    experience: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    jobTitle: "",
    experience: "",
  });

  const navigation = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
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

  const handleRegister = async () => {
    const emailError = validateEmail(formData.username);
    const passwordError = validatePassword(formData.password);
    const jobTitleError = validateJobTitle(formData.jobTitle);
    const experienceError = validateExperience(formData.experience);

    if (emailError || passwordError || jobTitleError || experienceError) {
      setErrors({
        username: emailError,
        password: passwordError,
        jobTitle: jobTitleError,
        experience: experienceError,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
          jobTitle: formData.jobTitle,
          experience: formData.experience,
          roles: ["freelancer"],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation("/profile");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      alert("Error registering user");
    }
  };

  return (
    <div className="client-register-container">
      <div className="client-register-left">
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
            SIGN UP AS A FREELANCER
          </h2>

          <AuthForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          {errors.jobTitle && (
            <p className="error-message">{errors.jobTitle}</p>
          )}
          {errors.experience && (
            <p className="error-message">{errors.experience}</p>
          )}

          <LoadingButton onClick={handleRegister} text="Continue with email" />
          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
        </div>
      </div>

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

export default Register;
