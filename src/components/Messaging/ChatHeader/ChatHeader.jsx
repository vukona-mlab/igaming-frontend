import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatHeader.css";
import {
  BsThreeDotsVertical,
  BsPersonCircle,
  BsCameraVideo,
} from "react-icons/bs";
import { io } from "socket.io-client";
import ProjectModal from "../ProjectModal/ProjectModal";
import ZoomMeetingModal from "../ZoomMeetingModal/ZoomMeetingModal";
import BACKEND_URL from "../../../config/backend-config";
import Swal from "sweetalert2";

const url = BACKEND_URL;
const socket = io(url, { transports: ["websocket"] });

const ChatHeader = ({ currentChat, projectStatus }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const socketRef = useRef();
  const [projectData, setProjectData] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfiles, setUserProfiles] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  // Get user role and ID from localStorage
  const userRole = localStorage.getItem("role");
  const currentUserId = localStorage.getItem("uid");
  const isFreelancer = userRole === "freelancer";
  console.log({ isFreelancer });
  
  const reasons = [
    "Harassment or bullying",
    "Spam or misleading",
    "Legal issue",
    "Harmful or dangerous acts",
  ];

  // Find the current user and other participant
  const currentUser = currentChat?.participants?.find(
    (part) => part.uid === currentUserId
  );

  const otherParticipant = currentChat?.participants?.find(
    (part) => part.uid !== currentUserId
  );
  useEffect(() => {
    fetchAdmins();
  }, []);
  useEffect(() => {
    if (otherParticipant && otherParticipant.activeStatus) {
      setActiveStatus(otherParticipant.activeStatus);
    }
  }, [otherParticipant]);
  useEffect(() => {
    socketRef.current = io(url, { transports: ["websocket"] });

    socketRef.current.on("get-active-status", (data) => {
      if (otherParticipant?.uid === data.uid) {
        setActiveStatus(data.activeStatus);
      }
    });

    return () => {
      socketRef.current.off("get-active-status");
    };
  }, [otherParticipant]);
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
  const showChatDeleteAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "The chat has been deleted.",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };
  const showReportAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "The report has been logged with the admin.",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };
  const handleCreateProject = () => {
    if (!otherParticipant?.uid) {
      console.error("No other participant found");
      return;
    }

    if (!currentChat?.id) {
      console.error("No chat ID found");
      return;
    }

    setProjectData({
      clientId: isFreelancer ? otherParticipant.uid : currentUserId,
      freelancerId: isFreelancer ? currentUserId : otherParticipant.uid,
      clientEmail: isFreelancer ? otherParticipant.email : currentUser.email,
      freelancerEmail: isFreelancer
        ? currentUser.email
        : otherParticipant.email,
      chatId: currentChat.id,
    });
    setShowProjectModal(true);
    setShowMenu(false);
  };

  const handleEndChat = () => {
    // TODO: Implement end chat logic
    setShowMenu(false);
  };

  const handleDeleteChat = async () => {
    // TODO: Implement delete chat logic
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      const response = await fetch(
        `${BACKEND_URL}/api/chats/${currentChat.id}/delete-chat`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      console.log({ data });
      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }
      showChatDeleteAlert();
    } catch (error) {}
    setShowMenu(false);
  };
  const handleReportUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Fetch admin profile first
      const adminId = adminUsers[0].id;
      const adminProfile = adminUsers[0];
      if (!adminProfile) {
        console.error("Failed to fetch admin profile");
        return;
      }

      const response = await fetch(`${url}/api/admin-chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          targetId: adminId,
          chatType: "client-admin",
          initialMessage: reportReason != "" ? reportReason : "Report",
          tags: ["report"],
          chatReportId: currentChat.id,
        }),
      });
      const data = await response.json();
      console.log({ data });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Authentication failed");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (data && data.message == "Existing chat found") {
        alert("Ongoing report exists");
      } else {
        showReportAlert();
      }
      setShowReport(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  const fetchUserProfile = async (uid) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return null;
      }

      // Try admin profile endpoint first
      let response = await fetch(`${url}/api/auth/admin/profile/${uid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`,
        },
      });

      // If admin profile fails, try user profile endpoint
      if (!response.ok && response.status === 404) {
        response = await fetch(`${url}/api/auth/profile/${uid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        });
      }

      if (!response.ok) {
        console.error("Failed to fetch user profile");
        return null;
      }

      const data = await response.json();
      console.log({ data });
      return data.profile || data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const getUserProfile = async (uid) => {
    if (userProfiles[uid]) {
      return userProfiles[uid];
    }

    const profile = await fetchUserProfile(uid);
    if (profile) {
      setUserProfiles((prev) => ({
        ...prev,
        [uid]: profile,
      }));
    }
    return profile;
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const cleanToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      const response = await fetch(`${url}/api/auth/admin/all/public`, {
        headers: {
          Authorization: cleanToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Authentication failed");
          return;
        }
        if (response.status === 404) {
          console.error("Admin endpoint not found. Please check the API URL.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Filter out the current user from the admin list
      const filteredAdmins = data.admins.filter(
        (admin) => admin.id !== currentUserId
      );
      setAdminUsers(filteredAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoCall = async () => {
    try {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      const currentUserId = localStorage.getItem("uid");
      const initiatorName = currentUser?.name || "User"; // Get the current user's name

      // First create the Zoom meeting
      const meetingRequest = {
        topic: `Meeting with ${otherParticipant?.name}`,
        type: 2,
        start_time: new Date().toISOString(),
        duration: 60,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        agenda: `Video call initiated by ${initiatorName}`,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: false,
          waiting_room: false,
          meeting_authentication: false,
        },
      };

      const response = await fetch(`${url}/api/zoom/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(meetingRequest),
      });

      if (response.ok) {
        const data = await response.json();

        // Send meeting details as a message in the chat
        const messageResponse = await fetch(
          `${url}/api/chats/${currentChat.id}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              message: `Video call initiated by ${initiatorName}`,
              senderId: currentUserId,
              type: "zoom-meeting",
              meetingDetails: {
                join_url: data.join_url,
                password: data.password,
                meeting_id: data.meeting_id,
                host_name: initiatorName, // Set the host name as the initiator
                initiator_id: currentUserId, // Store the initiator's ID
              },
            }),
          }
        );

        if (!messageResponse.ok) {
          throw new Error("Failed to send meeting details message");
        }

        // Socket emission for real-time notification
        socket.emit("video-call-invitation", {
          chatId: currentChat?.id,
          meetingDetails: {
            ...data,
            host_name: initiatorName, // Include host name in socket emission
          },
          initiatorName: initiatorName,
          recipientId: otherParticipant?.uid,
          initiatorRole: userRole,
          initiatorId: currentUserId,
        });

        setMeetingDetails({
          ...data,
          host_name: initiatorName, // Include host name in modal data
        });
        setShowZoomModal(true);
      } else {
        throw new Error("Failed to create Zoom meeting");
      }
    } catch (error) {
      console.error("Error in video call:", error);
      alert("Error creating video call. Please try again.");
    }
    setShowMenu(false);
  };

  return (
    <>
      {showReport && (
        <div className="report-container">
          <div className="report-form-modal">
            <div className="report-form">
              <div className="project-modal-header">
                <h2>Whats happening</h2>
                <button
                  className="close-button"
                  onClick={() => setShowReport(false)}
                >
                  ×
                </button>
              </div>
              {reasons.map((reason, i) => (
                <div key={i}>
                  <div className="radio-group">
                    <input
                      type="radio"
                      id={reason}
                      name="reason"
                      onChange={() => setReportReason(reason)}
                    />

                    <div className="label-price-group">
                      <span className="reason">{reason}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="button-group">
                <button
                  type="button"
                  className="decline-btn"
                  onClick={() => setShowReport(false)}
                >
                  Cancel
                </button>
                <button className="accept-btn" onClick={handleReportUser}>
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
            <span
              className={`online-status ${activeStatus ? "active" : ""}`}
            ></span>
          </div>
          <div className="user-info">
            <h3 className="user-name">{otherParticipant?.name || "User"}</h3>
            <span className="user-status">
              {!activeStatus
                ? `Last seen ${new Date(
                    otherParticipant?.lastSeen?._seconds ||
                      otherParticipant?.lastSeen
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
              {isFreelancer &&
                currentChat &&
                !currentChat.hasOwnProperty("chatType") && (
                  <button onClick={handleCreateProject}>
                    Create Project Agreement
                  </button>
                )}
              <button onClick={handleEndChat}>End Chat</button>
              <button onClick={handleDeleteChat}>Delete Chat</button>
              {currentChat && !currentChat.hasOwnProperty("chatType") && (
                <button onClick={() => setShowReport(true)}>Report User</button>
              )}
            </div>
          )}
        </div>
      </div>

      {showProjectModal && projectData && (
        <ProjectModal
          isOpen={showProjectModal}
          onClose={() => {
            setShowProjectModal(false);
            setProjectData(null);
          }}
          chatId={currentChat?.id}
          isClientView={!isFreelancer}
          projectData={projectData}
        />
      )}
      <ZoomMeetingModal
        isOpen={showZoomModal}
        onClose={() => setShowZoomModal(false)}
        meetingDetails={meetingDetails}
      />
    </>
  );
};

export default ChatHeader;
