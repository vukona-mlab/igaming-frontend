import React, { useEffect, useState } from "react";
import "./MessagingPageC.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import SearchBar from "../../../components/SearchBar/SearchBar";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
import EscrowForm from "../../../components/Escrow/EscrowForm";
import io from "socket.io-client";
import ZoomMeetingModal from "../../../components/Messaging/ZoomMeetingModal/ZoomMeetingModal";
import SectionContainer from "../../../components/SectionContainer";
import BACKEND_URL from "../../../config/backend-config";
import {
  BsCameraVideo,
  BsPersonCircle,
  BsThreeDotsVertical,
} from "react-icons/bs";
import EmptyChatBox from "../../../components/Messaging/ChatBox/EmptyChatBox";
import ProfileCompletionModal from "../../../components/Common/ProfileCompletionModal";
import { useProfileCompletionContext } from "../../../components/Common/ProfileCompletionContext";
import Swal from "sweetalert2";

const MessagingPageC = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentFreelancerId, setCurrentFreelancerId] = useState("");
  const [currentFreelancerName, setCurrentFreelancerName] = useState("");
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [escrowData, setEscrowData] = useState(null);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [isInvitation, setIsInvitation] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isAdmins, setIsAdmins] = useState(false);
  const [current, setCurrent] = useState("Chats");
  const [adminUsers, setAdminUsers] = useState([]);
  const [firstAdminChat, setFirstAdminChat] = useState(false);

  const { isProfileComplete, isModalOpen } = useProfileCompletionContext();

  const token = localStorage.getItem("token");
  const url = BACKEND_URL;

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
    setFilteredChats(filteredChats);

    // if (filteredChats.length > 0) {
    //   setFilteredChats(filteredChats);
    // } else {
    //   setFilteredChats(chats);
    // }
    console.log({ chats, filteredChats });
  }, [chats, current]);
  useEffect(() => {
    if (currentChatId && chats.length > 0) {
      const chat = chats.find((chat) => chat.id === currentChatId);
      setCurrentChat(chat);

      const freelancer = chat?.participants?.find(
        (part) => part.uid !== localStorage.getItem("uid")
      );

      if (freelancer) {
        setCurrentFreelancerName(freelancer.name || "");
        setCurrentFreelancerId(freelancer.uid || "");
      }
    }
  }, [currentChatId, chats, filteredChats]);

  useEffect(() => {
    // Request notification permission when component mounts
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const socket = io(url);

    socket.on("video-call-invitation", (data) => {
      if (
        data.recipientId === localStorage.getItem("uid") &&
        data.initiatorRole === "freelancer"
      ) {
        // Show browser notification
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

  const handleEscrow = () => {
    const escrowData = {
      freelancerId: currentChat.participants[0].uid,
      clientId: currentChat.participants[1].uid,
      freelancerEmail: currentChat.participants[0].email,
      clientEmail: currentChat.participants[1].email,
    };
    setEscrowData(escrowData);
    setShowEscrowModal(true);
  };

  const handleEscrowSubmit = async (data) => {
    try {
      const response = await fetch(`${url}/api/escrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowEscrowModal(false);
        // Optionally refresh chat or show success message
      }
    } catch (error) {
      console.error("Error creating escrow:", error);
    }
  };

  const getAllChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url || BACKEND_URL}/api/chats`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.chats && data.chats.length > 0) {
          const processedChats = data.chats.map((chat) => ({
            ...chat,
            lastMessage:
              typeof chat.lastMessage === "object"
                ? chat.lastMessage.text
                : chat.lastMessage || "No messages",
          }));
          const adminChats = processedChats.filter(
            (chat) =>
              chat.tags && chat.tags.length > 0 && chat.tags[0] == "admin"
          );

          setFirstAdminChat(adminChats.length > 0 ? false : true);

          setChats(processedChats);
          setFilteredChats(processedChats);

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

  const handleSearch = (query) => {
    if (!query) {
      setFilteredChats(chats);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredChats(
        chats.filter((chat) =>
          chat.participants.some(
            (part) =>
              part.name && part.name.toLowerCase().includes(lowerCaseQuery)
          )
        )
      );
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
      console.log({ confimation });
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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="MessagingPageC" style={{ position: "relative" }}>
      {/* Banner if profile is incomplete */}
      {!isProfileComplete && (
        <div
          style={{
            background: "#f3f4f6",
            color: "#92400e",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Messaging is disabled until your profile is complete.
        </div>
      )}
      <Navbar />
      <ProfileSubNav />
      <SectionContainer>
        <SearchBar placeholder="Search people..." onSearch={handleSearch} />
      </SectionContainer>

      <SectionContainer>
        <div className="messagePageContainer">
          <PeopleComponent
            people={filteredChats}
            setcurrentChatId={setCurrentChatId}
            setCurrentClientId={setCurrentFreelancerId}
            setCurrentClientName={setCurrentFreelancerName}
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
                currentClientId={currentFreelancerId}
                currentClientName={currentFreelancerName}
                onEscrowClick={handleEscrow}
              />
            )
          )}
        </div>
        {showEscrowModal && escrowData && (
          <EscrowForm
            onSubmit={handleEscrowSubmit}
            freelancerId={escrowData.freelancerId}
            clientId={escrowData.clientId}
            project={currentChat?.project}
            isModal={true}
            onClose={() => setShowEscrowModal(false)}
          />
        )}
        {showZoomModal && (
          <ZoomMeetingModal
            isOpen={showZoomModal}
            onClose={() => setShowZoomModal(false)}
            meetingDetails={meetingDetails}
            isInvitation={isInvitation}
          />
        )}
        <ProfileCompletionModal />
        {/* Grey-out effect for main content */}
        <div
          style={
            !isProfileComplete
              ? { opacity: 0.5, pointerEvents: "none" }
              : {}
          }
        >
          {/* ...existing content, e.g. SectionContainer, chat UI... */}
        </div>
      </SectionContainer>
    </div>
  );
};

export default MessagingPageC;
