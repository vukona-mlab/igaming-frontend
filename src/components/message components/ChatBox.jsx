import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { format, isToday, isYesterday, isSameDay } from 'date-fns';

const ChatBox = ({ chatId, chat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef();
  const [isTyping, setIsTyping] = useState({});

  console.log('ChatBox Render:', { chatId, chat });

  // Find the other participant in the chat - using uid instead of userId
  const currentUserId = localStorage.getItem('uid');
  const otherParticipant = chat?.participants?.find(
    p => p.uid !== currentUserId
  );

  // Parse timestamp to Date object
  const parseTimestamp = (timestamp) => {
    if (!timestamp) return new Date();
    
    try {
      if (typeof timestamp === 'string') {
        // For string timestamps, try to parse or return current date
        const parsed = new Date(timestamp);
        return isNaN(parsed.getTime()) ? new Date() : parsed;
      } else if (timestamp._seconds) {
        return new Date(timestamp._seconds * 1000);
      } else if (timestamp.toDate) {
        return timestamp.toDate();
      } else if (timestamp instanceof Date) {
        return timestamp;
      }
      return new Date(timestamp);
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return new Date();
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentGroup = null;

    messages.forEach((message) => {
      if (!message) return; // Skip null/undefined messages
      
      const timestamp = message.createdAt || message.timestamp;
      const messageDate = parseTimestamp(timestamp);

      if (!currentGroup || !isSameDay(currentGroup.date, messageDate)) {
        currentGroup = {
          date: messageDate,
          messages: []
        };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(message);
    });

    return groups;
  };

  const formatDateHeader = (date) => {
    try {
      if (isToday(date)) {
        return 'Today';
      }
      if (isYesterday(date)) {
        return 'Yesterday';
      }
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date header:', error);
      return 'Unknown Date';
    }
  };

  useEffect(() => {
    if (!chatId || !localStorage.getItem('token')) {
      console.log('No chatId or token, stopping message load');
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        console.log('Fetching messages for chat:', chatId);
        const response = await fetch(`http://localhost:8000/api/chats/${chatId}/messages`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Messages received:', data);

        // Transform messages to match the expected format
        const transformedMessages = data.messages.map(msg => ({
          id: msg.id || Math.random().toString(),
          message: msg.text,
          text: msg.text,
          senderId: msg.senderId,
          timestamp: msg.timestamp,
          createdAt: msg.createdAt,
          displayName: msg.displayName,
          photoURL: msg.photoURL,
          attachments: msg.attachments
        }));

        setMessages(transformedMessages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="chat-header-user">
          <img 
            src={otherParticipant?.photoURL || '/default-avatar.jpg'} 
            alt="Profile" 
            className="chat-header-avatar"
            onError={(e) => {
              e.target.src = '/default-avatar.jpg';
            }}
          />
          <div className="chat-header-info">
            <h2>{otherParticipant?.name || 'Anonymous'}</h2>
          </div>
        </div>
      </div>
      
      <div className="messages-container">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : messages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          <div className="messages-wrapper">
            {groupMessagesByDate(messages).map((group) => (
              <div key={`date-${group.date.getTime()}`} className="message-group">
                <div className="date-separator">
                  <span className="date-text">{formatDateHeader(group.date)}</span>
                </div>
                {group.messages.map((msg, msgIndex) => (
                  <Message 
                    key={msg.id || `${msg.senderId}-${msg.timestamp?._seconds || Date.now()}-${msgIndex}`}
                    message={msg}
                    showAvatar={
                      msgIndex === 0 || 
                      group.messages[msgIndex - 1]?.senderId !== msg.senderId
                    }
                  />
                ))}
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
        )}
      </div>
      
      <SendMessage chatId={chatId} />

      <style jsx>{`
        .messages-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
        }

        .date-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 16px 0;
          position: relative;
        }

        .date-separator::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background-color: #e0e0e0;
          z-index: 1;
        }

        .date-text {
          background-color: #f5f5f5;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          color: #666;
          position: relative;
          z-index: 2;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .message-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          background-color: #fff;
        }

        .loading,
        .error,
        .no-messages {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #666;
          font-size: 14px;
        }

        .error {
          color: #e53935;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;