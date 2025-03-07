import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, serverTimestamp, where } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const NewChat = ({ setCurrentChat }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '!=', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const startNewChat = async (otherUser) => {
    try {
      const response = await fetch('/api/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          freelancerId: auth.currentUser.uid,
          clientId: otherUser.uid,
          senderId: auth.currentUser.uid,
          message: '' // Initial empty message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      const data = await response.json();
      setCurrentChat({
        id: data.chatId,
        participants: [auth.currentUser, otherUser]
      });
    } catch (error) {
      console.error('Error creating chat:', error);
      setError('Failed to create chat');
    }
  };

  return (
    <div className="new-chat">
      <div className="new-chat-header">
        <h2>Start New Chat</h2>
        <p>Select a user to start chatting with</p>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="users-list">
          {users.length === 0 ? (
            <div className="no-users">No other users found</div>
          ) : (
            users.map((user) => (
              <div 
                key={user.uid} 
                className="user-item"
                onClick={() => startNewChat(user)}
              >
                <img 
                  src={user.photoURL || '/default-avatar.jpg'} 
                  alt={user.name || 'Anonymous'} 
                  className="user-avatar"
                  onError={(e) => {
                    e.target.src = '/default-avatar.jpg';
                  }}
                />
                <div className="user-info">
                  <h3>{user.name || 'Anonymous'}</h3>
                  <p>{user.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NewChat; 