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
      <img className="conv-avatar" src={bubble} alt="bubble-avatar" />
      <div className="conv-details">
        <h2 className="conv-name">{conv.title}</h2> {/* Display the 'title' property */}
        <p className="conv-settings">{conv.setting_details}</p> {/* Display the 'setting_details' property */}
      </div>
    </div>
  );
}

export default ConvCard;
