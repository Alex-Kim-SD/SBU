import React from 'react';
import { useHistory } from 'react-router-dom';
import './DebateCard.css';
import pixel_paper from '../../../assets/pixel_paper.png';

function DebateCard({ debate }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/debates/${debate.id}`);
  };

  const initiator = debate.initiator_bot_id; // Add missing variable declaration
  const opponent = debate.opponent_bot_id

  return (
    <div className="debate-card" onClick={handleClick}>
      <img className="debate-avatar" src={pixel_paper} alt="Debate avatar" />
      <h2 className="debate-topic">{debate.topic}</h2>
      <p className="debate-info">Participants: {initiator}&{opponent}</p> {/* Use the correct variable name */}
      {/* <p className="debate-info">Start Time: {debate.start_time}</p>
      <p className="debate-info">End Time: {debate.end_time}</p>
      <p className="debate-info">Result: {debate.result}</p> */}
    </div>
  );
}

export default DebateCard;
