import React from "react";
import "./MessageCard.css";

const MessageCard = ({ message }) => {
  const uid = localStorage.getItem("uid");
  return (
    <div
      className={`MessageCard ${uid !== message.senderId ? "left" : "right"}`}
    >
      <div>{message.text || message.message}</div>
      <div>
        {message.attachments &&
          message.attachments.length > 0 &&
          message.attachments[0].type.includes("image") && (
            <img src={message.attachments[0].url} />
          )}
      </div>
      <div>
        {message.attachments &&
          message.attachments.length > 0 &&
          message.attachments[0].type.includes("application") && (
            <a
              href={message.attachments[0].url}
              target="_blank"
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
