import { useState } from "react";
import "./LoadingButton.css"; // Import CSS file

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
      { loading ? (
        <img
          src="/public/images/load.gif" // Path to your GIF
          alt="Loading"
          className="loader-gif" // Add a class for styling if needed
          style={{ width: "20px", height: "20px" }} // Adjust size here
        />
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;