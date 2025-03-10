import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../config/firebase";
import "./LogoutButton.css";
import { io } from "socket.io-client";
const url = "http://localhost:8000";
const socket = io(url, { transports: ["websocket"] });

const LogoutButton = ({ className, customStyle }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    socket.emit("active-status-update", {
      uid: localStorage.getItem("uid"),
      activeStatus: false,
    });

    const success = await handleLogout();
    // //update active status
    if (success) {
      navigate("/client-signin");
    }
  };

  return (
    <button
      className={`logout-button ${className || ""}`}
      style={customStyle}
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
