import React, { useEffect, useState } from "react";
import "./MessagingPageF.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
import ZoomMeetingModal from "../../../components/Messaging/ZoomMeetingModal/ZoomMeetingModal";
import io from "socket.io-client";

const MessagingPage = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentClientName, setCurrentClientName] = useState("");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [isInvitation, setIsInvitation] = useState(false);

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    // Update current chat when currentChatId changes
    if (currentChatId && chats.length > 0) {
      const chat = chats.find(chat => chat.id === currentChatId);
      setCurrentChat(chat);
      
      const currentUserId = localStorage.getItem("uid");
      console.log("Current logged in user ID:", currentUserId);
      
      // Find the client participant
      const client = chat?.participants?.find(
        part => part.uid !== currentUserId
      );
      
      if (client) {
        setCurrentClientName(client.name || "");
        setCurrentClientId(client.uid || "");
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
          data.initiatorRole === 'client') {
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

  const getAllChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url || 'http://localhost:8000'}/api/chats`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.chats && data.chats.length > 0) {
          // Process the chats to ensure lastMessage is a string
          const processedChats = data.chats.map(chat => ({
            ...chat,
            lastMessage: typeof chat.lastMessage === 'object' 
              ? chat.lastMessage.text 
              : chat.lastMessage || 'No messages'
          }));
          
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

 

 

  return (
    <div className="MessagingPageF">
      <Navbar />
      <ProfileSubNav />
      <div className="messagePageContainer">
        <PeopleComponent
          people={chats}
          setcurrentChatId={setCurrentChatId}
          setCurrentClientId={setCurrentClientId}
          setCurrentClientName={setCurrentClientName}
        />
        {currentChatId && (
          <ChatBox
            chatId={currentChatId}
            currentChat={currentChat}
            currentClientId={currentClientId}
            currentClientName={currentClientName}
          />
        )}
      </div>
      {showZoomModal && (
        <ZoomMeetingModal
          isOpen={showZoomModal}
          onClose={() => setShowZoomModal(false)}
          meetingDetails={meetingDetails}
          isInvitation={isInvitation}
        />
      )}
    </div>
  );
};

export default MessagingPage;
