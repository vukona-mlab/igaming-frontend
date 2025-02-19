import React from "react";
import { Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi"; // Search Icon

const SearchBar = () => {
  const containerStyle = {
    position: "relative",
    width: "100%",
  };

  const inputStyle = {
    border: "2px solid #ccc", // Light border
    borderRadius: "20px",
    padding: "10px 12px",
    paddingLeft: "40px", // Space for icon
    width: "50%",
    outline: "none",
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none", // Prevents clicking on the icon
  };

  return (
    <div style={containerStyle}>
      <FiSearch size={18} style={iconStyle} />
      <Form.Control type="text" placeholder="Search..." style={inputStyle} />
    </div>
  );
};

export default SearchBar;
