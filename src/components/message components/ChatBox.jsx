import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ chatId, chat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef();
  const [isTyping, setIsTyping] = useState({});

  console.log('ChatBox Render:', { chatId, chat });

  // Find the other participant in the chat
  const currentUserId = localStorage.getItem('userId');
  const otherParticipant = chat?.participants?.find(
    p => p.uid !== currentUserId
  );

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
          senderId: msg.senderId,
          timestamp: msg.timestamp,
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
            {messages.map((msg, idx) => (
              <Message 
                key={msg.id} 
                message={msg}
                showAvatar={
                  idx === 0 || 
                  messages[idx - 1]?.senderId !== msg.senderId
                }
              />
            ))}
            <div ref={bottomRef}></div>
          </div>
        )}
      </div>
      
      <SendMessage chatId={chatId} />
    </div>
  );
};

export default ChatBox;