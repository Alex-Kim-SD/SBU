import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchBots } from '../../../store/botSlice';
import robot from "../../../assets/robot.png";
import BotCardArray from '../BotCardArray/BotCardArray'
import CreateBotButton from '../CreateBotModal/CreateBotButton';

function BotDashboard() {
  const { botId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {
      dispatch(fetchBots());
    }
  }, [botId, dispatch, currentUser, history]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h1>BotDashboard</h1>
      <CreateBotButton/>
      <BotCardArray userId={currentUser.id} />
    </div>
  );
}

export default BotDashboard;
