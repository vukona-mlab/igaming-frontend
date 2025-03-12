import React from "react";
import "./MessageCard.css";
import { Link } from 'react-router-dom';

const MessageCard = ({ message }) => {
  const uid = localStorage.getItem("uid");
  
  const renderProjectMessage = (text) => {
    if (text.includes("/projects/")) {
      const lines = text.split('\n');
      const projectId = lines[lines.length - 1].split('/').pop();
      
      // Remove the last line (link) from the content
      const content = lines.slice(0, -1).join('\n');
      
      return (
        <div className="project-message-content">
          <div className="project-details">
            {content}
          </div>
          <Link to={`/projects/${projectId}`} className="project-link">
            View Project Details
          </Link>
        </div>
      );
    }
    return text;
  };

  return (
    <div
      className={`MessageCard ${uid !== message.senderId ? "left" : "right"} ${
        message.type === 'project_creation' ? 'project-message' : ''
      }`}
    >
      <div>
        {message.type === 'project_creation' 
          ? renderProjectMessage(message.text || message.message)
          : message.text || message.message
        }
      </div>
      <div>
        {message.attachments &&
          message.attachments.length > 0 &&
          message.attachments[0].type.includes("image") && (
            <img src={message.attachments[0].url} alt="attachment" />
          )}
      </div>
      <div>
        {message.attachments &&
          message.attachments.length > 0 &&
          message.attachments[0].type.includes("application") && (
            <a
              href={message.attachments[0].url}
              target="_blank"
              rel="noopener noreferrer"
              download="Default"
            >
              {message.attachments[0].name}
            </a>
          )}
      </div>
      <div>
        {message.attachments &&
          message.attachments.length > 0 &&
          message.attachments[0].type.includes("audio") && (
            <a
              href={message.attachments[0].url}
              target="_blank"
              rel="noopener noreferrer"
              download="Default"
            >
              {message.attachments[0].name}
            </a>
          )}
      </div>
    </div>
  );
};

export default MessageCard;
