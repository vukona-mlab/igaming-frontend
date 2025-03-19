import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatHeader.css";
import { BsThreeDotsVertical, BsPersonCircle, BsCameraVideo } from "react-icons/bs";
import { io } from "socket.io-client";
import ProjectModal from "../ProjectModal/ProjectModal";
import ZoomMeetingModal from '../ZoomMeetingModal/ZoomMeetingModal';

const url = "http://localhost:8000";
const socket = io(url, { transports: ["websocket"] });

const ChatHeader = ({ currentChat }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);

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

  const handleCreateProject = () => {
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
  const handleVideoCall = async () => {
    try {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('role');
      const currentUserId = localStorage.getItem('uid');

      // Create meeting request with all required fields
      const meetingRequest = {
        topic: `Meeting with ${otherParticipant?.name}`,
        type: 2, // Scheduled meeting
        start_time: new Date().toISOString(), // Current time
        duration: 60, // 60 minutes
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
        agenda: `Video call between ${currentUser?.name} and ${otherParticipant?.name}`,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: false,
          waiting_room: false,
          meeting_authentication: false
        }
      };

      const response = await fetch(`${url}/api/zoom/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(meetingRequest)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Emit socket event for notification
        socket.emit('video-call-invitation', {
          chatId: currentChat?.id,
          meetingDetails: data,
          initiatorName: currentUser?.name,
          recipientId: otherParticipant?.uid,
          initiatorRole: userRole,
          initiatorId: currentUserId
        });

        // Show success notification to initiator
        if (Notification.permission === 'granted') {
          new Notification('Video Call Initiated', {
            body: `Invitation sent to ${otherParticipant?.name}`,
            icon: '/path/to/notification-icon.png'
          });
        }

        setMeetingDetails(data);
        setShowZoomModal(true);
      } else {
        // Show error notification
        if (Notification.permission === 'granted') {
          new Notification('Video Call Error', {
            body: 'Failed to create video call. Please try again.',
            icon: '/path/to/notification-icon.png'
          });
        }
        
        const errorData = await response.json();
        console.error('Failed to create meeting:', errorData);
        alert('Failed to create video call. Please try again.');
      }
    } catch (error) {
      console.error('Error creating Zoom meeting:', error);
      alert('Error creating video call. Please try again.');
    }
    setShowMenu(false);
  };

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
          <button className="video-call-button">
            <BsCameraVideo size={24} onClick={handleVideoCall} />
          </button>
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
                <button onClick={handleCreateProject}>
                  Create Project Agreement
                </button>
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
        isClientView={!isFreelancer}
        projectData={{
          clientId: isFreelancer ? otherParticipant?.uid : currentUserId,
          freelancerId: isFreelancer ? currentUserId : otherParticipant?.uid,
          clientEmail: isFreelancer
            ? otherParticipant?.email
            : currentUser?.email,
          freelancerEmail: isFreelancer
            ? currentUser?.email
            : otherParticipant?.email,
        }}
      />
      <ZoomMeetingModal 
        isOpen={showZoomModal}
        onClose={() => setShowZoomModal(false)}
        meetingDetails={meetingDetails}
      />
    </>
  );
};

export default ChatHeader;
