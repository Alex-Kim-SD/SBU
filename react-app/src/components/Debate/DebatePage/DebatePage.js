import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllDebates } from '../../../store/debateSlice';
import DebateCardArray from '../DebateCardArray/DebateCardArray';
import './DebatePage.css'

function DebatePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);
  const yourDebates = useSelector(state => state.debate.yourDebates);
  const otherDebates = useSelector(state => state.debate.otherDebates);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {
      dispatch(fetchAllDebates(currentUser.id));
    }
  }, [dispatch, currentUser, history]);

  if (!currentUser) {
    return null;
  }

  return (
  <div className="debate-page-container">
    <h1 className="debate-page-title">Debates</h1>
    <h2>Your Debates</h2>
    <DebateCardArray debates={yourDebates} userId={currentUser.id}  />
    <h2>Other Debates</h2>
    <DebateCardArray debates={otherDebates} userId={currentUser.id}  />
  </div>
);

}

export default DebatePage;
