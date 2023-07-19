import React from 'react';
import { useHistory } from 'react-router-dom';
import robot from "../../../assets/robot.png"
import './OtherBotCard.css';

function OtherBotCard({ bot }) {
  const history = useHistory();

  const handleClick = () => {

  };

  return (
    <div className="other-bot-card" onClick={handleClick}>
      <img className="other-bot-avatar" src={robot} alt="Bot avatar" />
      <div className="other-bot-details">
        <h2 className="other-bot-name">{bot.name}</h2>
        <p className="other-bot-settings">{bot.settings}</p>
      </div>
    </div>
  );
}

export default OtherBotCard;
