import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FiArrowRight } from "react-icons/fi"; // Import the arrow icon
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import AuthForm from "../../../components/Auth/registration-input-form-client/AuthForm";
import "./ClientRegister.css";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    jobInterest: "",
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
      //setUserInfo(data);
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
    //e.preventDefault();
    console.log({ formData });
    // Submit form
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
            roles: ["Client"],
          }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log({ data });
          alert(data.message);
          r(true);
          //navigation("/profile");
        }
        //setLoading(false);
      } catch (err) {
        console.log(err);
        r(false);
        //setLoading(false);
      }
    });
  };
  return (
    <div className="client-register-container">
      {/* Left Section */}
      <div className="client-register-left">
        {/* Register Button */}
        <button className="client-register-btn">
          <b>
            Login <FiArrowRight className="client-register-arrow" />
          </b>
        </button>

        <div className="client-register-form">
          <h2 className="client-register-title">
            <span className="client-red-line"></span> WELCOME <br />
            REGISTER ACCOUNT
          </h2>

          {/* AuthForm Component Replaces Manual Inputs */}
          <AuthForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
          />

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
