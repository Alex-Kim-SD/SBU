import React from 'react';
import { useHistory } from 'react-router-dom';
import './DebateCard.css';
import pixel_paper from '../../../assets/pixel_paper.png';

function DebateCard({ debate }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/debates/${debate.id}`);
  };

  const initiator = debate.initiator_name;
  const opponent = debate.opponent_name

  return (
    <div className="debate-card" onClick={handleClick}>
      <img className="debate-avatar" src={pixel_paper} alt="Debate avatar" />
      <h2 className="debate-topic">{debate.topic}</h2>
      <p className="debate-info">Participants: {initiator} & {opponent}</p>
    </div>
  );
}

export default DebateCard;
