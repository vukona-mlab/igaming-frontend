import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { GoogleLogin } from '@react-oauth/google'; // Import Google Login
import axios from "axios";

// Pass props 
const GoogleSignInButton = ({ handleGoogleSignIn }) => {
  const responseGoogle = async (credentialResponse) => {
    console.log("Credential Response:", credentialResponse); // Log the response
    try {
      const res = await axios.post('http://localhost:8000/api/auth/google', { 
        idToken: credentialResponse.credential // Send the ID token
      });
      console.log(res.data);
      // Call the parent handler if needed
      if (handleGoogleSignIn) {
        handleGoogleSignIn(res.data);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <>
      <style>
        {`
          .google-sign-in-btn {
            border: 1px solid #4e3629 !important; /* Dark Brown Border */
            border-radius: 8px !important; /* Rounded corners */
          }

          /* Optional: Button hover effect */
          .google-sign-in-btn:hover {
            border-color: tomato !important;
          }
        `}
      </style>
      <GoogleLogin
        onSuccess={responseGoogle} // Handle success
        onError={() => {
          console.log('Login Failed');
        }}
        render={renderProps => (
          <Button
            variant="light"
            className="d-flex align-items-center border shadow-sm px-4 py-2 google-sign-in-btn"
            onClick={renderProps.onClick} // Use the onClick from GoogleLogin
            disabled={renderProps.disabled} // Disable button if needed
          >
            <FcGoogle className="me-2" size={24} />
            Sign in with Google
          </Button>
        )}
      />
    </>
  );
};

export default GoogleSignInButton;
