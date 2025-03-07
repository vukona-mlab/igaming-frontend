import React from "react";

const Message = ({ message, showAvatar }) => {
  const { message: messageText = message.text, senderId, timestamp, attachments } = message;
  // Get current user ID from localStorage instead of Firebase auth
  const currentUserId = localStorage.getItem('userId');
  const isCurrentUser = senderId === currentUserId;

  console.log('Rendering message:', { messageText, senderId, isCurrentUser, timestamp });

  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
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
            <div key={index} className="message-attachment">
              {attachment.type.startsWith('image/') ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={attachment.url} 
                    alt="attachment"
                    style={{ width: '150%', height: 'auto' }}
                    onError={(e) => {
                      console.error('Image failed to load:', attachment.url);
                    }}
                  />
                  <a href={attachment.url} download className="download-attachment" style={{ position: 'absolute', bottom: '5px', right: '5px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '3px', padding: '2px' }}>
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
            <span className="message-time">{timestamp}</span>
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
    </div>
  );
};

export default Message;