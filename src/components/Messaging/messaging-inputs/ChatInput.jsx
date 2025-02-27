import React from "react";  
import { Form } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./ChatInput.css";

const ChatInput = ({ file, setFile, fileIcon, setFileIcon, text, setText }) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImageCapture = (event) => {
    setFileIcon(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input">
        {/* File Icon */}
        <label htmlFor="file-upload" className="icon-button">
          <img src="/images/file-icon.svg" alt="Attach File" className="file-icon-img" />
        </label>
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Message Input */}
        <Form.Control
          type="text"
          placeholder="Type your message here..."
          className="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Camera Icon */}
        <label htmlFor="camera-upload" className="icon-button">
          <img src="/images/camera-icon.svg" alt="Camera" className="camera-icon-img" />
        </label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          id="camera-upload"
          style={{ display: "none" }}
          onChange={handleImageCapture}
        />
      </div>

      {/* Display Selected File */}
      {file && <p>File selected: {file.name}</p>}
      {fileIcon && <img src={fileIcon} alt="Captured" style={{ width: "100px", marginTop: "10px" }} />}
    </div>
  );
};

export default ChatInput;
