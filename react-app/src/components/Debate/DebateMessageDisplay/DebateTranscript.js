import React from 'react';

const Transcript = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="message">
          <p className="name">{message.name}</p>
          <p className="content">{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Transcript;
