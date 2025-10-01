import { useState } from "react";
import "./LoadingButton.css";

const LoadingButton = ({ onClick, text,isLoading, style, className }) => {
  return (
    <button onClick={onClick} className={`loading-button ${className}`} disabled={isLoading} style={style}>
      {isLoading ? (
        <img
          src="/images/load.gif" // Path to your GIF
          alt="Loading"
          className="loader-gif" // Add a class for styling if needed
          style={{ width: "25px", height: "25px" }} // Adjust size here
        />
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;
