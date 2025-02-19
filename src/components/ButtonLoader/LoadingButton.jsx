
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
      {loading ? (
        <>
          <span className="loader"></span> 
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;
