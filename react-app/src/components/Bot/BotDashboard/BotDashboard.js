import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBots } from '../../../store/botSlice';
import BotCardArray from '../BotCardArray/BotCardArray'
import CreateBotButton from '../CreateBotModal/CreateBotButton';
import BotDetailPage from '../BotDetailPage/BotDetailPage';

function BotDashboard() {
  const [selectedBot, setSelectedBot] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);

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
    <div className='BotDash-container'>
      <BotDetailPage botId={selectedBot} />
      <BotCardArray userId={currentUser.id} setSelectedBot={setSelectedBot} />
      <CreateBotButton />
    </div>
  );
}

export default BotDashboard;
