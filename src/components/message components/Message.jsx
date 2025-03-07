import React from "react";
import { formatDistanceToNow, format } from 'date-fns';

const Message = ({ message, showAvatar }) => {
  // Handle different message formats
  const messageText = message.text || message.message;
  const { senderId, attachments, id } = message;
  const timestamp = message.createdAt || message.timestamp;
  
  const currentUserId = localStorage.getItem('uid');
  const isCurrentUser = senderId === currentUserId;

  // Use a unique message ID for the key
  const messageKey = id || `${senderId}-${timestamp?._seconds || Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  console.log('Message data:', { messageText, senderId, timestamp, isCurrentUser });

  // Format timestamp
  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      let date;
      if (typeof timestamp === 'string') {
        // Handle string timestamp format (e.g., 'Fri, 8:52 AM')
        return timestamp;
      } else if (timestamp._seconds) {
        // Handle Firestore timestamp
        date = new Date(timestamp._seconds * 1000);
      } else if (timestamp.toDate) {
        // Handle Firebase timestamp
        date = timestamp.toDate();
      } else {
        // Handle regular Date object or timestamp
        date = new Date(timestamp);
      }

      // If message is from today, show time only
      if (new Date().toDateString() === date.toDateString()) {
        return format(date, 'HH:mm');
      }
      
      // If message is from this week, show day and time
      if (Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
        return format(date, 'EEE HH:mm');
      }
      
      // Otherwise show full date
      return format(date, 'dd MMM yyyy HH:mm');
    } catch (error) {
      console.error('Error formatting timestamp:', error, timestamp);
      return typeof timestamp === 'string' ? timestamp : '';
    }
  };

  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`} key={messageKey}>
      {!isCurrentUser && showAvatar && (
        <div className="message-avatar-wrapper">
          <img 
            className="message-avatar" 
            src={message.photoURL || '/default-avatar.jpg'} 
            alt={message.displayName || 'Anonymous'} 
            onError={(e) => {
              e.target.src = '/default-avatar.jpg';
            }}
          />
        </div>
      )}
      <div className="message-content-wrapper">
        {!isCurrentUser && showAvatar && (
          <div className="message-name">{message.displayName || 'Anonymous'}</div>
        )}
        <div className="message-content">
          {messageText}
          {attachments && attachments.map((attachment, index) => (
            <div key={`${messageKey}-attachment-${index}`} className="message-attachment">
              {attachment.type?.startsWith('image/') ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={attachment.url} 
                    alt="attachment"
                    style={{ maxWidth: '200px', height: 'auto' }}
                    onError={(e) => {
                      console.error('Image failed to load:', attachment.url);
                    }}
                  />
                  <a href={attachment.url} download className="download-attachment">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M7 14l5 5 5-5H7zm0-2h10V4H7v8z"/>
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="file-attachment">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                  </svg>
                  <span>{attachment.name}</span>
                  <a href={attachment.url} download className="download-attachment">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M7 14l5 5 5-5H7zm0-2h10V4H7v8z"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
          <div className="message-meta">
            <span className="message-time" title={formatMessageTime(timestamp)}>
              {timestamp ? (
                typeof timestamp === 'string' ? 
                  timestamp : 
                  formatDistanceToNow(
                    timestamp._seconds ? 
                      new Date(timestamp._seconds * 1000) : 
                      timestamp.toDate ? 
                        timestamp.toDate() : 
                        new Date(timestamp),
                    { addSuffix: true }
                  )
              ) : ''}
            </span>
            {isCurrentUser && (
              <span className="message-status">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .message-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
          font-size: 12px;
          color: #666;
        }

        .message-time {
          opacity: 0.7;
          cursor: default;
        }

        .message-time:hover {
          opacity: 1;
        }

        .message.sent .message-meta {
          justify-content: flex-end;
        }

        .message.received .message-meta {
          justify-content: flex-start;
        }

        .message-status {
          display: flex;
          align-items: center;
          color: #0084ff;
        }
      `}</style>
    </div>
  );
};

export default Message;