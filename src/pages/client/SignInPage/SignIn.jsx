import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingButton from "../../../components/Common/ButtonLoader/LoadingButton";
import GoogleSignInButton from "../../../components/Auth/googleSignButton/googleSign";
import AuthForm from "../../../components/Auth/reusable-input-form/InputForm";
import "./signin.css";
import { auth, googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { io } from "socket.io-client";
import BACKEND_URL from "../../../config/backend-config";

const url = BACKEND_URL;
const socket = io(url, { transports: ["websocket"] });

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleGoogleSignIn = async () => {
    const deviceToken = localStorage.getItem("rig-dev-token");
    try {
      setLoading(true);
      Swal.fire({
        title: "Signing in with Google...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, deviceToken }),
      });

      const data = await response.json();
      if (response.ok) {
        socket.emit("active-status-update", {
          uid: data.user.uid,
          activeStatus: true,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.user.uid);
        localStorage.setItem("role", data.user.roles[0]);

        Swal.fire({
          icon: "success",
          title: "Google sign-in successful!",
          timer: 2000,
          showConfirmButton: false,
        });

        navigation("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: data.message || "Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error signing in",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
  };

  const handleLogin = async () => {
    const deviceToken = localStorage.getItem("rig-dev-token");
    setLoading(true);

    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
          deviceToken: deviceToken,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        socket.emit("active-status-update", {
          uid: data.user.uid,
          activeStatus: true,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.user.uid);
        localStorage.setItem("role", data.user.roles[0]);

        Swal.fire({
          icon: "success",
          title: "Login successful!",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigation("/profile");
        }, 1500);

        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: data.message || "Invalid email or password.",
        });
        setErrors({ username: "", password: data.message || "Login failed" });
        return false;
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-login-container">
      <div className="client-register-left">
        <button
          className="client-login-btn"
          onClick={() => navigation("/client-register")}
        >
          <b>
            Register <FiArrowRight className="client-login-arrow" />
          </b>
        </button>

        <div className="client-login-form">
          <h2 className="client-login-title">
            <span className="client-red-line"></span> WELCOME BACK <br />
            SIGN IN
          </h2>

          <AuthForm
            formData={formData}
            handleFormDataChange={setFormData}
            onSubmit={handleFormSubmit}
            errors={errors}
          />

          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          <div className="forgot-password-link">
            <span
              style={{
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "15px",
                fontWeight: 500,
              }}
              onClick={() =>
                navigation("/reset-password", { state: { role: "client" } })
              }
            >
              Forgot password?
            </span>
          </div>

          <LoadingButton
            onClick={handleLogin}
            text={loading ? "Please wait..." : "Continue with email"}
            disabled={loading}
          />
          <GoogleSignInButton
            handleGoogleSignIn={handleGoogleSignIn}
            disabled={loading}
          />
        </div>
      </div>

      <div className="client-login-right d-flex align-items-stretch">
        <img
          src="/images/ri-experts.jpg"
          alt="Woman with digital interface"
          className="img-fluid h-100"
        />
      </div>
    </div>
  );
};

export default ClientLogin;
