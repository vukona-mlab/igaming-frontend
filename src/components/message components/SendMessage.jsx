import React, { useState, useRef } from "react";

const SendMessage = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  // Get user info from localStorage
  const userId = localStorage.getItem('uid');
  const token = localStorage.getItem('token');

  console.log('SendMessage auth info:', { 
    userId, 
    token,
    allKeys: Object.keys(localStorage)
  });

  const handleFileUpload = async (files) => {
    if (!files.length) return [];
    setIsUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`http://localhost:8000/api/chats/${chatId}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.attachments;
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!chatId || !userId || !token) {
      console.error("Cannot send: missing chatId, userId, or token");
      return;
    }

    if (message.trim() === '' && !fileInputRef.current?.files?.length) {
      return;
    }

    try {
      const attachments = await handleFileUpload(fileInputRef.current?.files || []);
      
      const response = await fetch(`http://localhost:8000/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          message: message.trim(),
          senderId: userId,
          attachments
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!userId || !localStorage.getItem('token')) {
    console.error('Missing auth:', { userId, token: localStorage.getItem('token') });
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
          className="attach-button"
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
          onChange={(e) => {
            if (e.target.files.length > 0) {
              // Validate file types
              const validFiles = Array.from(e.target.files).every(file => {
                const isImage = file.type.startsWith('image/');
                const isDocument = ['.pdf', '.doc', '.docx'].some(ext => 
                  file.name.toLowerCase().endsWith(ext)
                );
                return isImage || isDocument;
              });

              if (!validFiles) {
                alert('Only images and documents (PDF, DOC, DOCX) are allowed');
                e.target.value = '';
                return;
              }
              handleSubmit(new Event('submit'));
            }
          }}
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

      <style jsx>{`
        .send-message {
          padding: 10px;
          background: #fff;
          border-top: 1px solid #e0e0e0;
        }

        .message-input-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .message-input-wrapper {
          flex: 1;
          background: #f0f2f5;
          border-radius: 20px;
          padding: 0 12px;
        }

        .message-input {
          width: 100%;
          padding: 10px 0;
          border: none;
          background: transparent;
          outline: none;
          font-size: 15px;
        }

        .attach-button,
        .send-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          color: #54656f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .attach-button:hover,
        .send-button:hover {
          background-color: #f0f2f5;
        }

        .attach-button:disabled,
        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .file-input {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SendMessage;