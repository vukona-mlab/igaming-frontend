import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Google Icon

// Pass props
const GoogleSignInButton = ({ handleGoogleSignIn }) => {
  return (
    <>
      <style>
        {`
          .google-sign-in-btn {
            border: 1px solid #4e3629 !important; /* Dark Brown Border */
            border-radius: 15px !important; /* Rounded corners */
            width: 80% !important;
            height: 50px !important; /* Set height to 40px */
          }

          /* Optional: Button hover effect */
          .google-sign-in-btn:hover {
            border-color: tomato !important;
          }
        `}
      </style>
      <Button
        variant="light"
        className="d-flex align-items-center border shadow-sm px-4 py-2 google-sign-in-btn"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="me-2" size={24} />
        Sign in with Google
      </Button>
    </>
  );
};

export default GoogleSignInButton;
