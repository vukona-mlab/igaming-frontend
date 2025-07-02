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
import { BsCameraVideo, BsPersonCircle, BsThreeDotsVertical } from "react-icons/bs";
import EmptyChatBox from "../../../components/Messaging/ChatBox/EmptyChatBox";

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

  const token = localStorage.getItem("token");
  const url = BACKEND_URL;

  useEffect(() => {
    getAllChats();
  }, []);

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
  }, [currentChatId, chats]);

  useEffect(() => {
    // Request notification permission when component mounts
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const socket = io(url);

    socket.on('video-call-invitation', (data) => {
      if (data.recipientId === localStorage.getItem('uid') &&
        data.initiatorRole === 'freelancer') {
        // Show browser notification
        if (Notification.permission === 'granted') {
          const notification = new Notification('Video Call Invitation', {
            body: `${data.initiatorName} is inviting you to a video call`,
            icon: '/path/to/notification-icon.png'
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
      const response = await fetch(
        `${url || BACKEND_URL}/api/chats`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="MessagingPageC">
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
          />
          {
            filteredChats.length === 0 ? (
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
            )
          }

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
      </SectionContainer>

    </div>
  );
};

export default MessagingPageC;
