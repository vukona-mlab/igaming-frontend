import "./LoadingButton.css";

const LoadingButton = ({ onClick, text, loading }) => {
  return (
    <button onClick={onClick} className="loading-button" disabled={loading}>
      {loading ? (
        <img
          src="/images/spinDash.gif"
          alt="Loading"
          className="loader-gif"
          style={{ width: "20px", height: "20px" }}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;
