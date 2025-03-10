import React, { useEffect, useState } from "react";
import "./MessagingPageC.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";

const MessagingPageC = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setcurrentChatId] = useState("");
  const [currentFreelancerId, setCurrentFreelancerId] = useState("");
  const [currentFreelancerName, setCurrentFreelancerName] = useState("");

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllChats();
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
          setChats(data.chats);
          // Set initial chat if available
          setcurrentChatId(data.chats[0].id || "");
          // Get the freelancer's name from the first chat
          const freelancer = data.chats[0].participants?.find(
            part => part.uid !== localStorage.getItem("uid")
          );
          setCurrentFreelancerName(freelancer?.name || "");
          setCurrentFreelancerId(freelancer?.uid || "");
        }
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="MessagingPageC">
      <Navbar />
      <ProfileSubNav />
      <div className="messagePageContainer">
        <PeopleComponent
          people={chats}
          setcurrentChatId={setcurrentChatId}
          setCurrentClientId={setCurrentFreelancerId}
          setCurrentClientName={setCurrentFreelancerName}
        />
        <ChatBox
          chatId={currentChatId}
          currentClientId={currentFreelancerId}
          currentClientName={currentFreelancerName}
        />
      </div>
    </div>
  );
};

export default MessagingPageC; 