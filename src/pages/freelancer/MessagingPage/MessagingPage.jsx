import React, { useEffect, useState } from "react";
//import './MessagingPage.css';
import Navbar from "../../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import PeopleComponent from "../../../components/Messaging/PeopleComponent/PeopleComponent";
import ChatBox from "../../../components/Messaging/ChatBox/ChatBox";
const MessagingPage = ({}) => {
  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {}
  };
  if (loading) return;
  return (
    <div className="MessagingPage">
      <Navbar />
      <ProfileSubNav />
      <div className="messagePageContainer">
        <PeopleComponent />
        <ChatBox />
      </div>
    </div>
  );
};

export default MessagingPage;
