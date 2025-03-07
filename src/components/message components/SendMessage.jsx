import React, { useState, useRef, useEffect } from "react";
import { auth, db, storage } from "../../config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const SendMessage = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (files) => {
    if (!files.length) return [];
    setIsUploading(true);

    try {
      console.log('Starting file upload for chat:', chatId);
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(storage, `chat-attachments/${chatId}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return {
          name: file.name,
          type: file.type,
          url: url
        };
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading || !chatId) {
      console.log('Cannot send: loading or no chatId', { loading, chatId });
      return;
    }
    
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (message.trim() === '' && !fileInputRef.current?.files?.length) {
      console.log('No message or files to send');
      return;
    }

    try {
      const attachments = await handleFileUpload(fileInputRef.current?.files || []);
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

      const newMessage = {
        message: message.trim(),
        senderId: user.uid,
        timestamp: timestamp,
        attachments: attachments
      };

      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion(newMessage),
        lastMessage: message.trim(),
        updatedAt: new Date()
      });

      setMessage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="send-message loading">Loading...</div>;
  }

  if (!user) {
    return <div className="send-message error">Please sign in to send messages</div>;
  }

  if (!chatId) {
    return <div className="send-message error">Invalid chat</div>;
  }

  return (
    <div className="send-message">
      <form onSubmit={handleSubmit} className="message-input-container">
        <button 
          type="button" 
          className="attachment-button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </button>
        <input 
          type="file"
          ref={fileInputRef}
          className="file-input"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          style={{ display: 'none' }}
        />
        <div className="message-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isUploading ? 'Uploading...' : 'Type a message...'}
            className="message-input"
            disabled={isUploading}
          />
        </div>
        <button 
          type="submit" 
          className="send-button"
          disabled={isUploading || (message.trim() === "" && !fileInputRef.current?.files?.length)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;