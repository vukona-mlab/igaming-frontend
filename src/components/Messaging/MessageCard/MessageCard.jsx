import React from "react";
import "./MessageCard.css";

const MessageCard = ({ message }) => {
  console.log(message);
  const uid = localStorage.getItem("uid");
  return (
    <div
      className={`MessageCard ${uid !== message.senderId ? "left" : "right"}`}
    >
      {message.text || message.message}
    </div>
  );
};

export default MessageCard;
