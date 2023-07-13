// SBU/react-app/src/components/BotDetailPage/BotDetailPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { deleteBot, selectBotById } from './botsSlice'; // need to be created
import robot from "../../assets/robot.png";

function BotDetailPage() {
  const { botId } = useParams();
//   const bot = useSelector(state => selectBotById(state, botId));
  const dispatch = useDispatch();
  const history = useHistory();

//   if (!bot) {
//     return <div>Bot not found</div>;
//   }

  const handleDelete = async () => {
    // await dispatch(deleteBot(botId));
    history.push('/bots');
  };

  const handleUpdate = () => {
    history.push(`/bots/${botId}/update`);
  };
 // need to replace img with placeholder
  return (
    <div>
      <img src={robot} alt="Bot avatar" />
      <h2>{"bot.name"}</h2>
      <p>{"bot.settings"}</p>
      <button onClick={handleDelete}>Delete Bot</button>
      <button onClick={handleUpdate}>Update Bot</button>
    </div>
  );
}

export default BotDetailPage;
