import React, { useState } from "react";
import "./HideToggle.css";

const HideToggle = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isVisible} 
          onChange={() => setIsVisible(!isVisible)} 
        />
        <span className="slider"></span>
      </label>
      <p>{isVisible ? "Hide Profile" : "View Profile"}</p>

      {isVisible && <div className="profile-box">{children}</div>}
    </div>
  );
};

export default HideToggle;
