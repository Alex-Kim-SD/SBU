import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBot, fetchBot, fetchBots } from '../../../store/botSlice';
import robot from "../../../assets/robot.png";
import EditBotButton from "../EditBotModal/EditBotButton"
import './BotDetailPage.css';


function BotDetailPage({ botId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(botId) {
      dispatch(fetchBot(botId));
    }
  }, [botId, dispatch]);

  const bot = useSelector(state => state.bots.your_bots[botId]);
  const history = useHistory();

  if (!botId || !bot) {
    return <div>Select a bot to view details</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bot?")) {
      await dispatch(deleteBot(botId));
      await dispatch(fetchBots());
      history.push('/bots');
    }
  };

  return (
    <div className='bot-detail-container'>
      <img src={robot} alt="Bot avatar" className='selected-bot-img' />
      <div className='bot-info'>
        <h2 className='bot-name'>{bot.name}</h2>
        <p className='bot-settings'>{bot.settings}</p>
        <EditBotButton botId={botId} className='edit-bot-button'/>
        <button className='delete-bot-button' onClick={handleDelete}>Delete Bot</button>
      </div>
    </div>
  );
}

export default BotDetailPage;
