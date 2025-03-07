import React, { useState, useEffect } from 'react';

const UsersList = ({ setCurrentChat }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Default profile icon as SVG
  const defaultProfileIcon = (
    <svg 
      viewBox="0 0 24 24" 
      width="40" 
      height="40" 
      fill="currentColor" 
      className="default-profile-icon"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const currentUserId = localStorage.getItem('uid');

        if (!token || !currentUserId) {
          console.error('No token or user ID found');
          return;
        }

        const response = await fetch('http://localhost:8000/api/users', {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Filter out current user from the list
        const usersData = data.users.filter(user => user.uid !== currentUserId);
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
      const currentUserId = localStorage.getItem('uid');
      const token = localStorage.getItem('token');

      if (!currentUserId || !token) {
        console.error('No user ID or token found');
        return;
      }

      const response = await fetch('http://localhost:8000/api/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          freelancerId: currentUserId,
          clientId: otherUser.uid,
          senderId: currentUserId,
          message: '' // Initial empty message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      const data = await response.json();
      setCurrentChat({
        id: data.chatId,
        participants: [
          { uid: currentUserId },
          otherUser
        ]
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
              <div className="user-avatar-container">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="user-avatar"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="default-avatar">
                    {defaultProfileIcon}
                  </div>
                )}
              </div>
              <div className="user-info">
                <h3>{user.displayName || 'Anonymous User'}</h3>
                <p>{user.email || 'No email provided'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .user-avatar-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .default-avatar {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #757575;
          background-color: #e0e0e0;
        }

        .default-profile-icon {
          width: 24px;
          height: 24px;
        }

        .user-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
          border-bottom: 1px solid #eee;
        }

        .user-item:hover {
          background-color: #f5f5f5;
        }

        .user-info {
          margin-left: 12px;
        }

        .user-info h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .user-info p {
          margin: 4px 0 0;
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default UsersList; 