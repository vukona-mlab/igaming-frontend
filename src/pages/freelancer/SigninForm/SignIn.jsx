import React, { useState } from "react";
import "./SignIn.css";
import InputForm from "../../../components/Auth/reusable-input-form/InputForm";
import LoginRegisterButton from "../../../components/Auth/LoginRegisterButton/LoginRegisterButton";
import EmailResetButton from "../../../components/Auth/EmailResetButton/Button";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import { useNavigate } from "react-router";
export default function SignIn() {
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
  return (
    <>
      <div className="container">
        <div className="input-form">
          <LoginRegisterButton text="Register" />
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
          <div className="email-button">
            <EmailResetButton text="Continue with email" func={handleSubmit} />
          </div>
          <div className="google-signin">
            <GoogleSignInButton />
          </div>
        </div>
        <div className="image-section">
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
