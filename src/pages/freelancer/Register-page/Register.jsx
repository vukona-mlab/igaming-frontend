import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthForm from "../../../components/Auth/Register input form(freelancer)/AuthForm";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import LoginRegisterButton from "../../../components/Auth/LoginRegisterButton/LoginRegisterButton";
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

          <AuthForm onSubmit={handleSubmit} />
          <LoadingButton
            onClick={() => console.log("Registering...")}
            text="Register"
          />
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
