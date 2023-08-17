import React from 'react';
import { useHistory } from 'react-router-dom';
import './DebateCard.css';
import pixel_paper from '../../../assets/pixel_paper.png';
import { useDispatch } from 'react-redux';
import { deleteDebate } from '../../../store/debateSlice';

function DebateCard({ debate, userId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/debates/${debate.id}`)
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    const userConfirmed = window.confirm("Are you sure you want to delete this debate?");

    if (userConfirmed) {
      try {
        await dispatch(deleteDebate(debate.id));
        alert("Debate deleted successfully!");  // Optionally show a success message.
      } catch (error) {
        alert("Error deleting debate. Please try again later.");
      }
    }
  };


  const initiator = debate.initiator_name;
  const opponent = debate.opponent_name;

  return (
    <div className="debate-card" onClick={handleClick}>
      <div className='debate-delete-button-container'>
    {debate.owner_id === userId && <button onClick={handleDelete}>X</button>}
    </div>
    <div className="debate-content">  {/* This is the new content container */}
        <img className="debate-avatar" src={pixel_paper} alt="Debate avatar" />
        <h2 className="debate-topic">{debate.topic}</h2>
        <p className="debate-info">Participants: {initiator} & {opponent}</p>
    </div>
</div>

  );
}


export default DebateCard;
