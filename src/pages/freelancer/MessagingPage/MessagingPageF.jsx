import React, { useEffect, useState } from "react";
import "./MessagingPageF.css";
import FreelancerNavBar from "../../../components/FreelancerNavBar/freelancerNavBar";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";

const MessagingPage = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentClientName, setCurrentClientName] = useState("");

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    // Update current chat when currentChatId changes
    if (currentChatId && chats.length > 0) {
      const chat = chats.find((chat) => chat.id === currentChatId);
      setCurrentChat(chat);

      // Find the client participant
      const client = chat?.participants?.find(
        (part) => part.uid !== localStorage.getItem("uid")
      );

      if (client) {
        setCurrentClientName(client.name || "");
        setCurrentClientId(client.uid || "");
      }
    }
  }, [currentChatId, chats]);

  const getAllChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${url || "http://localhost:8000"}/api/chats`,
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
          // Process the chats to ensure lastMessage is a string
          const processedChats = data.chats.map((chat) => ({
            ...chat,
            lastMessage:
              typeof chat.lastMessage === "object"
                ? chat.lastMessage.text
                : chat.lastMessage || "No messages",
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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="MessagingPageF">
      <FreelancerNavBar />

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
    </div>
  );
};

export default MessagingPage;
