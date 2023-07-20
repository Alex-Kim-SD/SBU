import React from 'react';
import { useSelector } from 'react-redux';
import './MessageList.css';

const MessageList = () => {
  const messages = useSelector((state) => state.message.messages);

  // Check if messages is not an array
  if (!Array.isArray(messages)) {
    return <div>
     Messages Array is empty
    </div>;
  }

  return (
    <div className="message-list">
      <h2 className="message-list-heading">Conversation Transcript</h2>
      <ul className="message-list-container">
        {messages.map((message) => (
          <li key={message.id} className={`message-item ${message.role}`}>
            <p className="message-name">{message.name}:</p>
            <p className="message-content">{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
