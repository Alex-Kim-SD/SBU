// /SBU/react-app/src/components/Challenge/ChallengePage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ChallengeBotCardArray from '../ChallengeBotArray/ChallengeBotArray';


function OtherBotsPage() {
  const { botId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {

    }
  }, [botId, dispatch, currentUser, history]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
    <div className='challenge-page-title'>
      <h1>Other Bots</h1>
      <ChallengeBotCardArray/>
    </div>
    </>
  );
}

export default OtherBotsPage;
