import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBots } from '../../../store/botSlice';
import BotCardArray from '../BotCardArray/BotCardArray'
import CreateBotButton from '../CreateBotModal/CreateBotButton';
import BotDetailPage from '../BotDetailPage/BotDetailPage';
import "./BotDashboard.css"

function BotDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);
  const selectedBot = useSelector(state => state.bots.selectedBot);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {
      dispatch(fetchBots());
    }
  }, [dispatch, currentUser, history]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className='bot-dash-container'>
      <div className='bot-detail-title-container'>
        <p className='bot-detail-title'>--| Choose a bot to view, edit, or delete.</p>
      </div>
      <BotDetailPage botId={selectedBot} />
      <BotCardArray userId={currentUser.id} />
      <CreateBotButton />
    </div>
  );
}

export default BotDashboard;
