import React, { useEffect, useState } from "react";
import withProfileCheck from "../../../components/Common/withProfileCheck";
import "./MessagingPageF.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
import ZoomMeetingModal from "../../../components/Messaging/ZoomMeetingModal/ZoomMeetingModal";
import io from "socket.io-client";
import BACKEND_URL from "../../../config/backend-config";
import SectionContainer from "../../../components/SectionContainer";
import EmptyChatBox from "../../../components/Messaging/ChatBox/EmptyChatBox";
import Swal from "sweetalert2";
import { get } from "react-scroll/modules/mixins/scroller";
import { CheckLg } from "react-bootstrap-icons";
import ProfileCompletionModal from "../../../components/Common/ProfileCompletionModal";
import { useProfileCompletionContext } from '../../../components/Common/ProfileCompletionContext';

const MessagingPage = (props) => {
  const { isProfileComplete, isModalOpen } = useProfileCompletionContext();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentClientName, setCurrentClientName] = useState("");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [isInvitation, setIsInvitation] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isAdmins, setIsAdmins] = useState(false);
  const [current, setCurrent] = useState("Chats");
  const [adminUsers, setAdminUsers] = useState([]);
  const [firstAdminChat, setFirstAdminChat] = useState(false);
  const token = localStorage.getItem("token");
  // const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllChats();
  }, []);
  useEffect(() => {
    fetchAdmins();
  }, []);
  useEffect(() => {
    chats.map((chat) => {
      if (chat.tags && chat.tags.length > 0) {
        const tags = chat.tags;
        tags.map((tag) => {
          if (tag == "report") {
            setIsReports(true);
          }
          if (tag == "admin") {
            setIsAdmins(true);
          }
        });
      }
    });
  }, [chats]);
  useEffect(() => {
    const filteredChats =
      chats.length > 0 && current == "Chats"
        ? chats.filter((chat) => !chat.hasOwnProperty("tags"))
        : current == "Admin"
        ? chats.filter(
            (chat) => chat.tags && chat.tags.some((tag) => tag === "admin")
          )
        : chats.filter(
            (chat) => chat.tags && chat.tags.some((tag) => tag === "report")
          );
    if (filteredChats.length > 0) {
      setCurrentChatId(filteredChats[0].id);
    }
    setFilteredChats(filteredChats);

    // if (filteredChats.length > 0) {
    //   setFilteredChats(filteredChats);
    // } else {
    //   setFilteredChats(chats);
    // }
    console.log({ chats, filteredChats });
  }, [chats, current, currentChatId]);
  useEffect(() => {
    // Update current chat when currentChatId changes
    if (currentChatId && chats.length > 0) {
      const chat = chats.find((chat) => chat.id === currentChatId);
      setCurrentChat(chat);

      const currentUserId = localStorage.getItem("uid");
      console.log("Current logged in user ID:", currentUserId);

      // Find the client participant
      const client = chat?.participants?.find(
        (part) => part.uid !== currentUserId
      );

      if (client) {
        setCurrentClientName(client.name || "");
        setCurrentClientId(client.uid || "");
      }
    }
  }, [currentChatId, chats, filteredChats]);

  useEffect(() => {
    // Request notification permission when component mounts
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const socket = io(BACKEND_URL);

    socket.on("video-call-invitation", (data) => {
      if (
        data.recipientId === localStorage.getItem("uid") &&
        data.initiatorRole === "client"
      ) {
        if (Notification.permission === "granted") {
          const notification = new Notification("Video Call Invitation", {
            body: `${data.initiatorName} is inviting you to a video call`,
            icon: "/path/to/notification-icon.png",
          });

          notification.onclick = () => {
            window.focus();
            setMeetingDetails(data.meetingDetails);
            setIsInvitation(true);
            setShowZoomModal(true);
          };
        }

        // Show modal
        setMeetingDetails(data.meetingDetails);
        setIsInvitation(true);
        setShowZoomModal(true);
      }
    });

    return () => socket.disconnect();
  }, []);

  const getAllChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/chats`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      console.log("Fetched chats data:", data);
      if (response.ok) {
        if (data.chats && data.chats.length > 0) {
          // Process the chats to ensure lastMessage is a string
          const processedChats = data.chats.map((chat) => ({
            ...chat,
            lastMessage:
              typeof chat.lastMessage === "object"
                ? chat.lastMessage.text
                : chat.lastMessage || "No messages",
          }));
          console.log("CHATS", { processedChats });
          const adminChats = processedChats.filter(
            (chat) =>
              chat.tags && chat.tags.length > 0 && chat.tags[0] == "admin"
          );
          console.log("CHATS", { adminChats });

          setFirstAdminChat(adminChats.length > 0 ? false : true);
          setChats(processedChats);

          // Set initial chat if available
          if (processedChats.length > 0) {
            setCurrentChatId(processedChats[0].id);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAdminChat = async () => {
    try {
      let confimation;
      if (firstAdminChat) {
        confimation = await Swal.fire({
          title: "Are you sure?",
          text: "You are about to open a chat with the admin.",
          icon: "warning",
          buttons: true, // Shows both "Cancel" and "OK" buttons
          dangerMode: true, // Styles the "OK" button as dangerous (red)
        });
      }
      if (confimation.isConfirmed) {
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

        console.log("Admin profile data:", adminProfile); // Debug log

        const response = await fetch(`${BACKEND_URL}/api/admin-chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            targetId: adminId,
            chatType: "client-admin",
            initialMessage: "Hello",
            tags: ["admin"],
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
        getAllChats();
        setCurrent("Admin");
      } else {
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const currentUserId = localStorage.getItem("uid");

      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const cleanToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/auth/admin/all/public`, {
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
      console.log({ filteredAdmins });
      setAdminUsers(filteredAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log({ currentChatId, currentChat });
  return (
    <div className="MessagingPageF" style={{ position: 'relative' }}>
      {/* Banner if profile is incomplete */}
      {!isProfileComplete && (
        <div style={{
          background: '#f3f4f6',
          color: '#92400e',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '1rem'
        }}>
          Messaging is disabled until your profile is complete.
        </div>
      )}
      <Navbar />
      <ProfileSubNav />
      <SectionContainer>
        <div className="messagePageContainer">
          <PeopleComponent
            people={filteredChats}
            setcurrentChatId={setCurrentChatId}
            setCurrentClientId={setCurrentClientId}
            setCurrentClientName={setCurrentClientName}
            isReports={isReports}
            isAdmins={isAdmins}
            current={current}
            setCurrent={setCurrent}
            handleAdminChat={handleAdminChat}
          />

          {filteredChats.length === 0 ? (
            <EmptyChatBox />
          ) : (
            currentChatId && (
              <ChatBox
                chatId={currentChatId}
                currentChat={currentChat}
                currentClientId={currentClientId}
                currentClientName={currentClientName}
              />
            )
          )}
        </div>
      </SectionContainer>
      {showZoomModal && (
        <ZoomMeetingModal
          isOpen={showZoomModal}
          onClose={() => setShowZoomModal(false)}
          meetingDetails={meetingDetails}
          isInvitation={isInvitation}
        />
      )}
      {/* Modal only appears on this page */}
      <ProfileCompletionModal />
      {/* Grey-out effect for main content */}
      <div style={!isProfileComplete ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
        {/* ...existing content, e.g. SectionContainer, chat UI... */}
      </div>
    </div>
  );
};

export default withProfileCheck(MessagingPage);
