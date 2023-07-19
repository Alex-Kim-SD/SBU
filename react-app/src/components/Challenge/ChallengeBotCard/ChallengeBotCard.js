import React from 'react';
import { useHistory } from 'react-router-dom';
import robot from "../../../assets/robot.png"
import './ChallengeBotCard.css';

function ChallengeBotCard({ bot }) {
  const history = useHistory();

  const handleClick = () => {

  };

  return (
    <div className="challenge-bot-card" onClick={handleClick}>
      <img className="challenge-bot-avatar" src={robot} alt="Bot avatar" />
      <div className="challenge-bot-details">
        <h2 className="challenge-bot-name">{bot.name}</h2>
        <p className="challenge-bot-settings">{bot.settings}</p>
      </div>
    </div>
  );
}

export default ChallengeBotCard;
