import React from 'react';
import { useHistory } from 'react-router-dom';
import bubble from "../../../assets/speech_bubble.png";
import './ConvCard.css';

function ConvCard({ conv }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/settings/${conv.id}`);
  };

  return (
    <div className="conv-card" onClick={handleClick}>
      <img className="conv-avatar" src={bubble} alt="Bot avatar" />
      <div className="conv-details">
        <h2 className="conv-name">{conv.name}</h2>
        <p className="conv-settings">{conv.settings}</p>
      </div>
    </div>
  );
}

export default ConvCard;
