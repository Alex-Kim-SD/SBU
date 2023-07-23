// /SBU/react-app/src/components/Bot/BotCard/BotCard.js
import React from 'react';
import robot from "../../../assets/robot.png"
import './BotCard.css';

function truncate(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
function BotCard({ bot, onSelect }) {
  return (
    <div className="bot-card" onClick={onSelect}>
      <img className="bot-avatar" src={robot} alt="Bot avatar" />
      <div className="bot-details">
        <h2 className="bot-name">{bot.name}</h2>
        {/* <p className="bot-settings">{truncate(bot.settings,70)}</p> */}
      </div>
    </div>
  );
}

export default BotCard;
