import { useState } from "react";
import "./LoadingButton.css";

const LoadingButton = ({ onClick, text }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} className="loading-button" disabled={loading}>
      {loading ? (
        <img
          src="/public/images/load.gif" // Path to your GIF
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
