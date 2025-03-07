import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBox from '../../../components/message components/ChatBox';
import ChatList from '../../../components/message components/ChatList';
import './MessagingPageC.css';

const MessagingPage = () => {
  const { chatId } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  console.log('MessagingPage Render:', { chatId, currentChat, authChecked });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    console.log('Checking auth:', { token, userRole });
    
    if (!token || userRole !== 'client') {
      console.log('No token or not a client, redirecting to signin');
      navigate('/client-signin');
      return;
    }

    setAuthChecked(true);
  }, [navigate]);

  // Load chat data
  useEffect(() => {
    if (!authChecked || !chatId) {
      return;
    }

    const loadChat = async () => {
      try {
        console.log('Starting chat load for:', chatId);
        const response = await fetch(`http://localhost:8000/api/chats/${chatId}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Chat loaded:', data);
        setCurrentChat(data.chat);
        setLoading(false);
      } catch (err) {
        console.error('Error loading chat:', err);
        setError('Failed to load chat');
        setLoading(false);
      }
    };

    loadChat();
  }, [chatId, authChecked]);

  const handleEscrow = () => {
    const escrowData = {
      freelancerId: currentChat.participants[0].uid,
      clientId: currentChat.participants[1].uid,
      freelancerEmail: currentChat.participants[0].email,
      clientEmail: currentChat.participants[1].email,
    };
    navigate('/escrow', { state: { escrowData } });
  };

  if (!authChecked) {
    console.log('Rendering auth check loading');
    return <div className="loading-message">Checking authentication...</div>;
  }

  console.log('Rendering main component:', { loading, error, chatId, currentChat });

  return (
    <div className="messaging-page">
      <div className="messaging-container">
        <div className="chat-sidebar">
          <ChatList setCurrentChat={(chat) => {
            console.log('Chat selected:', chat);
            setCurrentChat(chat);
            navigate(`/messaging-client/${chat.id}`);
          }} />
        </div>
        <div className="chat-main">
          {loading ? (
            <div className="loading-message">Loading chat...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : chatId ? (
            <>
              <ChatBox chatId={chatId} chat={currentChat} />
              <button onClick={handleEscrow}>Create Escrow</button>
            </>
          ) : (
            <div className="no-chat-selected">
              Select a chat or start a new conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage; 