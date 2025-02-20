import React, { useState } from "react"; 
import AuthForm from "../../../components/Register input form(freelancer)/AuthForm";
import LoadingButton from "../../../components/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/googleSignButton/googleSign";
import LoginRegisterButton from "../../../components/LoginRegisterButton/LoginRegisterButton"; // import the new button component
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
    setFormData(data);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked!");
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="register-container d-flex">
      <div className="form-section col-12 col-md-6"> {/* Full-width on small screens, half-width on medium screens and up */}
        <LoginRegisterButton text="Login" func={goBack} /> 
    
        <h4 className="headertext">
            <div className="welcome">
            WELCOME 
            </div>
            <div className="freelancer">
            SIGN UP AS A FREELANCER
            </div>
        </h4>
        <AuthForm onSubmit={handleSubmit} />
        <LoadingButton onClick={() => console.log("Registering...")} text="Register" />
        <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
      </div>

      <div className="image-section col-12 col-md-6"></div> {/* Full-width on small screens, half-width on medium screens and up */}
    </div>
  );
};

export default Register;
