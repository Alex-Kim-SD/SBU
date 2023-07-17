import React from 'react';
import { useHistory } from 'react-router-dom';
import robot from "../../assets/robot.png";
import './BotCard.css';

function BotCard({ bot }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/bots/${bot.id}`);
    };

    return (
        <div className="bot-card" onClick={handleClick}>
            <img src={robot} alt="Bot avatar" />
            <h2>{bot.name}</h2>
            <p className="bot-settings">{bot.settings}</p>
        </div>
    );
}

export default BotCard;
