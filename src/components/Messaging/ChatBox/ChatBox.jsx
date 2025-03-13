import React, { useEffect, useRef, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import ChatInput from "../messaging-inputs/ChatInput";
import "./ChatBox.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../config/firebase";
import ChatHeader from "../ChatHeader/ChatHeader";
import { io } from "socket.io-client";
import ProjectModal from "../ProjectModal/ProjectModal";

const ChatBox = ({ chatId, currentChat, currentClientId, currentClientName }) => {
  const [messages, setMessages] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState();
  const [fileIcon, setFileIcon] = useState();

  const [isTyping, setIsTyping] = useState({});
  const [text, setText] = useState("");
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const bottomRef = useRef();
  const socketRef = useRef();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (chatId !== "") {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:8000");

    // Join the chat room when component mounts
    if (chatId) {
      socketRef.current.emit("join-chat", chatId);
    }

    // Listen for new messages
    socketRef.current.on("new-message", (data) => {
      if (data.chatId === chatId) {
        setMessages(prev => [...prev, data.message]);
      }
    });

    // Listen for new project notifications
    socketRef.current.on("new-project", (data) => {
      if (data.chatId === chatId && userRole === "client") {
        setProjectData(data.projectData);
        setShowProjectModal(true);
      }
    });

    // Cleanup on unmount
    return () => {
      if (chatId) {
        socketRef.current.emit("leave-chat", chatId);
      }
      socketRef.current.disconnect();
    };
  }, [chatId, userRole]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/chats/${chatId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      const url =
        (data.chat &&
          data.chat?.participants &&
          data.chat?.participants.filter(
            (part) => part.uid !== localStorage.getItem("uid")
          )[0].photoURL) ||
        "";
      setMessages(data.chat.messages);
      setPhotoUrl(url);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text, files, fileIcon) => {
    try {
      let attachments = [];
      if (files) {
        attachments = await handleFileUpload(files || []);
      }

      const response = await fetch(
        `http://localhost:8000/api/chats/${chatId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            senderId: uid,
            message: text || "",
            attachments: attachments || [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // No need to fetch messages here as we'll receive the update via socket
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileUpload = async (files) => {
    if (!files.length) return [];
    setIsUploading(true);

    try {
      console.log("Starting file upload for chat:", chatId);
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(
          storage,
          `chat-attachments/${chatId}/${Date.now()}-${file.name}`
        );
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return {
          name: file.name,
          type: file.type,
          url: url,
        };
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading files:", error);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return;

  return (
    <div className="f-chat-box">
      {chatId === "" ? (
        <div>No messages</div>
      ) : (
        <>
          <ChatHeader currentChat={currentChat} />
          <div className="f-messages-container">
            {loading ? (
              <div className="loading">Loading messages...</div>
            ) : (
              <div className="f-messages-wrapper">
                {messages &&
                  messages.map((msg, i) => (
                    <MessageCard key={i} message={msg} />
                  ))}
                <div ref={bottomRef}></div>
              </div>
            )}
          </div>
          <div className="chat-input-container">
            <ChatInput
              files={files}
              setFiles={setFiles}
              fileIcon={fileIcon}
              setFileIcon={setFileIcon}
              text={text}
              setText={setText}
              sendMessage={sendMessage}
            />
          </div>

          {/* Project Modal */}
          {showProjectModal && (
            <ProjectModal
              isOpen={showProjectModal}
              onClose={() => setShowProjectModal(false)}
              projectData={projectData}
              chatId={chatId}
              isClientView={userRole === "client"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ChatBox;
