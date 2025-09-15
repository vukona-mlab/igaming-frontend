import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import "./GoogleSignInButton.css"; // Import external CSS

const GoogleSignInButton = ({ handleGoogleSignIn }) => {
  return (
    <Button
      variant="light"
      className="google-sign-in-btn"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle size={24} />
      <span className="ms-2">Sign in with Google</span>
    </Button>
  );
};

export default GoogleSignInButton;
