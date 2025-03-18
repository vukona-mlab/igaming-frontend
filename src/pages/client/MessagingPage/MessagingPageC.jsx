import React, { useEffect, useState } from "react";
import "./MessagingPageC.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import SearchBar from "../../../components/SearchBar/SearchBar";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
import EscrowForm from "../../../components/Escrow/EscrowForm";

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
      <SearchBar placeholder="Search people..." onSearch={handleSearch} />

      <div className="messagePageContainer">
        <PeopleComponent
          people={filteredChats}
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
            onEscrowClick={handleEscrow}
          />
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
    </div>
  );
};

export default MessagingPageC;
