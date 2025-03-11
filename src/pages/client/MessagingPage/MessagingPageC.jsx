import React, { useEffect, useState } from "react"; 
import "./MessagingPageC.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import SearchBar from "../../../components/SearchBar/SearchBar"
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";

const MessagingPageC = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [currentFreelancerId, setCurrentFreelancerId] = useState("");
  const [currentFreelancerName, setCurrentFreelancerName] = useState("");

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;

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

  const handleEscrow = () => {
    const escrowData = {
      freelancerId: currentChat.participants[0].uid,
      clientId: currentChat.participants[1].uid,
      freelancerEmail: currentChat.participants[0].email,
      clientEmail: currentChat.participants[1].email,
    };
    navigate("/escrow", { state: { escrowData } });
  };

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
          const processedChats = data.chats.map((chat) => ({
            ...chat,
            lastMessage:
              typeof chat.lastMessage === "object"
                ? chat.lastMessage.text
                : chat.lastMessage || "No messages",
          }));

          setChats(processedChats);

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
    <div className="MessagingPageC">
      <Navbar />
      <ProfileSubNav />
      <SearchBar placeholder="Search messages..." onSearch={() => {}} /> 

      <div className="messagePageContainer">
        <PeopleComponent
          people={chats}
          setcurrentChatId={setCurrentChatId}
          setCurrentClientId={setCurrentFreelancerId}
          setCurrentClientName={setCurrentFreelancerName}
        />
        {currentChatId && (
          <ChatBox
            chatId={currentChatId}
            currentChat={currentChat}
            currentClientId={currentFreelancerId}
            currentClientName={currentFreelancerName}
          />
        )}
      </div>
    </div>
  );
};

export default MessagingPageC;
