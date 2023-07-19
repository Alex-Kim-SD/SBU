import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../../store/messageSlice';

const MessageList = ({ messages }) => {
  return (
    <div>
      <h2>Messages</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <p>Name: {message.name}</p>
          <p>Content: {message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
