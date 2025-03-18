import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatInput.css";

const ChatInput = ({
  files,
  setFiles,
  fileIcon,
  setFileIcon,
  text,
  setText,
  sendMessage,
}) => {
  const handleFileChange = (event) => {
    // If the user selects a file manually, we handle it
    setFiles(event.target.files);
  };

  const handleImageCapture = (event) => {
    // If the user captures an image, set the image icon preview
    const capturedFile = event.target.files[0];
    if (capturedFile) {
      setFileIcon(URL.createObjectURL(capturedFile));
    }
  };

  const handleSendClick = () => {
    // If there's text, files, or a captured image, send the message
    if (text.trim() || files || fileIcon) {
      sendMessage(text, files, fileIcon);
      setText("");
      setFiles(null);
      setFileIcon(null);
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input">
        {/* File Icon */}
        <label htmlFor="file-upload" className="icon-button">
          <img
            src="/images/file-icon.svg"
            alt="Attach File"
            className="file-icon-img"
          />
        </label>
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*,.pdf,.doc,.docx"
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

        {/* Show Send Icon when input is not empty, otherwise show Camera Icon */}
        {text || files || fileIcon ? (
          <button className="icon-button send-button" onClick={handleSendClick}>
            <img
              src="/images/send-icon.png"
              alt="Send"
              className="send-icon-img"
            />
          </button>
        ) : (
          <label htmlFor="camera-upload" className="icon-button">
            <img
              src="/images/camera-icon.svg"
              alt="Camera"
              className="camera-icon-img"
            />
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
      {files && <p>File selected: {files[0].name}</p>}
      {fileIcon && (
        <img
          src={fileIcon}
          alt="Captured"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ChatInput;
