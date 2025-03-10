import React, { useState, useRef, useEffect } from "react";
import "./ChatHeader.css";
import { BsThreeDotsVertical, BsPersonCircle } from 'react-icons/bs';

const ChatHeader = ({ currentChat }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Find the other participant (not the current user)
  const otherParticipant = currentChat?.participants?.find(
    part => part.uid !== localStorage.getItem("uid")
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateAgreement = () => {
    // TODO: Implement create agreement logic
    setShowMenu(false);
  };

  const handleEndChat = () => {
    // TODO: Implement end chat logic
    setShowMenu(false);
  };

  const handleDeleteChat = () => {
    // TODO: Implement delete chat logic
    setShowMenu(false);
  };

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <div className="avatar-wrapper">
          {otherParticipant?.photoURL ? (
            <img 
              src={otherParticipant.photoURL} 
              alt={otherParticipant?.name || "User"} 
              className="user-avatar"
            />
          ) : (
            <BsPersonCircle className="default-avatar" />
          )}
          <span className="online-status"></span>
        </div>
        <div className="user-info">
          <h3 className="user-name">{otherParticipant?.name || "User"}</h3>
          <span className="user-status">
            {otherParticipant?.lastSeen 
              ? `Last seen ${new Date(otherParticipant.lastSeen).toLocaleString()}` 
              : "Offline"}
          </span>
        </div>
      </div>
      
      <div className="chat-header-right">
        <button 
          className="options-button"
          onClick={() => setShowMenu(!showMenu)}
          ref={buttonRef}
        >
          <BsThreeDotsVertical />
        </button>
        {showMenu && (
          <div className="context-menu" ref={menuRef}>
            <button onClick={handleCreateAgreement}>Create Agreement</button>
            <button onClick={handleEndChat}>End Chat</button>
            <button onClick={handleDeleteChat}>Delete Chat</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
