import React, { useEffect, useState } from "react";
import "./MessagingPageF.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
const MessagingPage = ({}) => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setcurrentChatId] = useState("");
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentClientName, setCurrentClientName] = useState("");

  const [people, setPeople] = useState([]);

  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  const url = import.meta.env.VITE_API_URL;
  const role = localStorage.getItem("role");

  useEffect(() => {
    getAllChats();
  }, []);
  const getAllChats = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/chats/${uid}/allChats`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        if (data.chats && data.chats.length > 0) {
          setChats(data.chats);
          setcurrentChatId((data.chats && data.chats[0].chatId) || "");
          setCurrentClientName((data.chats && data.chats[0].name) || "");
        }
      }
    } catch (error) {}
  };
  if (loading) return;
  return (
    <div className="MessagingPageF">
      <Navbar />
      <ProfileSubNav />
      <div className="messagePageContainer">
        <PeopleComponent
          people={chats}
          setcurrentChatId={setcurrentChatId}
          setCurrentClientId={setCurrentClientId}
          setCurrentClientName={setCurrentClientName}
        />
        <ChatBox
          chatId={currentChatId}
          currentClientId={currentClientId}
          currentClientName={currentClientName}
        />
      </div>
    </div>
  );
};

export default MessagingPage;
