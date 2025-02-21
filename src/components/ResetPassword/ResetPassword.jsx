import React from "react";
import LoadingButton from "../components/LoadingButton"; // Adjust the path if needed
import "../styles/ResetPassword.css"; // Add styles separately

const ResetPassword = () => {
  return (
    <div className="reset-container">
      {/* Left Section */}
      <div className="reset-left">
        <h2 className="reset-title">
          <span>WELCOME</span> <br />
          RESET PASSWORD
        </h2>
        
        <div className="input-group">
          <label>Username</label>
          <input type="text" value="oscarpoca@figma.com" disabled />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input type="text" value="+27 68 0850 741" disabled />
        </div>

        {/* Reset Button */}
        <LoadingButton text="Reset" />
      </div>

      {/* Right Section */}
      <div className="reset-right">
        <img src="/asri-experts.jpg" alt="Woman with digital interface" />
      </div>
    </div>
  );
};

export default ResetPassword;
