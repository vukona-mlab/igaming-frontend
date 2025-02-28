import React, { useEffect, useRef, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import ChatInput from "../messaging-inputs/ChatInput";
import "./ChatBox.css";
const ChatBox = ({ chatId, currentClientId, currentClientName }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState();
  const [fileIcon, setFileIcon] = useState();

  const [isTyping, setIsTyping] = useState({});
  const [text, setText] = useState("");
  console.log({ chatId });
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const bottomRef = useRef();
  // Find the other participant in the chat
  // const otherParticipant = chat?.participants?.find(
  //   (p) => p.uid !== auth.currentUser.uid
  // );

  useEffect(() => {
    if (chatId !== "") {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/chats/${chatId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      console.log("meesagines", { data });
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };
  const sendMessage = async (text, file, fileIcon) => {
    console.log("sendmessage", {
      freelancerId: uid,
      clientId: currentClientId,
      senderId: uid,
      message: text,
    });
    try {
      const response = await fetch(
        "http://localhost:8000/api/freelancer/create-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            freelancerId: uid,
            clientId: currentClientId,
            senderId: uid,
            message: text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      console.log("response dta", { data });
      fetchMessages();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(messages);
  if (loading) return;
  return (
    <div className="f-chat-box">
      <div className="f-chat-header">
        <div className="f-chat-header-user">
          <img src={"/images/profile_icon.png"} alt="Profile" />
          <div className="f-chat-header-info">
            <h2>{currentClientName}</h2>
          </div>
        </div>
      </div>

      <div className="f-messages-container">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          <div className="f-messages-wrapper">
            {messages &&
              messages.map((msg, i) => <MessageCard key={i} message={msg} />)}
            <div ref={bottomRef}></div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <ChatInput
          file={file}
          setFile={setFile}
          fileIcon={fileIcon}
          setFileIcon={setFileIcon}
          text={text}
          setText={setText}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatBox;
