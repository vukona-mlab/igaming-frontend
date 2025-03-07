import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const UsersList = ({ setCurrentChat }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        // Only query for basic user info needed for display
        const q = query(
          usersRef, 
          where('uid', '!=', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({
          uid: doc.data().uid,
          email: doc.data().email,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const startChat = async (otherUser) => {
    try {
      // Use the backend API endpoint
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
    }
  };

  const filteredUsers = users.filter(user =>
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-list">
      <div className="users-list-header">
        <h2>Users</h2>
      </div>
      
      <div className="users-search">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="users-search-input"
        />
      </div>

      <div className="users-list-items">
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="no-users">
            {searchTerm ? 'No users found' : 'No other users available'}
          </div>
        ) : (
          filteredUsers.map(user => (
            <div
              key={user.uid}
              className="user-item"
              onClick={() => startChat(user)}
            >
              <img
                src={user.photoURL || '/default-avatar.jpg'}
                alt={user.displayName}
                className="user-avatar"
                onError={(e) => {
                  e.target.src = '/default-avatar.jpg';
                }}
              />
              <div className="user-info">
                <h3>{user.displayName || 'Anonymous'}</h3>
                <p>{user.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersList; 