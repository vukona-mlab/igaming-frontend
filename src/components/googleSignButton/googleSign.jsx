import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Google Icon

const GoogleSignInButton = ({ handleGoogleSignIn }) => {
  return (
    <>
      <style>
        {`
          .google-sign-in-btn {
            width: 85%;
            height: 40px;
            margin-top: 10px;
            margin-left: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border: 1px solid #4e3629;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s ease;
          
          }

          .google-sign-in-btn:hover {
            border-color: tomato;
            background: #f9f9f9;
          }
        `}
      </style>
      <Button
        variant="light"
        className="google-sign-in-btn"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="me-2" size={24} />
        Sign in with Google
      </Button>
    </>
  );
};

export default GoogleSignInButton;
