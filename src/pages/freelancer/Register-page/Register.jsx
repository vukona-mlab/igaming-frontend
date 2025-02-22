import React, { useState } from "react";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthForm from "../../../components/Auth/Register input form(freelancer)/AuthForm";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import LoginRegisterButton from "../../../components/Auth/LoginRegisterButton/LoginRegisterButton";
import "./Register.css";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    jobTitle: "",
    experience: "",
  });

  const navigation = useNavigate();

  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
    setFormData(data);
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
  const goBack = () => {
    window.history.back();
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
            jobTitle: jobTitle,
            experience: experience,
            roles: ["Freelancer"],
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
    <Container
      fluid
      className="register-container vh-100 d-flex align-items-center"
      style={{ border: "1px solid red" }}
    >
      <Row className="w-100">
        {/* Form Section */}
        <Col
          xs={12}
          md={7}
          className="form-section vh-100 d-flex flex-column justify-content-center align-items-center p-4"
        >
          <LoginRegisterButton text="Login" func={goBack} />

          <h4 className="headertext">
            <div>
              WELCOME <br />
              SIGN UP AS A FREELANCER
            </div>
          </h4>

          <AuthForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
          <LoadingButton onClick={handleRegister} text="Register" />
          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
        </Col>

        <Col
          xs={12}
          md={5}
          className="image-section d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            className="image-m"
            src="/images/ri-experts.jpg"
            alt="Freelancer"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
