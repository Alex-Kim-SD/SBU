import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllDebates } from '../../../store/debateSlice';
import DebateCardArray from '../DebateCardArray/DebateCardArray';

function DebatePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {
      dispatch(fetchAllDebates());
    }
  }, [dispatch, currentUser, history]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h1>Debates</h1>
      <DebateCardArray userId={currentUser.id} />
    </div>
  );
}

export default DebatePage;
