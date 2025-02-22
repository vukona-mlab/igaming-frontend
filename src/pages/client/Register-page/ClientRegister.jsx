import React from "react"; 
import { FiArrowRight } from "react-icons/fi"; // Import the arrow icon
import LoadingButton from "../../../components/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/googleSignButton/googleSign";
import AuthForm from "../../../components/registration-input-form-client/AuthForm";
import "./ClientRegister.css";

const ClientRegister = () => {
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    // Handle form submission logic here
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
          <AuthForm onSubmit={handleFormSubmit} />

          {/* Sign Up Button */}
          <LoadingButton text="Sign up" />

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
