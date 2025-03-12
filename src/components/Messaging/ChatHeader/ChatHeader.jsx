import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatHeader.css";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";
import { io } from "socket.io-client";
import ProjectModal from '../ProjectModal/ProjectModal';
const url = "http://localhost:8000";
const socket = io(url, { transports: ["websocket"] });
const ChatHeader = ({ currentChat }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Get user role and ID from localStorage
  const userRole = localStorage.getItem("role");
  const currentUserId = localStorage.getItem("uid");
  const isFreelancer = userRole === "freelancer";

  // Find the current user and other participant
  const currentUser = currentChat?.participants?.find(
    (part) => part.uid === currentUserId
  );

  const otherParticipant = currentChat?.participants?.find(
    (part) => part.uid !== currentUserId
  );
  useEffect(() => {
    if (otherParticipant && otherParticipant.activeStatus) {
      setActiveStatus(otherParticipant.activeStatus);
    }
  }, [otherParticipant]);
  useEffect(() => {
    socket.on("get-active-status", (data) => {
      if (otherParticipant.uid === data.uid) {
        setActiveStatus(data.activeStatus);
      }
    });
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateAgreement = () => {
    if (!currentUser || !otherParticipant) {
      console.error("Missing participant information");
      return;
    }

    const escrowData = {
      freelancerId: isFreelancer ? currentUser.uid : otherParticipant.uid,
      clientId: isFreelancer ? otherParticipant.uid : currentUser.uid,
      freelancerEmail: isFreelancer ? currentUser.email : otherParticipant.email,
      clientEmail: isFreelancer ? otherParticipant.email : currentUser.email,
    };

    setShowProjectModal(true);
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
  console.log({ otherParticipant });
  return (
    <>
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
              {!activeStatus
                ? `Last seen ${new Date(
                    otherParticipant.lastSeen._seconds ||
                      otherParticipant.lastSeen
                  ).toLocaleString()}`
                : "Online"}
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
              {isFreelancer && (
                <button onClick={handleCreateAgreement}>Create Agreement</button>
              )}
              <button onClick={handleEndChat}>End Chat</button>
              <button onClick={handleDeleteChat}>Delete Chat</button>
            </div>
          )}
        </div>
      </div>
      
      <ProjectModal 
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        chatId={currentChat?.id}
        escrowData={currentUser && otherParticipant ? {
          freelancerId: isFreelancer ? currentUser.uid : otherParticipant.uid,
          clientId: isFreelancer ? otherParticipant.uid : currentUser.uid,
          freelancerEmail: isFreelancer ? currentUser.email : otherParticipant.email,
          clientEmail: isFreelancer ? otherParticipant.email : currentUser.email,
        } : null}
      />
    </>
  );
};

export default ChatHeader;
