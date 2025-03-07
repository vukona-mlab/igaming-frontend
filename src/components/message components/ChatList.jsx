import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const ChatList = ({ setCurrentChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, skipping chat list load');
      setLoading(false);
      return;
    }

    const fetchChats = async () => {
      try {
        console.log('Starting chat list load');
        const response = await fetch('http://localhost:8000/api/chats', {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Chats received:', data);
        
        // Transform the chat data to include participant details
        const transformedChats = data.chats.map(chat => {
          const otherParticipant = chat.participants.find(p => p.uid !== localStorage.getItem('userId'));
          
          // Handle lastMessage that might be an object
          let lastMessageText = 'No messages';
          if (typeof chat.lastMessage === 'string') {
            lastMessageText = chat.lastMessage;
          } else if (chat.lastMessage?.text) {
            lastMessageText = chat.lastMessage.text;
          } else if (chat.messages?.length > 0) {
            const lastMsg = chat.messages[chat.messages.length - 1];
            lastMessageText = lastMsg.text || lastMsg.message || 'Message sent';
          }

          return {
            ...chat,
            displayName: otherParticipant?.name || 'Anonymous',
            photoURL: otherParticipant?.photoURL || '/default-avatar.jpg',
            email: otherParticipant?.email,
            lastMessage: lastMessageText,
            // Handle Firestore timestamp format
            updatedAt: chat.updatedAt?._seconds ? 
              new Date(chat.updatedAt._seconds * 1000) : 
              chat.updatedAt || chat.createdAt?._seconds ? 
                new Date(chat.createdAt._seconds * 1000) : 
                new Date(),
          };
        });

        setChats(transformedChats);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('Failed to load chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chat) => {
    console.log('Chat clicked:', chat);
    setCurrentChat(chat);
    navigate(`/messaging-client/${chat.id}`);
  };

  const filteredChats = chats.filter(chat => 
    chat.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Conversations</h2>
      </div>

      <div className="chat-search">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="chat-search-input"
        />
      </div>

      <div className="chat-list-items">
        {loading ? (
          <div className="loading">Loading chats...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredChats.length === 0 ? (
          <div className="no-chats">
            {searchTerm ? 'No chats found' : 'No conversations yet'}
          </div>
        ) : (
          filteredChats.map(chat => (
            <div 
              key={chat.id} 
              className="chat-list-item"
              onClick={() => handleChatClick(chat)}
            >
              <img 
                src={chat.photoURL} 
                alt={chat.displayName}
                className="chat-list-avatar"
                onError={(e) => {
                  e.target.src = '/default-avatar.jpg';
                }}
              />
              <div className="chat-list-info">
                <h3>{chat.displayName}</h3>
                <p>{chat.lastMessage}</p>
                {chat.updatedAt && (
                  <span className="timestamp">
                    {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList; 