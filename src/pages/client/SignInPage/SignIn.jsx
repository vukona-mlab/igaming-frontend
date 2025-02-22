import React, { useState } from "react";
import "./signin.css";
import InputForm from "../../../components/Auth/reusable-input-form/InputForm";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import LoginRegisterButton from "../../../components/Auth/LoginRegisterButton/LoginRegisterButton";
import { useNavigate } from "react-router";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
export default function Signin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigation = useNavigate();

  function handleFormDataChange(e) {
    const value = e.target.value;
    setFormData(value);

    if (!value.trim()) {
      setError("This field is required.");
    } else {
      setError("");
    }
  }
  const handleSubmit = async () => {
    //e.preventDefault();

    if (!error) {
      // Submit form
      try {
        const res = await fetch(`http://localhost:8000/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.username,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log({ data });
          localStorage.setItem("token", data.token);
          localStorage.setItem("uid", data.user.uid);
          localStorage.setItem("role", data.user.roles[0]);

          navigation("/profile");
        }

        //setLoading(false);
      } catch (err) {
        console.log(err);
        //setLoading(false);
      }
    }
  };
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
  return (
    <>
      <div className="container">
        <div className="left-side">
          <LoginRegisterButton
            text="Register"
            func={() => navigation("/clientRegister")}
          />
          <div className="welcome-box">
            <div className="red-line"></div>
            <div className="welcome-text">
              <h1>
                WELCOME BACK <br />
                SIGN IN
              </h1>
            </div>
          </div>
          <InputForm
            formData={formData}
            handleFormDataChange={setFormData}
            label1={"username"}
            label2={"password"}
          />
          <div className="loading-btn">
            <LoadingButton onClick={handleSubmit} text="Continue with email" />
          </div>
          <div className="google-signin">
            <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
        <div className="right-side">
          <img
            src="/public/images/ri-experts.jpg"
            alt="logo"
            className="image"
          ></img>
        </div>
      </div>
    </>
  );
}
