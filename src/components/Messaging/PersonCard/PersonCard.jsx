import React from "react";
import "./PersonCard.css";
import { BsPersonCircle } from "react-icons/bs";

const PersonCard = ({
  chatId,
  otherId,
  name,
  lastMessage,
  timestamp,
  photoUrl,
  setcurrentChatId,
  setCurrentClientId,
  setCurrentClientName,
}) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp * 1000);
    const now = new Date();
    
    // If the message is from today, show only time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If the message is from this week, show day name
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  };

  return (
    <div
      className="PersonCard"
      onClick={() => {
        setcurrentChatId(chatId);
        setCurrentClientId(otherId);
        setCurrentClientName(name);
      }}
    >
      <div className="person-avatar">
        {photoUrl ? (
          <img src={photoUrl} alt={name} />
        ) : (
          <BsPersonCircle className="default-avatar" />
        )}
      </div>
      <div className="person-info">
        <div className="person-name">{name}</div>
        <div className="last-message">{lastMessage}</div>
      </div>
      <div className="timestamp">{formatTimestamp(timestamp)}</div>
    </div>
  );
};

export default PersonCard;
