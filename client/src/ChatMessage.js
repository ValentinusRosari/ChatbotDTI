import React from 'react';

function ChatMessage({ message }) {
  return (
    <div className={`message ${message.user ? 'user' : 'bot'}`}>
      <div className={`message-content ${message.user ? 'user' : 'bot'}`}>
        {message.text}
      </div>
    </div>
  );
}

export default ChatMessage;
