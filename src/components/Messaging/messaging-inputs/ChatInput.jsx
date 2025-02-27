import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatInput.css";

const ChatInput = ({ file, setFile, fileIcon, setFileIcon, text, setText, sendMessage }) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImageCapture = (event) => {
    setFileIcon(URL.createObjectURL(event.target.files[0]));
  };

  const handleSendClick = () => {
    if (text.trim() || file || fileIcon) {
      sendMessage(text, file, fileIcon); 
      setText(""); 
      setFile(null); 
      setFileIcon(null);
    }
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

        {/* Show Camera Icon when input is empty, else show Send Icon */}
        {text ? (
          <button className="icon-button send-button" onClick={handleSendClick}>
            <img src="/images/send-icon.png" alt="Send" className="send-icon-img" />
          </button>
        ) : (
          <label htmlFor="camera-upload" className="icon-button">
            <img src="/images/camera-icon.svg" alt="Camera" className="camera-icon-img" />
          </label>
        )}

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
