import React, { useEffect, useRef, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import ChatInput from "../messaging-inputs/ChatInput";

const ChatBox = ({ chatId, chat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState({});
  const [text, setText] = useState("");

  const bottomRef = useRef();
  // Find the other participant in the chat
  const otherParticipant = chat?.participants?.find(
    (p) => p.uid !== auth.currentUser.uid
  );

  useEffect(() => {
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
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text, file, fileIcon) => {
    console.log(text, file, fileIcon);
  };
  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="chat-header-user">
          <img
            src={otherParticipant?.photoURL || "/default-avatar.jpg"}
            alt="Profile"
            className="chat-header-avatar"
          />
          <div className="chat-header-info">
            <h2>{otherParticipant?.name || "Anonymous"}</h2>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          <div className="messages-wrapper">
            {messages.map((msg, idx) => (
              <MessageCard
                key={msg.id}
                message={msg}
                // showAvatar={idx === 0 || messages[idx - 1]?.uid !== msg.uid}
              />
            ))}
            <div ref={bottomRef}></div>
          </div>
        )}
      </div>

      <ChatInput text={text} setText={setText} sendMessage={sendMessage} />
    </div>
  );
};

export default ChatBox;
