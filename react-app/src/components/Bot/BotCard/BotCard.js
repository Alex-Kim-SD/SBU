import React from 'react';
import robot from "../../../assets/robot.png"
import './BotCard.css';

function BotCard({ bot, onSelect }) {
  return (
    <div className="bot-card" onClick={onSelect}>
      <img className="bot-avatar" src={robot} alt="Bot avatar" />
      <div className="bot-details">
        <h2 className="bot-name">{bot.name}</h2>
        <p className="bot-settings">{bot.settings}</p>
      </div>
    </div>
  );
}

export default BotCard;
