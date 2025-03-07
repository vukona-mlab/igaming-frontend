import React, { useEffect, useRef, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import ChatInput from "../messaging-inputs/ChatInput";
import "./ChatBox.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../config/firebase";

const ChatBox = ({ chatId, currentClientId, currentClientName }) => {
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
      console.log(attachments);
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
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      fetchMessages();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
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
          <div className="f-chat-header">
            <div className="f-chat-header-user">
              <img
                src={
                  photoUrl && photoUrl !== ""
                    ? photoUrl
                    : "/images/profile_icon.png"
                }
                alt="Profile"
              />
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
        </>
      )}
    </div>
  );
};

export default ChatBox;
