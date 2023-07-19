// /SBU/react-app/src/components/Challenge/ChallengePage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchBots } from '../../../store/botSlice';

function ChallengePage() {
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
    <>
    <div className='challenge-page-title'>
      <h1>Challenge Bots</h1>
    </div>
    </>
  );
}

export default ChallengePage;
