import React, { useState } from "react"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Modal from "react-bootstrap/Modal"; 
import Button from "react-bootstrap/Button"; 
import AuthForm from "../../../components/Register input form(freelancer)/AuthForm"; 
import LoadingButton from "../../../components/ButtonLoader/LoadingButton"; 
import GoogleSignInButton from "../../../components/googleSignButton/googleSign"; 
import LoginRegisterButton from "../../../components/LoginRegisterButton/LoginRegisterButton"; 
import axios from "axios"; 
import "./Register.css";

const Register = () => { 
  const [formData, setFormData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormChange = (data) => {
    setFormData(data); // Update form data when user inputs
  };

  const handleSubmit = async () => {
    if (!formData) {
      setError("Please fill in all required fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      setError(null); // Clear previous errors
      setSuccessMessage(null); // Clear previous success message

      console.log("Submitting Data:", JSON.stringify(formData, null, 2));

      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("Registration successful!", response.data);
        setSuccessMessage("Registration successful! Redirecting...");
        setShowSuccessModal(true); // Show popup

        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = "/login"; 
        }, 3000);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Error during registration:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In clicked!");
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <Container fluid className="register-container vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col xs={12} md={7} className="form-section vh-100 d-flex flex-column justify-content-center align-items-center p-4">
          <LoginRegisterButton text="Login" func={goBack} />
          <h4 className="headertext">
            <div>
              WELCOME <br />
              SIGN UP AS A FREELANCER
            </div>
          </h4>

          <AuthForm onChange={handleFormChange} />
          
          {error && <div className="error-message text-danger">{error}</div>}
          {successMessage && <div className="success-message text-success">{successMessage}</div>}

          <LoadingButton onClick={handleSubmit} text="Register" loading={loading} />

          <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} />
        </Col>

        <Col xs={12} md={5} className="image-section d-none d-md-flex align-items-center justify-content-center">
          <img className="image-m" src="/images/ri-experts.jpg" alt="Freelancer" />
        </Col>
      </Row>

    
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>🎉 Registration successful! Redirecting...</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => window.location.href = "/login"}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
